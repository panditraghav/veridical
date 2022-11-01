import "../style/editor.css";
import React, { useEffect, useState } from "react";
import {
    LexicalComposer,
    InitialEditorStateType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { defaultTheme } from "../theme/DefaultTheme";
import Placeholder from "./Placeholder";
import { defaultEditorNodes } from "../nodes";
import { defaultNodeTransformerOptions } from "../plugins/AddNodePlugin/NodeTransformers";
import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from "lexical";
import {
    AddNodePlugin,
    MarkdownPlugin,
    ListPlugin,
    RichTextPlugin,
    TreeViewPlugin,
} from "../plugins";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import CodeActionPlugin from "../plugins/CodeActionPlugin";
import PrettierPlugin from "../plugins/PrettierPlugin";

interface EditorProps {
    initialConfig?: Readonly<{
        editor__DEPRECATED?: LexicalEditor | null;
        namespace: string;
        nodes?: ReadonlyArray<Klass<LexicalNode>>;
        onError: (error: Error, editor: LexicalEditor) => void;
        readOnly?: boolean;
        theme?: EditorThemeClasses;
        editorState?: InitialEditorStateType;
    }>;
}

export default function Editor({ initialConfig }: EditorProps) {
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
                <MarkdownPlugin />
                <ListPlugin />
                <AddNodePlugin
                    nodeTransformerOptions={defaultNodeTransformerOptions}
                />
                <CodeHighlightPlugin />
                <CodeActionPlugin />
                <PrettierPlugin />
                {/* <TreeViewPlugin /> */}
            </div>
        </LexicalComposer>
    );
}
