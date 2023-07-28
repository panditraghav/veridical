import React from 'react';
import {
    RegisterInsertHeadingCommand,
    RegisterInsertCodeCommand,
    RegisterInsertListCommand,
    RegisterInsertParagraphCommand,
    RegisterMoveCommand,
} from '@/plugins';

export function RegisterVeridicalCommands() {
    return (
        <>
            <RegisterInsertHeadingCommand />
            <RegisterInsertCodeCommand />
            <RegisterInsertListCommand />
            <RegisterInsertParagraphCommand />
            <RegisterMoveCommand />
        </>
    );
}
