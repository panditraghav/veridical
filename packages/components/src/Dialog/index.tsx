import React from 'react';
import { createPortal } from 'react-dom';
import { useVeridicalTheme } from '@veridical/utils';
import { Backdrop, OverlayContainer } from '..';

import DialogContentContainer from './DialogContentContainer';
import DialogActionGroup from './DialogActionGroup';

export type DialogProps = {
    showDialog: boolean;
    onClose: () => void;
    container: Element | DocumentFragment;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

export function Dialog({
    showDialog,
    onClose,
    container,
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
        container,
    );
}
export { DialogContentContainer, DialogActionGroup };
