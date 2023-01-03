import React from "react";
import { AddIcon } from "@veridical/components";
import { useVeridicalTheme } from "@veridical/utils";

interface AddNodeBtnProps {
    onClick: () => void;
}

export default function AddNodeBtn({ onClick }: AddNodeBtnProps) {
    const theme = useVeridicalTheme()?.hoverBlockOption?.addNodeButton;
    return (
        <>
            <button
                className={theme?.button}
                onClick={onClick}
            >
                <AddIcon
                    size="base"
                    className={theme?.icon}
                />
            </button>
        </>
    );
}
