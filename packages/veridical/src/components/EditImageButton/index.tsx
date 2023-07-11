import React, { useCallback } from 'react';
import {
    useVeridicalTheme,
    useHoverMenuContext,
    IMAGE_DIALOG_COMMAND,
} from '../../utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isImageNode } from '../../nodes';
import { EditIcon } from '../Icons';

export default function CopyCodeButton() {
    const theme = useVeridicalTheme();
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();

    const onClick = useCallback(() => {
        if (!hoveredLexicalNode || !$isImageNode(hoveredLexicalNode)) return;
        editor.dispatchCommand(IMAGE_DIALOG_COMMAND, {
            imageNode: hoveredLexicalNode,
            action: 'edit',
        });
    }, [editor, hoveredLexicalNode]);

    return (
        <button className={`${theme?.editImageButton}`} onClick={onClick}>
            <EditIcon size="base" />
        </button>
    );
}