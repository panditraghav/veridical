import React from 'react';
import {
    RegisterMoveCommand,
    RegisterInsertCommands,
    RegisterTurnIntoCommands,
} from '@/plugins';

export function RegisterVeridicalCommands() {
    return (
        <>
            <RegisterInsertCommands />
            <RegisterMoveCommand />
            <RegisterTurnIntoCommands />
        </>
    );
}
