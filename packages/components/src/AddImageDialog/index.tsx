import "./AddImageDialog.css";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { AddIcon, ImageIcon } from "@markor/icons";
import { useBackdropClose, useEscape } from "@markor/utils";
import { TextInput, Backdrop, NumberInput, Button, DialogAnimation } from "..";

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
        width: number,
        height: number
    ) => void;
    style?: AddImageDialogStyle;
}

export default function AddImageDialog({
    showDialog,
    onClose,
    onSave,
    style,
}: AddImageDialogProps) {
    const [src, setSrc] = useState("");
    const [altText, setAltText] = useState("");
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
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
        setWidth(null);
        setHeight(null);
        setIsError(null);
    }, [showDialog]);

    function getImageDimensions(src: string) {
        const img = new Image();
        img.src = src;
        return new Promise<{ width: number; height: number }>(
            (resolve, reject) => {
                img.onload = () => {
                    const width = img.naturalWidth;
                    const height = img.naturalHeight;
                    resolve({ width, height });
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
        console.log("URL: ", src);
        try {
            setIsLoading(true);
            const { width, height } = await getImageDimensions(src);
            console.log({ width, height });
            setIsLoading(false);
            onSave(src, altText, width, height);
        } catch (error) {
            setIsLoading(false);
            setIsError("Invalid image url");
            console.log(error);
        }
    }

    if (!showDialog) return null;

    return createPortal(
        <Backdrop onClose={onClose}>
            <DialogAnimation>
                <div className={style?.dialog || "DefaultAddImageDialog"}>
                    <div className={"DefaultAddImageDialogTitle"}>
                        <ImageIcon
                            size="base"
                            className={"DefaultAddImageDialogIcon"}
                        />
                        <span>Add an image</span>
                    </div>
                    <div className={"DefaultAddImageDialog_ImageInputGroup"}>
                        <TextInput
                            value={src}
                            onChange={(e) => setSrc(e.target.value)}
                            placeholder="Enter image url"
                            name="Image url"
                        />
                        <label
                            htmlFor="DefaultAddImageDialog_ImageFileInput"
                            className={
                                "DefaultAddImageDialog_ImageFileInputLabel"
                            }
                        >
                            <AddIcon size="base" />
                            <div>Choose a file</div>
                        </label>
                        <input
                            type="file"
                            id="DefaultAddImageDialog_ImageFileInput"
                            className={"DefaultAddImageDialog_ImageFileInput"}
                            onChange={handleImageSelection}
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <TextInput
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Alternative text"
                        name="Alt text"
                    />
                    <div className={"DefaultAddImageDialog_ActionButtonGroup"}>
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
        </Backdrop>,
        document.body
    );
}
