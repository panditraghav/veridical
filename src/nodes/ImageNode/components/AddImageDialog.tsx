import "./AddImageDialog.css";
import React, { useState, useRef, useEffect } from "react";
import useEscape from "../../../hooks/useEscape";
import { createPortal } from "react-dom";
import ImageIcon from "../../../Icons/ImageIcon";
import useBackdropClose from "../../../hooks/useBackdropClose";

export interface AddImageDialogStyle {
    backdrop?: string;
    dialog?: string;
}

export interface AddImageDialogProps {
    showDialog: boolean;
    onClose: () => void;
    onSave: (src: string) => void;
    style?: AddImageDialogStyle;
}

export default function AddImageDialog({
    showDialog,
    onClose,
    onSave,
    style,
}: AddImageDialogProps) {
    const [imageUrl, setImageUrl] = useState("");
    const backdropRef = useRef<HTMLDivElement>();
    useEscape(onClose);
    useBackdropClose(onClose, backdropRef.current);

    const handleImageSelection: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const files = event.target.files;
        const file = files ? files[0] : new Blob();
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    if (!showDialog) return null;

    return createPortal(
        <div
            //@ts-ignore
            ref={backdropRef}
            className={style?.backdrop || "imageDialogBackdrop"}
        >
            <div className={style?.dialog || "imageDialog"}>
                <div className={"title"}>
                    <ImageIcon size="base" />
                    <span>Add an image</span>
                </div>
                <div className="inputGroup">
                    <label htmlFor="imageLinkInput">Image url:-</label>
                    <input
                        type="text"
                        id="imageLinkInput"
                        placeholder="https://myimage.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <label htmlFor="imageFileInput" id="imageFileInputLabel">
                    Choose a file
                </label>
                <input
                    type="file"
                    id="imageFileInput"
                    onChange={handleImageSelection}
                    accept="image/png, image/jpeg"
                />
                <div className="actionButtons">
                    <button
                        className="button-success"
                        onClick={() => onSave(imageUrl)}
                    >
                        Save
                    </button>
                    <button className="button-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
