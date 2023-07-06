import React, { useState, useEffect, useCallback } from 'react';
import { IMAGE_DIALOG_COMMAND } from '../../utils';
import { ImageNode } from '../../nodes';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import { ImageDialog } from '../../components';

export interface AddImageDialogStyle {
    backdrop?: string;
    dialog?: string;
}

export default function ImageDialogPlugin({
    urlFromImageBlob,
    container,
}: {
    urlFromImageBlob?: (image: Blob) => Promise<string>;
    container: Element | DocumentFragment;
}) {
    const [editor] = useLexicalComposerContext();
    const [imageNode, setImageNode] = useState<ImageNode | null | undefined>();
    const [showDialog, setShowDialog] = useState(false);
    const [action, setAction] = useState<'edit' | 'add'>('add'); // Is dialog for adding image or editing

    useEffect(() => {
        return editor.registerCommand(
            IMAGE_DIALOG_COMMAND,
            ({ imageNode, action }) => {
                if (imageNode) {
                    setShowDialog(true);
                } else {
                    setShowDialog(false);
                }
                setImageNode(imageNode);
                setAction(action);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    const onClose = useCallback(() => {
        setShowDialog(false);
        // If action is edit then don't remove imageNode when closing dialog.
        if (action === 'edit') return;
        editor.update(() => {
            imageNode?.remove();
        });
    }, [action, editor, imageNode]);

    async function onSave(
        src: string,
        altText: string,
        naturalHeight: number,
        naturalWidth: number,
        isMaxWidth: boolean,
    ) {
        editor.update(() => {
            imageNode?.setSrc(src);
            imageNode?.setAltText(altText);
            imageNode?.setNaturalHeight(naturalHeight);
            imageNode?.setNaturalWidth(naturalWidth);
            imageNode?.setIsMaxWidth(isMaxWidth);
        });
        setShowDialog(false);
    }

    return (
        <ImageDialog
            width={480}
            height={'auto'}
            container={container}
            action={action}
            urlFromImageBlob={urlFromImageBlob}
            imageNode={imageNode}
            showDialog={showDialog}
            onClose={onClose}
            onSave={onSave}
        />
    );
}
