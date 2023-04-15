import React, { useCallback } from 'react';
import { useVeridicalTheme, useHoverMenuContext } from '../../utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isCodeNode } from '@lexical/code';

export default function CopyCodeButton() {
    const theme = useVeridicalTheme();
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();

    const onClick = useCallback(() => {
        editor.getEditorState().read(() => {
            if (!$isCodeNode(hoveredLexicalNode)) return;
            navigator.clipboard.writeText(hoveredLexicalNode.getTextContent());
        });
    }, [hoveredLexicalNode]);

    return (
        <div className={`${theme?.copyCodeButton}`} onClick={onClick}>
            Copy
        </div>
    );
}
