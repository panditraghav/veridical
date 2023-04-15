import React from 'react';
import { useVeridicalTheme } from '../../../utils';

interface ActionGroupProps {
    children?: React.ReactNode;
}

export default function DialogActionGroup({ children }: ActionGroupProps) {
    const theme = useVeridicalTheme()?.dialog;
    return <div className={theme?.actionGroup}>{children}</div>;
}
