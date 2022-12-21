import { FORMAT_TEXT_COMMAND } from "lexical";
import { FormatItalicIcon } from "..";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useVeridicalTheme } from "@veridical/utils";
import React from "react";

export default function () {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    return (
        <button
            className={theme?.highlightMenu?.menuButton}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }
        >
            <FormatItalicIcon
                className={theme?.highlightMenu?.menuButtonIcon}
                size="base"
            />
        </button>
    );
}
