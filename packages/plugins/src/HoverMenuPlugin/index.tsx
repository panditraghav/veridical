import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { $getNodeByKey, LexicalNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { getHoveredDOMNode, Offset, HoverMenuProvider } from '@veridical/utils';

function isOverlay(ev: MouseEvent): boolean {
    let target: HTMLElement | null = ev.target as HTMLElement;
    while (target) {
        if (target.getAttribute('data-type') === 'overlay') return true;
        target = target.parentElement;
    }
    return false;
}

export default function HoverMenuPlugin({
    container,
    children,
    offset,
}: {
    container: Element | DocumentFragment;
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const [editor] = useLexicalComposerContext();
    const [hoveredDOMNode, setHoveredDOMNode] = useState<HTMLElement | null>(
        null,
    );
    const [hoveredLexicalNode, setHoveredLexicalNode] =
        useState<LexicalNode | null>(null);

    useEffect(() => {
        function mouseEventListener(ev: MouseEvent) {
            if (isOverlay(ev)) return;
            const { lexicalDOMNode: domNode, key: nodeKey } = getHoveredDOMNode(
                ev,
                editor,
                offset,
            );
            setHoveredDOMNode(domNode);
            editor.update(() => {
                if (!nodeKey) return;
                const lexicalNode = $getNodeByKey(nodeKey);
                setHoveredLexicalNode(lexicalNode);
            });
        }
        document.addEventListener('mousemove', mouseEventListener);
        return () =>
            document.removeEventListener('mousemove', mouseEventListener);
    });

    return createPortal(
        <HoverMenuProvider value={{ hoveredDOMNode, hoveredLexicalNode }}>
            {children}
        </HoverMenuProvider>,
        container,
    );
}
