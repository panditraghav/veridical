import { OPEN_COMMAND_MENU } from '@/commands';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import * as Popover from '@radix-ui/react-popover';
import { Slot } from '@radix-ui/react-slot';
import { Command } from 'cmdk';
import {
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    COMMAND_PRIORITY_EDITOR,
    COMMAND_PRIORITY_LOW,
    KEY_ARROW_DOWN_COMMAND,
    KEY_ARROW_UP_COMMAND,
    KEY_ENTER_COMMAND,
} from 'lexical';
import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { RemoveScroll } from 'react-remove-scroll';

const CMDK_ITEM_SELECTOR = `[cmdk-item=""]`;
const CMDK_SELECT_EVENT = `cmdk-item-select`;
const CMDK_VALID_ITEM_SELECTOR = `${CMDK_ITEM_SELECTOR}:not([aria-disabled="true"])`;

const CMDK_ITEM_ATTR = `cmdk-item`;
const CMDK_ROOT_ATTR = 'cmdk-root';
const CMDK_VALUE_ATTR = `data-value`;
const CMDK_SELECT_ATTR = 'data-selected';

type CommandMenuProps = {
    children?: React.ReactNode;
    removeScroll?: boolean;
};

type CommandMenuContextType = {
    contentSideOffset?: number;
    searchExpression?: RegExp;
    onClose?: () => void;
    searchText: string;
};

const CommandMenuContext = createContext<CommandMenuContextType>({
    searchText: '',
});
const useCommandMenu = () => useContext(CommandMenuContext);

function CommandMenuPlugin({
    children,
    removeScroll = true,
}: CommandMenuProps) {
    const [open, setOpen] = useState(false);
    const [searchExpression, setSearchExpression] = useState<RegExp>();
    const [searchText, setSearchText] = useState('');
    const [contentSideOffset, setContentSideOffset] = useState(0);
    const [editor] = useLexicalComposerContext();

    const anchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return editor.registerCommand(
            OPEN_COMMAND_MENU,
            ({ searchExpression }) => {
                setSearchExpression(searchExpression);
                setOpen(true);
                positionAnchor();
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    useEffect(() => {
        if (!searchExpression || !open) return;
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();

                if (!$isRangeSelection(selection)) {
                    closeAndResetState();
                    return;
                }
                const [anchorOffset, focusOffset] =
                    selection.getCharacterOffsets();
                const node = selection.getNodes()[0];
                const text = node.getTextContent();

                if (
                    anchorOffset === focusOffset &&
                    anchorOffset === text.length
                ) {
                    const match = text.match(searchExpression);

                    if (match && match.groups) {
                        const search = match.groups['search'];
                        setSearchText(search);
                    } else {
                        closeAndResetState();
                    }
                } else {
                    closeAndResetState();
                }
            });
        });
    }, [editor, open, searchExpression]);

    function closeAndResetState() {
        setOpen(false);
        setSearchExpression(undefined);
        setSearchText('');
    }

    function positionAnchor() {
        const anchor = anchorRef.current;
        const domSelection = document.getSelection();

        const anchorNode = domSelection?.anchorNode;
        if (!anchor || !domSelection || !anchorNode) return;

        const range = domSelection.getRangeAt(0);
        let { left, top, height } = range.getBoundingClientRect();

        // When selection is changed to a new node and the command is dispached,
        // for some reason top,left,height are 0. The code below is to account for that problem.
        if (anchorNode instanceof HTMLElement) {
            const {
                top: aTop,
                left: aLeft,
                height: aHeight,
            } = anchorNode.getBoundingClientRect();
            if (left < aLeft && top < aTop) {
                left = aLeft;
                top = aTop;
                height = aHeight;
            }
        }

        setContentSideOffset(height / 2);
        anchor.style.position = 'absolute';
        anchor.style.left = `${left}px`;
        anchor.style.top = `${top + height / 2 + window.scrollY}px`;
    }

    const contextValue: CommandMenuContextType = {
        contentSideOffset,
        searchExpression,
        searchText,
        onClose: closeAndResetState,
    };

    return (
        <CommandMenuContext.Provider value={contextValue}>
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Anchor
                    ref={anchorRef}
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                    }}
                />
                <Popover.Portal>
                    {removeScroll ? (
                        <RemoveScroll as={Slot} allowPinchZoom>
                            {children}
                        </RemoveScroll>
                    ) : (
                        children
                    )}
                </Popover.Portal>
            </Popover.Root>
        </CommandMenuContext.Provider>
    );
}

const CommandMenuContent = forwardRef<
    React.ElementRef<typeof Popover.Content>,
    React.ComponentPropsWithoutRef<typeof Popover.Content>
>((props, forwardedRef) => {
    const { contentSideOffset } = useCommandMenu();
    const { sideOffset, align, onOpenAutoFocus, ...etc } = props;

    function onOpenAutoFocusDefault(ev: Event) {
        ev.preventDefault();
    }

    return (
        <Popover.Content
            onOpenAutoFocus={onOpenAutoFocus || onOpenAutoFocusDefault}
            sideOffset={sideOffset || contentSideOffset}
            align={align || 'start'}
            ref={forwardedRef}
            {...etc}
        />
    );
});
CommandMenuContent.displayName = 'CommandMenuContent';

function CommandMenuCommand(
    props: Omit<
        React.ComponentPropsWithoutRef<typeof Command>,
        'value' | 'onValueChange' | 'onMouseDown'
    >,
) {
    const [editor] = useLexicalComposerContext();
    const [selectedValue, setSelectedValue] = useState('');
    const { searchExpression, searchText, onClose } = useCommandMenu();

    const cmdkRef = useRef<HTMLDivElement>(null);

    let changeItemSelectionBy = useCallback((changeBy: -1 | 1) => {
        const validItems = getValidItems();
        if (!validItems) return;
        const len = validItems.length;
        const index = validItems.findIndex((item) =>
            item.getAttribute(CMDK_SELECT_ATTR),
        );
        let nextIndex = (index + changeBy) % len;
        // If at first index then change to last
        nextIndex = nextIndex === -1 ? len - 1 : nextIndex;
        setSelectedValue(
            validItems[nextIndex].getAttribute(CMDK_VALUE_ATTR) || '',
        );
    }, []);

    function getSelectedItem() {
        return cmdkRef.current?.querySelector(
            `${CMDK_ITEM_SELECTOR}[aria-selected="true"]`,
        );
    }
    function getValidItems() {
        if (!cmdkRef.current) return null;
        return Array.from(
            cmdkRef.current.querySelectorAll(CMDK_VALID_ITEM_SELECTOR),
        );
    }

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                KEY_ENTER_COMMAND,
                (ev) => {
                    ev?.preventDefault();
                    $deleteSearchText(searchExpression);

                    const item = getSelectedItem();
                    item?.dispatchEvent(new Event(CMDK_SELECT_EVENT));
                    onClose?.();
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_ARROW_DOWN_COMMAND,
                (ev) => {
                    ev.preventDefault();
                    changeItemSelectionBy(1);
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_ARROW_UP_COMMAND,
                (ev) => {
                    ev.preventDefault();
                    changeItemSelectionBy(-1);
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor, onClose, changeItemSelectionBy]);

    const { children, label, ...etc } = props;

    return (
        <Command
            value={selectedValue}
            label={label || 'Command Menu'}
            onValueChange={setSelectedValue}
            ref={cmdkRef}
            onMouseDown={(ev) => {
                const itemOrNull = getCmdkItem(ev);
                if (itemOrNull) {
                    ev.preventDefault();
                    editor.update(() => {
                        $deleteSearchText(searchExpression);
                        itemOrNull.dispatchEvent(new Event(CMDK_SELECT_EVENT));
                        onClose?.();
                    });
                }
            }}
            {...etc}
        >
            <Command.Input
                value={searchText}
                style={{ display: 'none' }}
                autoFocus={false}
            />
            {children}
        </Command>
    );
}

function $deleteSearchText(searchExpression?: RegExp) {
    if (!searchExpression) return;
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
        const node = selection.getNodes()[0];
        if ($isTextNode(node)) {
            const text = node.getTextContent();
            const match = text.match(searchExpression);

            if (match) {
                node.spliceText(match.index || 0, match[0].length, '');
            }
        }
    }
}

function getCmdkItem(
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
): Element | null {
    const target = ev.target;
    if (!(target instanceof Element)) return null;

    if (target.hasAttribute(CMDK_ITEM_ATTR)) return target;

    let parent: HTMLElement | null | undefined = target.parentElement;
    while (!parent || !parent.hasAttribute(CMDK_ROOT_ATTR)) {
        if (parent?.hasAttribute(CMDK_ITEM_ATTR)) return parent;
        parent = parent?.parentElement;
    }
    return null;
}

const CommandMenuEmpty = Command.Empty;
const CommandMenuList = Command.List;
const CommandMenuItem = Command.Item;
const CommandMenuGroup = Command.Group;

CommandMenuPlugin.List = CommandMenuList;
CommandMenuPlugin.Empty = CommandMenuEmpty;
CommandMenuPlugin.Item = CommandMenuItem;
CommandMenuPlugin.Group = CommandMenuGroup;
CommandMenuPlugin.Content = CommandMenuContent;
CommandMenuPlugin.Command = CommandMenuCommand;

export {
    CommandMenuPlugin,
    CommandMenuEmpty,
    CommandMenuList,
    CommandMenuItem,
    CommandMenuGroup,
    CommandMenuContent,
    CommandMenuCommand,
};
export * from './InsertCommands';
