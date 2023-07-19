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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

const CMDK_ITEM_SELECTOR = `[cmdk-item=""]`;
const CMDK_SELECT_EVENT = `cmdk-item-select`;
const CMDK_VALID_ITEM_SELECTOR = `${CMDK_ITEM_SELECTOR}:not([aria-disabled="true"])`;

const CMDK_ITEM_ATTR = `cmdk-item`;
const CMDK_ROOT_ATTR = 'cmdk-root';
const CMDK_VALUE_ATTR = `data-value`;
const CMDK_SELECT_ATTR = 'data-selected';

export type CommandMenuClassNames = {
    commandRoot?: string;
    popoverContent?: string;
};

type CommandMenuProps = {
    classNames?: CommandMenuClassNames;
    defaultValue?: string;
    children?: React.ReactNode;
};

function getCmdkItem(target: EventTarget): Element | null {
    if (!(target instanceof Element)) return null;

    if (target.hasAttribute(CMDK_ITEM_ATTR)) return target;

    let parent: HTMLElement | null | undefined = target.parentElement;
    while (!parent || !parent.hasAttribute(CMDK_ROOT_ATTR)) {
        if (parent?.hasAttribute(CMDK_ITEM_ATTR)) return parent;
        parent = parent?.parentElement;
    }
    return null;
}

export default function CommandMenuPlugin({
    classNames,
    defaultValue,
    children,
}: CommandMenuProps) {
    const [open, setOpen] = useState(false);
    const [searchExpression, setSearchExpression] = useState<RegExp | null>(
        null,
    );
    const [searchText, setSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [editor] = useLexicalComposerContext();

    const cmdkRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const contentSideOffset = useRef<number>(0);

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
        setSearchExpression(null);
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

        contentSideOffset.current = height / 2;
        anchor.style.position = 'absolute';
        anchor.style.left = `${left}px`;
        anchor.style.top = `${top + height / 2 + window.scrollY}px`;
    }

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
    const changeItemSelectionBy = useCallback((changeBy: -1 | 1) => {
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

    const deleteSearchText = useCallback(() => {
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
    }, [searchExpression]);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                KEY_ENTER_COMMAND,
                (ev) => {
                    if (!open) return false;
                    ev?.preventDefault();
                    deleteSearchText();

                    const item = getSelectedItem();
                    item?.dispatchEvent(new Event(CMDK_SELECT_EVENT));
                    closeAndResetState();
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_ARROW_DOWN_COMMAND,
                (ev) => {
                    if (!open) return false;
                    ev.preventDefault();
                    changeItemSelectionBy(1);
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_ARROW_UP_COMMAND,
                (ev) => {
                    if (!open) return false;
                    ev.preventDefault();
                    changeItemSelectionBy(-1);
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor, open, deleteSearchText, changeItemSelectionBy]);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Anchor
                ref={anchorRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                }}
            />
            <Popover.Portal>
                <RemoveScroll as={Slot} allowPinchZoom>
                    <Popover.Content
                        onOpenAutoFocus={(ev) => ev.preventDefault()}
                        sideOffset={contentSideOffset.current}
                        align="start"
                        className={classNames?.popoverContent}
                    >
                        <Command
                            className={classNames?.commandRoot}
                            defaultValue={defaultValue}
                            value={selectedValue}
                            label="Slash Command Menu"
                            onValueChange={setSelectedValue}
                            ref={cmdkRef}
                            onMouseDown={(ev) => {
                                const itemOrNull = getCmdkItem(ev.target);
                                if (itemOrNull) {
                                    ev.preventDefault();
                                    editor.update(() => {
                                        deleteSearchText();
                                        itemOrNull.dispatchEvent(
                                            new Event(CMDK_SELECT_EVENT),
                                        );
                                        closeAndResetState();
                                    });
                                }
                            }}
                        >
                            <Command.Input
                                value={searchText}
                                style={{ display: 'none' }}
                                autoFocus={false}
                            />
                            {children}
                        </Command>
                    </Popover.Content>
                </RemoveScroll>
            </Popover.Portal>
        </Popover.Root>
    );
}

export const CommandItem = React.forwardRef<
    React.ElementRef<typeof Command.Item>,
    React.ComponentPropsWithoutRef<typeof Command.Item>
>((props, forwardedRef) => {
    return <Command.Item ref={forwardedRef} {...props} />;
});
CommandItem.displayName = 'CommandItem';

export const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof Command.Empty>,
    React.ComponentPropsWithoutRef<typeof Command.Empty>
>((props, forwardedRef) => {
    return <Command.Empty ref={forwardedRef} {...props} />;
});
CommandEmpty.displayName = 'CommandEmpty';

export const CommandList = React.forwardRef<
    React.ElementRef<typeof Command.List>,
    React.ComponentPropsWithoutRef<typeof Command.List>
>((props, forwardedRef) => {
    return <Command.List ref={forwardedRef} {...props} />;
});
CommandList.displayName = 'CommandList';

export const CommandGroup = React.forwardRef<
    React.ElementRef<typeof Command.Group>,
    React.ComponentPropsWithoutRef<typeof Command.Group>
>((props, forwardedRef) => {
    return <Command.Group ref={forwardedRef} {...props} />;
});
CommandGroup.displayName = 'CommandGroup';

export * from './InsertCommands';
