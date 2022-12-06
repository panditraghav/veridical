import React, { useState } from "react";

interface TextInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    className?: string;
}
export default function TextInput({
    value,
    onChange,
    label,
    placeholder,
    id,
    name,
    className,
}: TextInputProps) {
    return (
        <div className={className || "DefaultInputWithLabel"}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
