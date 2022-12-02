import React from "react";
import { AddIcon } from "@markor/icons";

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
                <AddIcon
                    size="base"
                    className={style?.icon || "DefaultAddBtnIcon"}
                />
            </button>
        </>
    );
}
