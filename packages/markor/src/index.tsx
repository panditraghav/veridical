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
import {
    defaultMarkorTheme,
    useMarkorTheme,
    MarkorThemeComposer,
} from "./theme";
import type { MarkorThemeClasses } from "./theme";
import { Placeholder } from "@markor/components";
import { defaultEditorNodes } from "@markor/nodes";

interface InitialConfig {
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: MarkorThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}

function Markor({
    initialConfig,
    children,
}: {
    initialConfig?: InitialConfig;
    children?: React.ReactNode;
}) {
    const config: InitialConfig = {
        namespace: initialConfig?.namespace || "markor-editor",
        nodes: initialConfig?.nodes || defaultEditorNodes,
        onError:
            initialConfig?.onError || ((error, editor) => console.error(error)),
        editable: initialConfig?.editable || true,
        readOnly: initialConfig?.readOnly || false,
        theme: initialConfig?.theme || defaultMarkorTheme,
    };

    return (
        <MarkorBase initialConfig={config}>
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
        </MarkorBase>
    );
}

function MarkorBase({
    initialConfig,
    children,
}: {
    initialConfig: InitialConfig;
    children?: React.ReactNode;
}) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <MarkorThemeComposer theme={initialConfig.theme}>
                {children}
            </MarkorThemeComposer>
        </LexicalComposer>
    );
}

export {
    defaultMarkorTheme,
    InitialConfig,
    useMarkorTheme,
    MarkorThemeClasses,
    Markor,
    MarkorBase,
};
