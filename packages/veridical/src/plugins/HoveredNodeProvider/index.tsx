import React, { useEffect, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, LexicalNode } from 'lexical';

import { getHoveredDOMNode, HoveredNodeContext, Offset } from '@/utils';

export default function HoveredNodeProvider({
    children,
    offset,
}: {
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
            const { lexicalDOMNode: domNode, key: nodeKey } = getHoveredDOMNode(
                ev,
                editor,
                offset,
            );
            setHoveredDOMNode(domNode);
            if (!nodeKey) return;
            editor.getEditorState().read(() => {
                const lexicalNode = $getNodeByKey(nodeKey);
                setHoveredLexicalNode(lexicalNode);
            });
        }
        document.addEventListener('mousemove', mouseEventListener);
        return () =>
            document.removeEventListener('mousemove', mouseEventListener);
    }, [editor, offset]);

    return (
        <HoveredNodeContext.Provider
            value={{ hoveredDOMNode, hoveredLexicalNode }}
        >
            {children}
        </HoveredNodeContext.Provider>
    );
}
