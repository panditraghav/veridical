import React, { useCallback } from 'react';
import { useHoverMenuContext } from '../../utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isCodeNode } from '@lexical/code';

export function CopyCodeButton() {
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();

    const onClick = useCallback(() => {
        editor.getEditorState().read(() => {
            if (!$isCodeNode(hoveredLexicalNode)) return;
            navigator.clipboard.writeText(hoveredLexicalNode.getTextContent());
        });
    }, [editor, hoveredLexicalNode]);

    return <div onClick={onClick}>Copy</div>;
}
