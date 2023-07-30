import React from 'react';
import { RegisterMoveCommand, RegisterInsertCommands } from '@/plugins';

export function RegisterVeridicalCommands() {
    return (
        <>
            <RegisterInsertCommands />
            <RegisterMoveCommand />
        </>
    );
}
