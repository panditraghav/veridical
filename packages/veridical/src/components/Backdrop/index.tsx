import React, { useRef, useEffect } from 'react';
import { useVeridicalTheme } from '../../utils';

export default function Backdrop({
    children,
    onClose,
}: {
    children?: React.ReactNode;
    onClose: () => void;
}) {
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();

    useEffect(() => {
        function closeDialogClickListener(ev: MouseEvent) {
            if (ev.target === backdropRef.current) {
                onClose();
            }
        }

        document.addEventListener('click', closeDialogClickListener);
        return () =>
            document.removeEventListener('click', closeDialogClickListener);
    }, [onClose]);

    return (
        //@ts-ignore
        <div className={theme?.backdrop} ref={backdropRef}>
            {children}
        </div>
    );
}
