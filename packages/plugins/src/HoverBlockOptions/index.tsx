import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    Offset,
    useHoverMenuContext,
    useVeridicalTheme,
} from '@veridical/utils';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Position {
    left: number;
    top: number;
}

function getMenuPosition(
    hoveredElement: HTMLElement | null,
    offset?: Offset,
): Position {
    if (!hoveredElement) {
        return {
            left: -100,
            top: -100,
        };
    }
    const elementRect = hoveredElement.getBoundingClientRect();
    const { x: elementX, y: elementY } = elementRect;

    return {
        left: elementX + (offset?.left || 0),
        top: elementY + (offset?.top || 0) + window.scrollY,
    };
}

export default function HoverBlockOptions({
    container,
    children,
    offset,
}: {
    container: Element | DocumentFragment;
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const { hoveredDOMNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();
    const [showMenu, setShowMenu] = useState(false);
    const [position, setPosition] = useState<Position>({
        left: -100,
        top: -100,
    });
    const theme = useVeridicalTheme();
    useEffect(() => {
        setPosition(getMenuPosition(hoveredDOMNode, offset));
        if (hoveredDOMNode) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }, [hoveredDOMNode]);

    useEffect(() => {
        return editor.registerUpdateListener(({ dirtyElements }) => {
            if (dirtyElements.get('root')) {
                setShowMenu(false);
            }
        });
    }, [editor]);

    if (!showMenu) return null;
    return createPortal(
        <div
            className={`${theme?.hoverBlockOption?.container} ${
                showMenu ? theme?.hoverMenu?.animation : ''
            }`}
            style={{ position: 'absolute', ...position }}
        >
            {children}
        </div>,
        container,
    );
}
