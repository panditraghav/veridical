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
    DragAndDropButtonPlugin,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
} from "./plugins";

import { defaultTheme } from "./theme/DefaultTheme";
import { Placeholder } from "./components";
import { defaultEditorNodes } from "./nodes";
import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from "lexical";

export interface InitialConfig {
    editor__DEPRECATED?: LexicalEditor | null;
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: EditorThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}

interface EditorProps {
    initialConfig?: InitialConfig;
    children: React.ReactNode;
}

export function Editor({ initialConfig, children }: EditorProps) {
    let config = initialConfig;
    if (!config) {
        config = {
            namespace: "main-editor",
            theme: defaultTheme,
            nodes: [...defaultEditorNodes],
            onError: (error) => {
                console.log(error);
            },
        };
    }

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
                            <DragAndDropButtonPlugin />
                        </HoverMenuPlugin>
                        <AddNodeShortcutPlugin />
                        <MarkdownPlugin />
                    </>
                )}
                {children}
            </div>
        </LexicalComposer>
    );
}

export { defaultTheme };
