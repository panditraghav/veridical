import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { isHTMLElement } from "../../utils";
import {
    $getNearestNodeFromDOMNode,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    LexicalEditor,
} from "lexical";
import HighlightMenu, { HighlightMenuStyle } from "./HighlightMenu";

const MENU_MARGIN = 5;

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    domSelection: Selection | null,
    style?: HighlightMenuStyle
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
            style?.highlightMenuAnimation || "defaultHighlightMenuAnimation"
        );
    } else {
        menuElement.classList.add(
            style?.highlightMenuAnimation || "defaultHighlightMenuAnimation"
        );
        menuElement.style.left = `${left}px`;
        menuElement.style.top = `${
            top - height - MENU_MARGIN + window.scrollY
        }px`;
    }
}

function hideMenu(
    menuElement: HTMLDivElement | null,
    style?: HighlightMenuStyle
) {
    if (!menuElement) return;
    menuElement.style.left = `${-100}px`;
    menuElement.style.top = `${-100}px`;
    menuElement.classList.remove(
        style?.highlightMenuAnimation || "defaultHighlightMenuAnimation"
    );
}

function useHighlightMenu(editor: LexicalEditor, style?: HighlightMenuStyle) {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleSelectionChange(ev: Event) {
            const selection = window.getSelection();
            if (selection?.anchorOffset == selection?.focusOffset)
                hideMenu(menuRef.current, style);
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
                if ($isRangeSelection(selection)) {
                    const domSelection = window.getSelection();
                    setMenuPosition(menuRef.current, domSelection, style);
                } else {
                    hideMenu(menuRef.current, style);
                }
            });
        });
    }, [editor]);

    return createPortal(
        <HighlightMenu style={style} menuRef={menuRef} editor={editor} />,
        document.body
    );
}

export default function HighlightMenuPlugin({
    style,
}: {
    style?: HighlightMenuStyle;
}) {
    const [editor] = useLexicalComposerContext();
    return useHighlightMenu(editor, style);
}
