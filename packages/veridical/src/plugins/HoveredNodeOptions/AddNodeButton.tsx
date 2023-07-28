import { INSERT_PARAGRAPH_COMMAND } from '@/commands';
import { useHoveredNode } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';

export function AddNodeButton(props: React.HTMLAttributes<HTMLButtonElement>) {
    const { hoveredLexicalNode } = useHoveredNode();
    const [editor] = useLexicalComposerContext();

    function handleClick() {
        if (!hoveredLexicalNode) return;
        editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, {
            node: hoveredLexicalNode,
            position: 'after',
            content: '/',
        });
    }

    return <button {...props} onClick={handleClick} tabIndex={-1} />;
}
