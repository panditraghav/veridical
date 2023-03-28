import React from 'react';
import { useVeridicalTheme } from '@veridical/utils';

interface TextInputProps {
    type: 'text' | 'email' | 'url';
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
}

export default function TextInput({
    type,
    placeholder,
    value,
    onChange,
    autoFocus,
}: TextInputProps) {
    const theme = useVeridicalTheme()?.input;
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={theme?.text}
            autoFocus={autoFocus}
        />
    );
}
