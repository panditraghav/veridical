import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getNearestNodeFromDOMNode,
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    $isTextNode,
    LexicalEditor,
} from "lexical";
import {
    LinkIcon,
    FormatBoldButton,
    FormatItalicButton,
    FormatUnderlineButton,
    FormatLinkButton,
} from "@veridical/components";
import { useVeridicalTheme } from "@veridical/utils";

import { isHTMLElement } from "@veridical/utils";
import { $isLinkNode } from "@lexical/link";

const MENU_MARGIN = 5;

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    domSelection: Selection | null,
    animationClassName?: string
) {
    if (!menuElement || !domSelection) return;
    const range = domSelection.getRangeAt(0);

    const { left, top } = range.getBoundingClientRect();
    const { height } = menuElement.getBoundingClientRect();
    const { anchorOffset, focusOffset } = domSelection;
    if (anchorOffset == focusOffset) {
        menuElement.style.left = `${-100}px`;
        menuElement.style.top = `${-100}px`;
        menuElement.classList.remove(
            animationClassName || "defaultHighlightMenuAnimation"
        );
    } else {
        menuElement.classList.add(
            animationClassName || "defaultHighlightMenuAnimation"
        );
        menuElement.style.left = `${left}px`;
        menuElement.style.top = `${
            top - height - MENU_MARGIN + window.scrollY
        }px`;
    }
}

function hideMenu(
    menuElement: HTMLDivElement | null,
    animationClassName?: string
) {
    if (!menuElement) return;
    menuElement.style.left = `${-100}px`;
    menuElement.style.top = `${-100}px`;
    menuElement.classList.remove(
        animationClassName || "defaultHighlightMenuAnimation"
    );
}

function useHighlightMenu(editor: LexicalEditor) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();

    useEffect(() => {
        function handleSelectionChange(ev: Event) {
            const selection = window.getSelection();
            if (selection?.anchorOffset == selection?.focusOffset) {
                hideMenu(menuRef.current);
            }
        }
        document.addEventListener("selectionchange", handleSelectionChange);
        return () =>
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange
            );
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                const selectedNode = selection?.getNodes()[0];
                const selectedNodeParent = selectedNode?.getParent();
                if (
                    $isRangeSelection(selection) &&
                    ($isParagraphNode(selectedNode) ||
                        $isParagraphNode(selectedNodeParent) ||
                        $isLinkNode(selectedNodeParent))
                ) {
                    const domSelection = window.getSelection();
                    setMenuPosition(menuRef.current, domSelection);
                } else {
                    hideMenu(menuRef.current);
                }
            });
        });
    }, [editor]);

    return createPortal(
        <div ref={menuRef} className={theme?.highlightMenu?.menu}>
            <div className={theme?.highlightMenu?.menuContainer}>
                <FormatBoldButton />
                <FormatItalicButton />
                <FormatUnderlineButton />
                <FormatLinkButton />
            </div>
        </div>,
        document.body
    );
}

export default function HighlightMenuPlugin() {
    const [editor] = useLexicalComposerContext();
    return useHighlightMenu(editor);
}
