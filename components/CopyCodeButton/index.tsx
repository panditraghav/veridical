import React, { useCallback } from "react";
import { useVeridicalTheme } from "@veridical/utils";
import { useHoverMenuContext } from "@veridical/plugins";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isCodeNode } from "@lexical/code";

export default function () {
    const theme = useVeridicalTheme();
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
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
