import React, { useRef, useEffect } from 'react';
import { useHoverMenuContext } from '..';
import { $isCodeNode, CodeNode } from '@lexical/code';
import { createPortal } from 'react-dom';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useVeridicalTheme } from '@veridical/utils';

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    codeDomNode: HTMLElement | null,
    animationClassname?: string,
) {
    if (!menuElement || !codeDomNode) return;
    const { top, left } = codeDomNode.getBoundingClientRect();
    menuElement.style.top = `${top + window.scrollY}px`;
    menuElement.style.left = `${left}px`;
    menuElement.style.display = `flex`;
    menuElement.classList.add(
        `${animationClassname || 'defaultHoverMenuAnimation'}`,
    );
}

function hideMenu(
    menuElement: HTMLElement | null,
    animationClassname?: string,
) {
    if (!menuElement) return;
    menuElement.style.display = 'none';
    menuElement.classList.remove(
        `${animationClassname || 'defaultHoverMenuAnimation'}`,
    );
}

export default function CodeActionMenuLeft({
    children,
}: {
    children?: React.ReactNode;
}) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [editor] = useLexicalComposerContext();
    const theme = useVeridicalTheme();

    useEffect(() => {
        if ($isCodeNode(hoveredLexicalNode) && hoveredDOMNode) {
            setMenuPosition(
                menuRef.current,
                hoveredDOMNode,
                theme?.hoverMenu?.animation,
            );
        } else {
            hideMenu(menuRef.current, theme?.hoverMenu?.animation);
        }
    }, [hoveredLexicalNode, hoveredDOMNode]);

    useEffect(() => {
        return editor.registerMutationListener(CodeNode, (nodes, payload) => {
            for (const [key, value] of nodes) {
                if (value === 'destroyed') {
                    hideMenu(menuRef.current);
                }
            }
        });
    }, [editor]);

    return createPortal(
        <div
            style={{ position: 'absolute', display: 'none' }}
            className={theme?.codeActionMenu?.menuLeft}
            ref={menuRef}
        >
            {children}
        </div>,
        document.body,
    );
}
