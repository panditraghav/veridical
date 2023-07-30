import { OPEN_COMMAND_MENU } from '@/commands';
import { useHoveredNode } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode } from 'lexical';
import React from 'react';

export function AddNodeButton(props: React.HTMLAttributes<HTMLButtonElement>) {
    const { hoveredLexicalNode } = useHoveredNode();
    const [editor] = useLexicalComposerContext();

    function handleClick() {
        if (!hoveredLexicalNode) return;
        editor.update(
            () => {
                const p = $createParagraphNode();
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

    return <button {...props} onClick={handleClick} tabIndex={-1} />;
}
