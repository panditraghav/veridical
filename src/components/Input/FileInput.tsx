import React from 'react';
import { useVeridicalTheme } from '../../utils';
import { UploadFileIcon } from '..';

interface FileInputProps {
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
    disabled?: boolean;
}

export default function FileInput({
    label,
    onChange,
    accept,
    disabled = false,
}: FileInputProps) {
    const theme = useVeridicalTheme()?.button;
    return (
        <>
            <label
                htmlFor="DefaultAddImageDialog_ImageFileInput"
                className={`${theme?.base} ${
                    disabled ? theme?.disabled : theme?.primary
                }`}
            >
                <UploadFileIcon size="base" />
                <div>{label}</div>
            </label>
            <input
                type="file"
                id="DefaultAddImageDialog_ImageFileInput"
                style={{ display: 'none' }}
                onChange={onChange}
                accept={accept}
                disabled={disabled}
            />
        </>
    );
}
