import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalEditor, $getNodeByKey } from 'lexical';
import { $isImageNode, ImageNode } from '@veridical/nodes';
import { IMAGE_DIALOG_COMMAND } from '@veridical/utils';

function useImagePlugin(editor: LexicalEditor) {
    useEffect(() => {
        return editor.registerMutationListener(ImageNode, (nodes) => {
            nodes.forEach((value, key) => {
                if (value == 'created') {
                    editor.getEditorState().read(() => {
                        const imgNode = $getNodeByKey(key);
                        if (
                            $isImageNode(imgNode) &&
                            (imgNode.getSrc() === '' || !imgNode.getSrc())
                        ) {
                            editor.dispatchCommand(IMAGE_DIALOG_COMMAND, {
                                imageNode: imgNode,
                                action: 'add',
                            });
                        }
                    });
                }
            });
        });
    }, [editor]);

    return null;
}

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();
    return useImagePlugin(editor);
}
