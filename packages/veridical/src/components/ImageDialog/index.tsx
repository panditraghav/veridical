import React, { useEffect, useState } from 'react';
import {
    Button,
    CheckboxInput,
    Dialog,
    DialogActionGroup,
    DialogContentContainer,
    FileInput,
    TextInput,
} from '../../components';
import { useVeridicalTheme } from '../../utils';
import { ImageNode } from '../../nodes';

interface Props {
    showDialog: boolean;
    onClose: () => void;
    onSave: (
        src: string,
        altText: string,
        naturalHeight: number,
        naturalWidth: number,
        isMaxWidth: boolean,
    ) => Promise<void>;
    width: string | number;
    height: string | number;
    container: Element | DocumentFragment;
    action: 'edit' | 'add';
    imageNode: ImageNode | null | undefined;
    urlFromImageBlob?: (image: Blob) => Promise<string>;
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

export default function ImageDialog({
    width,
    height,
    container,
    action,
    imageNode,
    urlFromImageBlob,
    showDialog,
    onClose,
    onSave,
}: Props) {
    const theme = useVeridicalTheme();
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');
    const [isMaxWidth, setIsMaxWidth] = useState(DEFAULT_IS_MAX_WIDTH);
    const [isLoading, setIsLoading] = useState(false);
    const [isSrcError, setIsSrcError] = useState<boolean>(false);

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
        setIsSrcError(false);
    }, [imageNode]);

    async function handleImageSelection(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const files = event.target.files;
        const file = files ? files[0] : new Blob();
        if (urlFromImageBlob) {
            const url = await urlFromImageBlob(file);
            setSrc(url);
        }
    }

    async function handleSave() {
        try {
            setIsSrcError(false);
            setIsLoading(true);
            const { naturalHeight, naturalWidth } = await getImageDimensions(
                src,
            );
            setIsLoading(false);
            await onSave(src, altText, naturalHeight, naturalWidth, isMaxWidth);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsSrcError(true);
        }
    }

    return (
        <Dialog
            showDialog={showDialog}
            onClose={onClose}
            width={width}
            height={height}
            container={container}
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
                        autoFocus={true}
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
