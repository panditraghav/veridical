import React from 'react';
import { createPortal } from 'react-dom';
import { useVeridicalTheme } from '@veridical/utils';
import { Backdrop, OverlayContainer } from '@veridical/components';

import DialogContentContainer from './DialogContentContainer';
import TextInput from './Input/TextInput';
import ButtonSuccess from './Button/ButtonSuccess';
import ButtonDanger from './Button/ButtonDanger';

export type DialogProps = {
    showDialog: boolean;
    onClose: () => void;
    anchorElement: HTMLElement;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

export function Dialog({
    showDialog,
    onClose,
    anchorElement,
    children,
    width,
    height,
}: DialogProps) {
    const theme = useVeridicalTheme()?.dialog;

    if (!showDialog) return null;
    return createPortal(
        <OverlayContainer>
            <Backdrop onClose={onClose}>
                <div
                    className={theme?.dialog}
                    style={{ width: width, height: height }}
                >
                    {children}
                </div>
            </Backdrop>
        </OverlayContainer>,
        anchorElement,
    );
}
export { DialogContentContainer, TextInput, ButtonSuccess, ButtonDanger };
