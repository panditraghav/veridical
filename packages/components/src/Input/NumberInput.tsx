import React, { useState } from "react";

interface NumberInputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    className?: string;
}
export default function NumberInput({
    value,
    onChange,
    label,
    placeholder,
    id,
    name,
    className,
}: NumberInputProps) {
    return (
        <div className={className || "DefaultInputWithLabel"}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
