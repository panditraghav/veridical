import React from 'react';
import { useVeridicalTheme } from '../../utils';

export default function CheckboxInput({
    isChecked,
    onChange,
    label,
}: {
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}) {
    const theme = useVeridicalTheme()?.input?.checkbox;
    return (
        <div className={theme?.container}>
            {label && (
                <label className={theme?.label} htmlFor="isMaxWidth-checkbox">
                    {label}
                </label>
            )}
            <input
                id="isMaxWidth-checkbox"
                type="checkbox"
                className={theme?.input}
                checked={isChecked}
                onChange={onChange}
            />
        </div>
    );
}
