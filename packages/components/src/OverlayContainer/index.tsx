import React from 'react';
import { useVeridicalTheme } from '@veridical/utils';
export default function OverlayContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    const theme = useVeridicalTheme()?.overlay;
    return (
        <div className={theme} data-type={'overlay'}>
            {children}
        </div>
    );
}
