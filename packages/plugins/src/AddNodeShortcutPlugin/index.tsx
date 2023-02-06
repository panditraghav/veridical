import React, { useEffect } from 'react';
import { $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ADD_NODE_DIALOG_COMMAND } from '@veridical/utils';

function defaultIsKeydown(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === 'k') return true;
    return false;
}

export default function AddNodeShortcutPlugin({
    isKeydown = defaultIsKeydown,
}: {
    isKeydown?: (ev: KeyboardEvent) => boolean;
}) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        function keydownListener(ev: KeyboardEvent) {
            if (isKeydown(ev)) {
                ev.preventDefault();
                editor.getEditorState().read(() => {
                    const selection = $getSelection();
                    const node = selection?.getNodes()[0];
                    editor.dispatchCommand(ADD_NODE_DIALOG_COMMAND, {
                        selectedNode: node,
                    });
                });
            }
        }
        document.addEventListener('keydown', keydownListener);
        return () => document.removeEventListener('keydown', keydownListener);
    });

    return null;
}
