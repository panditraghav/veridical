import React from 'react';
import { ADD_NODE_DIALOG_COMMAND, useHoverMenuContext } from '../../utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AddIcon } from '..';
import { useVeridicalTheme } from '../../utils';

export default function AddNodeButton() {
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();
    const theme = useVeridicalTheme()?.hoverBlockOption;

    return (
        <button
            className={theme?.button}
            onClick={() => {
                editor.dispatchCommand(ADD_NODE_DIALOG_COMMAND, {
                    selectedNode: hoveredLexicalNode,
                });
            }}
            tabIndex={-1}
        >
            <AddIcon size="base" className={theme?.icon} />
        </button>
    );
}
