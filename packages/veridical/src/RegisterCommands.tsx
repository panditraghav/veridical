import React from 'react';
import {
    RegisterMoveCommand,
    RegisterInsertCommands,
    RegisterTurnIntoCommands,
} from '@/plugins';

export function RegisterCommands() {
    return (
        <>
            <RegisterInsertCommands />
            <RegisterMoveCommand />
            <RegisterTurnIntoCommands />
        </>
    );
}
