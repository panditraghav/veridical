import React from "react"
import { createPortal } from "react-dom";
import { useVeridicalTheme } from "../../utils";
import Backdrop from "../Backdrop";
import OverlayContainer from "../OverlayContainer";

export type DialogProps = {
    showDialog: boolean;
    onClose: () => void;
    anchorElement: HTMLElement;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
}

export default function Dialog({
    showDialog,
    onClose,
    anchorElement,
    children,
    width,
    height
}: DialogProps) {
    const theme = useVeridicalTheme()?.dialog;

    if (!showDialog) return null;
    return createPortal((
        <OverlayContainer>
            <Backdrop onClose={onClose}>
                <div
                    className={theme?.dialog}
                    style={{ width: width, height: height }}
                >
                    {children}
                </div>
            </Backdrop >
        </OverlayContainer>
    ), anchorElement);
}
