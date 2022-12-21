import React, { useEffect, useState } from "react";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { LinkIcon } from "..";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useVeridicalTheme } from "@veridical/utils";
import { $getSelection, $isTextNode } from "lexical";

export default function () {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    const [payload, setPayload] = useState<string | null>(null);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                const selectedNode = selection?.getNodes()[0];
                const selectedNodeParent = selectedNode?.getParent();
                if (
                    $isLinkNode(selectedNodeParent) ||
                    $isLinkNode(selectedNode)
                ) {
                    setPayload(null);
                } else {
                    setPayload("https://");
                }
            });
        });
    }, [editor]);

    return (
        <button
            className={theme?.highlightMenu?.menuButton}
            onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, payload)}
        >
            <LinkIcon
                className={theme?.highlightMenu?.menuButtonIcon}
                size="base"
            />
        </button>
    );
}
