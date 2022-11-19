import "./highlightMenu.css";
import React from "react";
import { LexicalEditor, FORMAT_TEXT_COMMAND } from "lexical";
import FormatBold from "../../Icons/FormatBold";
import FormatItalic from "../../Icons/FormatItalic";
import FormatUnderline from "../../Icons/FormatUnderline";
import Link from "../../Icons/Link";

export interface HighlightMenuStyle {
    highlightMenu?: string;
    highlightMenuButtonContainer?: string;
    highlightMenuButton?: string;
    highlightMenuButtonIcon?: string;
    highlightMenuButtonSelected?: string;
    highlightMenuAnimation?: string;
}

export default function HighlightMenu({
    menuRef,
    editor,
    style,
}: {
    menuRef?: React.LegacyRef<HTMLDivElement>;
    editor: LexicalEditor;
    style?: HighlightMenuStyle;
}) {
    return (
        <div ref={menuRef} className={style?.highlightMenu || "defaultHighlightMenu"}>
            <div
                className={
                    style?.highlightMenuButtonContainer ||
                    "defaultHighlightMenuContainer"
                }
            >
                <button
                    className={
                        style?.highlightMenuButton || "defaultHighlightMenuBtn"
                    }
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                    }
                >
                    <FormatBold
                        className={
                            style?.highlightMenuButtonIcon ||
                            "defaultHighlightMenuIcon"
                        }
                        size="base"
                    />
                </button>
                <button
                    className={
                        style?.highlightMenuButton || "defaultHighlightMenuBtn"
                    }
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                    }
                >
                    <FormatItalic
                        className={
                            style?.highlightMenuButtonIcon ||
                            "defaultHighlightMenuIcon"
                        }
                        size="sm"
                    />
                </button>
                <button
                    className={
                        style?.highlightMenuButton || "defaultHighlightMenuBtn"
                    }
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                    }
                >
                    <FormatUnderline
                        className={
                            style?.highlightMenuButtonIcon ||
                            "defaultHighlightMenuIcon"
                        }
                        size="sm"
                    />
                </button>
                <button
                    className={
                        style?.highlightMenuButton || "defaultHighlightMenuBtn"
                    }
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                    }
                >
                    <Link
                        className={
                            style?.highlightMenuButtonIcon ||
                            "defaultHighlightMenuIcon"
                        }
                        size="sm"
                    />
                </button>
            </div>
        </div>
    );
}
