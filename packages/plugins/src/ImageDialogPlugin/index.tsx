import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogContentContainer,
    TextInput,
    FileInput,
    DialogActionGroup,
    CheckboxInput,
} from '@veridical/components';
import { IMAGE_DIALOG_COMMAND, useVeridicalTheme } from '@veridical/utils';
import { ImageNode } from '@veridical/nodes';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';

export interface AddImageDialogStyle {
    backdrop?: string;
    dialog?: string;
}

const DEFAULT_IS_MAX_WIDTH = true;

function getImageDimensions(src: string) {
    const img = new Image();
    img.src = src;
    return new Promise<{ naturalWidth: number; naturalHeight: number }>(
        (resolve, reject) => {
            img.onload = () => {
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                resolve({ naturalWidth, naturalHeight });
            };
            img.onerror = (ev) => {
                reject(ev);
            };
        },
    );
}

export default function ImageDialogPlugin({
    urlFromImageBlob,
}: {
    urlFromImageBlob?: (image: Blob) => Promise<string>;
}) {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    const [imageNode, setImageNode] = useState<ImageNode | null | undefined>();
    const [showDialog, setShowDialog] = useState(false);
    const [src, setSrc] = useState('');
    const [action, setAction] = useState<'edit' | 'add'>('add'); // Is dialog for adding image or editing
    const [altText, setAltText] = useState('');
    const [isMaxWidth, setIsMaxWidth] = useState(DEFAULT_IS_MAX_WIDTH);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<null | string>(null);

    const onClose = useCallback(() => {
        setShowDialog(false);
        // If action is edit then don't remove imageNode when closing dialog.
        if (action === 'edit') return;
        editor.update(() => {
            imageNode?.remove();
        });
    }, [action]);

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

    useEffect(() => {
        if (!showDialog) return;
        function handleKeyDown(ev: KeyboardEvent) {
            if (ev.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, showDialog]);

    useEffect(() => {
        // When image node changes we set the state with values of new ImageNode
        setIsLoading(false);
        setSrc(imageNode?.getSrc() || '');
        setAltText(imageNode?.getAltText() || '');
        setIsMaxWidth(() => {
            if (imageNode) {
                return imageNode.isMaxWidth();
            }
            return DEFAULT_IS_MAX_WIDTH;
        });
        setIsError(null);
    }, [imageNode]);

    async function handleImageSelection(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        // TODO: Add ability to pass a callback to handle image selection
        const files = event.target.files;
        const file = files ? files[0] : new Blob();
        if (urlFromImageBlob) {
            const url = await urlFromImageBlob(file);
            setSrc(url);
        }
    }

    async function handleSave() {
        try {
            setIsLoading(true);
            const { naturalHeight, naturalWidth } = await getImageDimensions(
                src,
            );
            setIsLoading(false);
            editor.update(() => {
                imageNode?.setSrc(src);
                imageNode?.setAltText(altText);
                imageNode?.setHeight(naturalHeight);
                imageNode?.setWidth(naturalWidth);
                imageNode?.setIsMaxWidth(isMaxWidth);
            });
            setShowDialog(false);
        } catch (error) {
            setIsLoading(false);
            setIsError('Invalid image url');
        }
    }

    return (
        <Dialog
            showDialog={showDialog}
            onClose={onClose}
            width={480}
            height={'auto'}
            anchorElement={document.body}
        >
            <div className={theme?.dialog?.title}>
                {action === 'edit' ? 'Edit Image' : 'Add Image'}
            </div>
            <DialogContentContainer>
                <div className={theme?.addImageDialog?.imageInput?.container}>
                    <TextInput
                        type="url"
                        placeholder="Enter image url"
                        value={src}
                        onChange={(e) => setSrc(e.target.value)}
                    />
                    <FileInput
                        label=""
                        onChange={handleImageSelection}
                        accept="image/jpeg, image/png"
                        disabled={urlFromImageBlob ? false : true}
                    />
                </div>
                <TextInput
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Alternative text"
                />
                <CheckboxInput
                    isChecked={isMaxWidth ? isMaxWidth : false}
                    onChange={(e) => setIsMaxWidth(e.target.checked)}
                    label="Maximum width: "
                />
            </DialogContentContainer>
            <DialogActionGroup>
                <Button
                    type="primary"
                    onClick={handleSave}
                    isDisabled={isLoading}
                >
                    {'Save'}
                </Button>
                <Button type="secondary" onClick={onClose}>
                    {'Cancel'}
                </Button>
            </DialogActionGroup>
        </Dialog>
    );
}
