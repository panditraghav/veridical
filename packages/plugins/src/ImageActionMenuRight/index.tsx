import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useVeridicalTheme, useHoverMenuContext } from '@veridical/utils';
import { $isImageNode, ImageNode } from '@veridical/nodes';

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    imageDomNode: HTMLElement | null,
) {
    if (!menuElement || !imageDomNode) return;
    const {
        top,
        left,
        width: codeNodeWidth,
    } = imageDomNode.getBoundingClientRect();
    menuElement.style.top = `${top + window.scrollY}px`;
    menuElement.style.left = `${left + codeNodeWidth}px`;
    menuElement.style.display = `flex`;
}

function hideMenu(menuElement: HTMLElement | null) {
    if (!menuElement) return;
    menuElement.style.display = 'none';
}

export default function ImageActionMenuRight({
    children,
    container,
}: {
    children?: React.ReactNode;
    container: Element | DocumentFragment;
}) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [editor] = useLexicalComposerContext();
    const theme = useVeridicalTheme();

    useEffect(() => {
        if ($isImageNode(hoveredLexicalNode) && hoveredDOMNode) {
            setMenuPosition(menuRef.current, hoveredDOMNode);
        } else {
            hideMenu(menuRef.current);
        }
        if (menuRef.current) {
            const currentLeft = parseFloat(menuRef.current.style.left);
            const { width } = menuRef.current.getBoundingClientRect();
            menuRef.current.style.left = `${currentLeft - width}px`;
        }
    }, [hoveredLexicalNode, hoveredDOMNode]);

    useEffect(() => {
        return editor.registerMutationListener(ImageNode, (nodes, payload) => {
            for (const [key, value] of nodes) {
                if (value === 'destroyed') {
                    hideMenu(menuRef.current);
                }
            }
        });
    }, [editor]);

    return createPortal(
        <div
            className={`${theme?.codeActionMenu?.menuRight}`}
            style={{ position: 'absolute', display: 'none' }}
            ref={menuRef}
        >
            {children}
        </div>,
        container,
    );
}
