import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, RangeSelection } from 'lexical';
import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import * as Popover from '@radix-ui/react-popover';

import { $isLinkNode } from '@lexical/link';
import { $isCodeNode } from '@lexical/code';

function selectionHasLinkNode(selection: RangeSelection): boolean {
    let hasLink = false;
    const nodes = selection.getNodes();
    nodes.forEach((node) => {
        const parent = node.getParent();
        if ($isLinkNode(node) || $isLinkNode(parent)) {
            hasLink = true;
        }
    });

    return hasLink;
}

function selectionHasCodeNode(selection: RangeSelection): boolean {
    let hasCode = false;
    const nodes = selection.getNodes();
    nodes.forEach((node) => {
        const parent = node.getParent();
        if ($isCodeNode(node) || $isCodeNode(parent)) {
            hasCode = true;
        }
    });
    return hasCode;
}

export type FormatsType = {
    bold: boolean;
    underline: boolean;
    strikethrough: boolean;
    italic: boolean;
    code: boolean;
    subscript: boolean;
    superscript: boolean;
    link: boolean;
};

const defaultFormats: FormatsType = {
    bold: false,
    underline: false,
    italic: false,
    strikethrough: false,
    code: false,
    subscript: false,
    superscript: false,
    link: false,
};

export type FloatingActionMenuContextType = {
    formats: FormatsType;
    closeMenu: () => void;
};
const FloatingActionMenuContext = createContext<FloatingActionMenuContextType>({
    formats: defaultFormats,
    closeMenu: () => {
        /**/
    },
});
const useFloatingActionMenu = () => useContext(FloatingActionMenuContext);

export function FloatingActionMenuPlugin({
    children,
    container,
}: {
    children?: React.ReactNode;
    container?: HTMLElement;
}) {
    const [open, setOpen] = useState(false);
    const [editor] = useLexicalComposerContext();
    const [formats, setFormats] = useState<FormatsType>(defaultFormats);

    const anchorRef = useRef<HTMLDivElement | null>(null);

    function $updateFormat(selection: RangeSelection) {
        const hasLink = selectionHasLinkNode(selection);
        setFormats((prev) => {
            prev.bold = selection.hasFormat('bold');
            prev.italic = selection.hasFormat('italic');
            prev.strikethrough = selection.hasFormat('strikethrough');
            prev.superscript = selection.hasFormat('superscript');
            prev.subscript = selection.hasFormat('subscript');
            prev.code = selection.hasFormat('code');
            prev.underline = selection.hasFormat('underline');
            prev.link = hasLink;
            return { ...prev };
        });
    }

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) &&
                    !selectionHasCodeNode(selection) &&
                    selection.getTextContent().trim() !== ''
                ) {
                    positionAnchor();
                    $updateFormat(selection);
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            });
        });
    }, [editor]);

    function positionAnchor() {
        const domSelection = window.getSelection();
        const anchor = anchorRef.current;
        if (!domSelection || !anchor) return;
        const { top, left, width, height } = domSelection
            .getRangeAt(0)
            .getBoundingClientRect();

        const cRect = container?.getBoundingClientRect();

        anchor.style.left = `${left - (cRect?.left || 0)}px`;
        anchor.style.top = `${top + window.scrollY - (cRect?.top || 0)}px`;
        anchor.style.width = `${width}px`;
        anchor.style.height = `${height}px`;
    }

    const contextValue: FloatingActionMenuContextType = {
        formats,
        closeMenu: () => setOpen(false),
    };

    return (
        <FloatingActionMenuContext.Provider value={contextValue}>
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Anchor
                    ref={anchorRef}
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                    }}
                />
                <Popover.Portal container={container}>
                    {children}
                </Popover.Portal>
            </Popover.Root>
        </FloatingActionMenuContext.Provider>
    );
}

const FloatingActionMenuPluginContent = forwardRef<
    React.ElementRef<typeof Popover.Content>,
    React.ComponentPropsWithoutRef<typeof Popover.Content>
>((props, forwardedRef) => {
    const { align, onOpenAutoFocus, ...etc } = props;

    function onOpenAutoFocusDefault(ev: Event) {
        ev.preventDefault();
    }

    return (
        <Popover.Content
            onOpenAutoFocus={onOpenAutoFocus || onOpenAutoFocusDefault}
            side="top"
            align={align || 'center'}
            ref={forwardedRef}
            {...etc}
        />
    );
});
FloatingActionMenuPluginContent.displayName = 'FloatingActionMenuContent';
const FloatingActionMenuPluginArrow = Popover.Arrow;

FloatingActionMenuPlugin.Content = FloatingActionMenuPluginContent;
FloatingActionMenuPlugin.Arrow = FloatingActionMenuPluginArrow;

export { useFloatingActionMenu, FloatingActionMenuContext };
