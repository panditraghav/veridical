import React from 'react';
import { useVeridicalTheme } from '@veridical/utils';
import { UploadFileIcon } from '..';

interface FileInputProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}

export default function FileInput({ label, onChange, accept }: FileInputProps) {
    const theme = useVeridicalTheme()?.button;
    return (
        <>
            <label
                htmlFor="DefaultAddImageDialog_ImageFileInput"
                className={`${theme?.base} ${theme?.primary}`}
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
            />
        </>
    );
}
