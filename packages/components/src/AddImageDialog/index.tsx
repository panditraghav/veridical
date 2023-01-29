import React, { useState, useEffect } from 'react';

import {
    Button,
    Dialog,
    DialogContentContainer,
    TextInput,
    FileInput,
    DialogActionGroup,
} from '..';
import { useVeridicalTheme } from '@veridical/utils';

export interface AddImageDialogStyle {
    backdrop?: string;
    dialog?: string;
}

export interface AddImageDialogProps {
    showDialog: boolean;
    onClose: () => void;
    onSave: (
        src: string,
        altText: string,
        height: number,
        width: number,
    ) => void;
}

export default function AddImageDialog({
    showDialog,
    onClose,
    onSave,
}: AddImageDialogProps) {
    const theme = useVeridicalTheme();
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<null | string>(null);

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
        setIsLoading(false);
        setSrc('');
        setAltText('');
        setIsError(null);
    }, [showDialog]);

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

    function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        const file = files ? files[0] : new Blob();
        const url = URL.createObjectURL(file);
        setSrc(url);
    }

    async function handleSave() {
        try {
            setIsLoading(true);
            const { naturalHeight, naturalWidth } = await getImageDimensions(
                src,
            );
            setIsLoading(false);
            onSave(src, altText, naturalHeight, naturalWidth);
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
            <div className={theme?.dialog?.title}>Add an image</div>
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
                    />
                </div>
                <TextInput
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Alternative text"
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
