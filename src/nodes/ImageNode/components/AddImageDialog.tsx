import "../../../style/addImageDialog.css"
import React, { useState } from "react"
import { createPortal } from "react-dom"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

export default function AddImageDialog({
    showDialog,
    onClose,
    onSave
}: {
    showDialog: boolean;
    onClose: () => void;
    onSave: (src: string) => void;
}) {
    const [imageUrl, setImageUrl] = useState("")

    if (!showDialog) return null

    const handleImageSelection: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files
        const file = files ? files[0] : new Blob()
        const url = URL.createObjectURL(file)
        console.log(url)
        setImageUrl(url)
    }

    return createPortal((
        <div className="imageDialogBackdrop">
            <div className="imageDialog">
                <div className="title">
                    <ImageOutlinedIcon />
                    <span>Add an image</span>
                </div>
                {imageUrl !== "" &&
                    <img className="selectedImage" src={imageUrl} alt="image" />
                }
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
                <hr />
                <label htmlFor="imageFileInput" id="imageFileInputLabel">Choose a file</label>
                <input
                    type="file"
                    id="imageFileInput"
                    onChange={handleImageSelection}
                    accept="image/png, image/jpeg"
                />
                <div className="actionButtons">
                    <button
                        className="button-success"
                        onClick={()=> onSave(imageUrl)}
                    >
                        Save
                    </button>
                    <button
                        className="button-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ), document.body)
}