import React from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { FormatUnderlineIcon } from "..";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useVeridicalTheme } from "@veridical/utils";

export default function () {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    return (
        <button
            className={theme?.highlightMenu?.menuButton}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }
        >
            <FormatUnderlineIcon
                className={theme?.highlightMenu?.menuButtonIcon}
                size="base"
            />
        </button>
    );
}
