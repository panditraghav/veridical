import "./style/editor.css";
import React, { useEffect, useState } from "react";
import {
    LexicalComposer,
    InitialEditorStateType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import {
    AddNodeButtonPlugin,
    MarkdownPlugin,
    TreeViewPlugin,
    CodeActionPlugin,
    CodeHighlightPlugin,
    PrettierPlugin,
    DraggableNodeButton,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
    ImagePlugin,
} from "@markor/plugins";

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from "lexical";
import { defaultTheme } from "./theme/DefaultTheme";
import { Placeholder } from "@markor/components";
import { defaultEditorNodes } from "@markor/nodes";

interface InitialConfig {
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: EditorThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}

interface EditorProps {
    namespace?: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: EditorThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
    children?: React.ReactNode;
}

export function Editor({
    namespace,
    nodes,
    onError,
    readOnly,
    editable,
    theme,
    children,
}: EditorProps) {
    const config: InitialConfig = {
        namespace: namespace || "main-editor",
        nodes: nodes || defaultEditorNodes,
        onError: onError || ((error, editor) => console.error(error)),
        editable: editable || true,
        readOnly: readOnly || false,
        theme: theme || defaultTheme,
    };

    return (
        <LexicalComposer initialConfig={config}>
            <div className={"DefaultEditorTheme__EditorContainer"}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            readOnly={false}
                            className={"DefaultEditorTheme__ContentEditable"}
                        />
                    }
                    placeholder={
                        <Placeholder text="Press Ctrl + k for command..." />
                    }
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                {config.editable && (
                    <>
                        <CodeActionPlugin />
                        <PrettierPlugin />
                        <HighlightMenuPlugin />
                        <HoverMenuPlugin offset={{ left: -50, top: 4 }}>
                            <AddNodeButtonPlugin />
                            <DraggableNodeButton />
                        </HoverMenuPlugin>
                        <AddNodeShortcutPlugin />
                        <MarkdownPlugin />
                        <ImagePlugin />
                    </>
                )}
                {children}
            </div>
        </LexicalComposer>
    );
}

export { defaultTheme, InitialConfig };
