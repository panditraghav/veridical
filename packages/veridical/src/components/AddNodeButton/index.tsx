import { OPEN_COMMAND_MENU } from '@/commands';
import { useHoverMenuContext } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $createTextNode } from 'lexical';
import React from 'react';
import { AddIcon } from '..';

export function AddNodeButton() {
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();

    function handleClick() {
        if (!hoveredLexicalNode) return;
        editor.update(
            () => {
                const p = $createParagraphNode();
                const text = $createTextNode('');
                p.append(text);
                hoveredLexicalNode.insertAfter(p);
                p.select(0, 0);
            },
            {
                onUpdate: () => {
                    editor.dispatchCommand(OPEN_COMMAND_MENU, {
                        searchExpression: /^(?<search>\w*)$/,
                    });
                },
            },
        );
    }

    return (
        <button onClick={handleClick} tabIndex={-1}>
            <AddIcon size="base" />
        </button>
    );
}
