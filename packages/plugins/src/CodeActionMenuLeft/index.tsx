import React, { useRef, useState, useEffect } from "react";
import { useHoverMenuContext } from "..";
import { $isCodeNode, CodeNode } from "@lexical/code";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    codeDomNode: HTMLElement | null
) {
    if (!menuElement || !codeDomNode) return;
    const { top, left } = codeDomNode.getBoundingClientRect();
    const { width: menuWidth } = menuElement.getBoundingClientRect();
    console.log(menuWidth);
    menuElement.style.top = `${top + window.scrollY}px`;
    menuElement.style.left = `${left - menuWidth}px`;
    menuElement.style.display = `flex`;
}

function hideMenu(menuElement: HTMLElement | null) {
    if (!menuElement) return;
    menuElement.style.display = "none";
}

export default function CodeActionMenuLeft({
    children,
}: {
    children?: React.ReactNode;
}) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if ($isCodeNode(hoveredLexicalNode) && hoveredDOMNode) {
            setMenuPosition(menuRef.current, hoveredDOMNode);
        } else {
            hideMenu(menuRef.current);
        }
    }, [hoveredLexicalNode, hoveredDOMNode]);

    useEffect(() => {
        return editor.registerMutationListener(CodeNode, (nodes, payload) => {
            for (const [key, value] of nodes) {
                if (value === "destroyed") {
                    hideMenu(menuRef.current);
                }
            }
        });
    }, [editor]);

    return createPortal(
        <div style={{ position: "absolute", display: "none" }} ref={menuRef}>
            {children}
        </div>,
        document.body
    );
}
