import React from "react";
import "./AddNodeBtn.css";
import AddIcon from "../../Icons/AddIcon";

interface AddNodeBtnProps {
    onClick: () => void;
    style?: {
        button?: string;
        icon?: string;
    };
}

export default function AddNodeBtn({ onClick, style }: AddNodeBtnProps) {
    return (
        <>
            <button
                className={style?.button || "DefaultAddBtn"}
                onClick={onClick}
            >
                <AddIcon size="base" className={style?.icon || "DefaultAddBtnIcon"} />
            </button>
        </>
    );
}
