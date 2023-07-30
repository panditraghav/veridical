import { MOVE_SELECTED_NODE_COMMAND } from '@/commands';
import { $getTopLevelSelectedNode } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
} from 'lexical';
import { useEffect } from 'react';

export function RegisterMoveCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            MOVE_SELECTED_NODE_COMMAND,
            ({ dir }) => {
                const selection = $getSelection();
                const selectedNode = selection?.getNodes()[0];

                if (!$isRangeSelection(selection)) return false;
                const anchorOffset = selection.anchor.offset;
                const focusOffset = selection.anchor.offset;

                const topLevelSelectedNode = $getTopLevelSelectedNode();
                if (!topLevelSelectedNode) return false;

                if (dir == 'up') {
                    const previous = topLevelSelectedNode.getPreviousSibling();
                    if (!previous) return false;

                    topLevelSelectedNode.remove();
                    previous.insertBefore(topLevelSelectedNode);
                } else {
                    const next = topLevelSelectedNode.getNextSibling();
                    if (!next) return false;

                    topLevelSelectedNode.remove();
                    next.insertAfter(topLevelSelectedNode);
                }
                if (selectedNode?.select) {
                    selectedNode?.select(anchorOffset, focusOffset);
                }

                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);

    return null;
}
