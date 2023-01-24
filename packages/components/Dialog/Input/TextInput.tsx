import React from 'react';
import { useVeridicalTheme } from '../../../utils';

export default function TextInput() {
    const theme = useVeridicalTheme()?.dialog;
    return <input className={theme?.input?.text} />;
}
