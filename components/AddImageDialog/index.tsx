import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { AddIcon, ImageIcon } from "..";
import { useVeridicalTheme } from "@veridical/utils";
import { Backdrop, Button, DialogAnimation } from "..";
import OverlayContainer from "../OverlayContainer";

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
        width: number
    ) => void;
    style?: AddImageDialogStyle;
}

export default function AddImageDialog({
    showDialog,
    onClose,
    onSave,
    style,
}: AddImageDialogProps) {
    const theme = useVeridicalTheme();
    const [src, setSrc] = useState("");
    const [altText, setAltText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<null | string>(null);

    useEffect(() => {
        if (!showDialog) return;
        function handleKeyDown(ev: KeyboardEvent) {
            if (ev.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, showDialog]);

    useEffect(() => {
        setIsLoading(false);
        setSrc("");
        setAltText("");
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
            }
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
                src
            );
            setIsLoading(false);
            onSave(src, altText, naturalHeight, naturalWidth);
        } catch (error) {
            setIsLoading(false);
            setIsError("Invalid image url");
        }
    }

    if (!showDialog) return null;

    return createPortal(
        <OverlayContainer>
            <Backdrop onClose={onClose}>
                <DialogAnimation>
                    <div
                        className={`${theme?.addImageDialog?.dialog} ${theme?.dialog?.dialog}`}
                    >
                        <div className={theme?.addImageDialog?.title}>
                            <ImageIcon
                                size="base"
                                className={"DefaultAddImageDialogIcon"}
                            />
                            <span>Add an image</span>
                        </div>
                        <div
                            className={
                                theme?.addImageDialog?.imageInput?.container
                            }
                        >
                            <input
                                type="url"
                                placeholder="Enter image url"
                                name="Image url"
                                value={src}
                                onChange={(e) => setSrc(e.target.value)}
                                className={
                                    theme?.addImageDialog?.imageInput?.urlInput
                                }
                            />
                            <label
                                htmlFor="DefaultAddImageDialog_ImageFileInput"
                                className={
                                    theme?.addImageDialog?.imageInput
                                        ?.fileInputLabel
                                }
                            >
                                <AddIcon size="base" />
                                <div>Choose a file</div>
                            </label>
                            <input
                                type="file"
                                id="DefaultAddImageDialog_ImageFileInput"
                                className={
                                    theme?.addImageDialog?.imageInput?.fileInput
                                }
                                onChange={handleImageSelection}
                                accept="image/png, image/jpeg"
                            />
                        </div>
                        <input
                            type="text"
                            name="Alternative text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            placeholder="Alternative text"
                            className={theme?.addImageDialog?.altTextInput}
                        />
                        <div
                            className={theme?.addImageDialog?.actionButtonGroup}
                        >
                            <Button
                                type="primary"
                                onClick={handleSave}
                                isDisabled={isLoading}
                            >
                                {"Save"}
                            </Button>
                            <Button type="secondary" onClick={onClose}>
                                {"Cancel"}
                            </Button>
                        </div>
                    </div>
                </DialogAnimation>
            </Backdrop>
        </OverlayContainer>,
        document.body
    );
}
