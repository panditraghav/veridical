import React from 'react';
import { AddIcon } from '..';
import { useVeridicalTheme } from '@veridical/utils';

interface AddNodeBtnProps {
    onClick: () => void;
}

export default function AddNodeBtn({ onClick }: AddNodeBtnProps) {
    const theme = useVeridicalTheme()?.hoverBlockOption;
    return (
        <>
            <button className={theme?.button} onClick={onClick}>
                <AddIcon size="base" className={theme?.icon} />
            </button>
        </>
    );
}
