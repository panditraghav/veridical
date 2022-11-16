import React from "react";
import "./AddNodeBtn.css";
import { useRef, useEffect } from "react";
import AddIcon from "../../../Icons/AddIcon";

const TOP_OFFSET = 2;
const LEFT_OFFSET = -45;

interface AddNodeBtnProps {
    boundingClientRect: DOMRect | null;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    style?: {
        button?: string;
        img?: string;
    };
}

export default function AddNodeBtn({
    boundingClientRect,
    onClick,
    style,
}: AddNodeBtnProps) {
    const buttonRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        if (buttonRef && buttonRef.current && boundingClientRect) {
            let { x, y } = boundingClientRect;
            y = y + window.scrollY;

            buttonRef.current.style.top = `${y + TOP_OFFSET}px`;
            buttonRef.current.style.left = `${x + LEFT_OFFSET}px`;
        }
    }, [boundingClientRect]);

    return (
        <>
            <button
                //@ts-ignore
                ref={buttonRef}
                className={style?.button || "DefaultAddBtn"}
                style={{
                    position: "absolute",
                }}
                onClick={onClick}
            >
                <AddIcon className="DefaultAddBtnIcon" />
            </button>
        </>
    );
}
