import { INSERT_PARAGRAPH_COMMAND } from '@/commands';
import { $getTopLevelSelectedNode } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $createParagraphNode,
    $createTextNode,
    COMMAND_PRIORITY_LOW,
    LexicalNode,
} from 'lexical';
import { useEffect } from 'react';

export function RegisterInsertParagraphCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_PARAGRAPH_COMMAND,
            ({ node, position = 'after', content }) => {
                let selectedNode: LexicalNode | undefined | null = node;
                if (!selectedNode) {
                    selectedNode = $getTopLevelSelectedNode();
                }
                if (!selectedNode) return false;

                const offset = content?.length || 0;
                const p = $createParagraphNode();
                const text = $createTextNode(content);
                p.append(text);

                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(p);
                        break;
                    case 'before':
                        selectedNode.insertBefore(p);
                        break;
                    default:
                        selectedNode.insertAfter(p);
                        break;
                }

                p.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}
