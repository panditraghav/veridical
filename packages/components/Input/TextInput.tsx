import React from 'react';
import { useVeridicalTheme } from '@veridical/utils';

interface TextInputProps {
    type: 'text' | 'email' | 'url';
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
    type,
    placeholder,
    value,
    onChange,
}: TextInputProps) {
    const theme = useVeridicalTheme()?.input;
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={theme?.text}
        />
    );
}
