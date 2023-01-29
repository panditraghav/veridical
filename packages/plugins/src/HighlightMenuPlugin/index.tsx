import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useVeridicalTheme } from '@veridical/utils';
import {
    $createRangeSelection,
    $getSelection,
    $isRangeSelection,
    $setSelection,
    FORMAT_TEXT_COMMAND,
    RangeSelection,
} from 'lexical';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
    FormatBoldIcon,
    FormatItalicIcon,
    FormatUnderlineIcon,
    LinkIcon,
} from '@veridical/components';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isCodeNode } from '@lexical/code';

const OFFSET_Y = -50;

type Position = {
    left: number;
    top: number;
};

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

function FormatLinkButton({
    onClose,
    isLink,
}: {
    onClose: () => void;
    isLink: boolean;
}) {
    const theme = useVeridicalTheme()?.highlightMenu;
    const [editor] = useLexicalComposerContext();

    const getPayload = useCallback((): string | null => {
        let payload: string | null = null;

        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            if (selectionHasLinkNode(selection)) {
                payload = null;
            } else {
                payload = 'https://';
            }
        });

        return payload;
    }, [editor]);

    return (
        <button
            className={theme?.menuButton}
            onClick={() => {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, getPayload());
                onClose();
            }}
        >
            <LinkIcon
                className={
                    isLink
                        ? theme?.menuButtonIconSelected
                        : theme?.menuButtonIcon
                }
                size="base"
            />
        </button>
    );
}

function FormatItalicButton({ isItalic }: { isItalic: boolean }) {
    const theme = useVeridicalTheme()?.highlightMenu;
    const [editor] = useLexicalComposerContext();
    return (
        <button
            className={theme?.menuButton}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }
        >
            <FormatItalicIcon
                className={
                    isItalic
                        ? theme?.menuButtonIconSelected
                        : theme?.menuButtonIcon
                }
                size="base"
            />
        </button>
    );
}

function FormatBoldButton({ isBold }: { isBold: boolean }) {
    const theme = useVeridicalTheme()?.highlightMenu;
    const [editor] = useLexicalComposerContext();
    return (
        <button
            className={`${theme?.menuButton}`}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        >
            <FormatBoldIcon
                className={
                    isBold
                        ? theme?.menuButtonIconSelected
                        : theme?.menuButtonIcon
                }
                size="base"
            />
        </button>
    );
}

function FormatUnderlineButton({ isUnderline }: { isUnderline: boolean }) {
    const theme = useVeridicalTheme()?.highlightMenu;
    const [editor] = useLexicalComposerContext();
    return (
        <button
            className={theme?.menuButton}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }
        >
            <FormatUnderlineIcon
                className={
                    isUnderline
                        ? theme?.menuButtonIconSelected
                        : theme?.menuButtonIcon
                }
                size="base"
            />
        </button>
    );
}

export default function HighlightMenuPlugin({
    children,
}: {
    children?: React.ReactNode;
}) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const theme = useVeridicalTheme()?.highlightMenu;
    const [editor] = useLexicalComposerContext();
    const [menuPosition, setMenuPosition] = useState<Position>({
        left: -1000,
        top: -1000,
    });
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isLink, setIsLink] = useState(false);

    const positionMenu = useCallback(() => {
        const domSelection = window.getSelection();
        if (!domSelection) return;
        const { top, left } = domSelection
            .getRangeAt(0)
            .getBoundingClientRect();
        setMenuPosition({
            left: left,
            top: top + window.scrollY + OFFSET_Y,
        });
    }, []);

    const hideMenu = useCallback(() => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const newSelection = $createRangeSelection();
                const focus = selection.focus;
                newSelection.focus = focus;
                newSelection.anchor = focus;
                $setSelection(newSelection);
            }
        });
    }, [editor]);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) &&
                    !selectionHasCodeNode(selection) &&
                    selection.getTextContent().trim() !== ''
                ) {
                    positionMenu();
                    setShowMenu(true);

                    setIsBold(selection.hasFormat('bold'));
                    setIsUnderline(selection.hasFormat('underline'));
                    setIsItalic(selection.hasFormat('italic'));
                    setIsLink(selectionHasLinkNode(selection));
                } else {
                    setShowMenu(false);
                }
            });
        });
    }, [editor]);

    return (
        <>
            {showMenu && (
                <div
                    style={{ position: 'absolute', ...menuPosition }}
                    className={`${theme?.menu} ${theme?.animation}`}
                    ref={menuRef}
                >
                    <FormatBoldButton isBold={isBold} />
                    <FormatItalicButton isItalic={isItalic} />
                    <FormatUnderlineButton isUnderline={isUnderline} />
                    <FormatLinkButton isLink={isLink} onClose={hideMenu} />
                    {children}
                </div>
            )}
        </>
    );
}
