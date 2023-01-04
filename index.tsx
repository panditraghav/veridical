import React from "react";
// import "./style/editor.css"
import {
    LexicalComposer,
    InitialEditorStateType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import {
    MarkdownPlugin,
    CodeHighlightPlugin,
    CodeActionMenuLeft,
    CodeActionMenuRight,
    PrettierPlugin,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
    ImagePlugin,
    RichTextPlugin,
    ListPlugin,
    HoverBlockOptions,
    CodeLanguageSelection,
    AutoLinkPlugin,
    AddLinkDialogPlugin,
} from "./plugins";

import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from "lexical";
import {
    defaultVeridicalTheme,
    VeridicalThemeComposer,
} from "./utils";
import type { VeridicalThemeClasses } from "./utils/";
import {
    Placeholder,
    AddNodeButton,
    DraggableNodeButton,
    CopyCodeButton,
} from "./components/";
import { defaultEditorNodes } from "./nodes";

type InitialConfig = Readonly<{
    namespace?: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: VeridicalThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}>

function Veridical({
    initialConfig,
    children,
}: {
    initialConfig?: InitialConfig;
    children?: React.ReactNode;
}) {
    const config = {
        namespace: initialConfig?.namespace || "veridical-editor",
        nodes: initialConfig?.nodes || defaultEditorNodes,
        onError:
            initialConfig?.onError || ((error, editor) => console.error(error)),
        editable: initialConfig?.editable || true,
        readOnly: initialConfig?.readOnly || false,
        theme: initialConfig?.theme || defaultVeridicalTheme,
    };

    return (
        <VeridicalBase initialConfig={config}>
            <div className={config?.theme?.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            readOnly={false}
                            className={config.theme.contentEditable}
                        />
                    }
                    placeholder={
                        <Placeholder text="Press Ctrl + k for command..." />
                    }
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                {children}
            </div>
        </VeridicalBase>
    );
}

function VeridicalEditorPlugins() {
    return (
        <>
            <AutoFocusPlugin />
            <AutoLinkPlugin />
            <LinkPlugin />
            <PrettierPlugin />
            <HighlightMenuPlugin />
            <AddLinkDialogPlugin />
            <HoverMenuPlugin offset={{ left: -50, top: 4 }}>
                <HoverBlockOptions offset={{ left: -50, top: 4 }}>
                    <AddNodeButton />
                    <DraggableNodeButton />
                </HoverBlockOptions>
                <CodeActionMenuLeft>
                    <CodeLanguageSelection />
                </CodeActionMenuLeft>
                <CodeActionMenuRight>
                    <CopyCodeButton />
                </CodeActionMenuRight>
            </HoverMenuPlugin>
            <AddNodeShortcutPlugin />
            <MarkdownPlugin />
            <ImagePlugin maxWidth={740} />
        </>
    )
}

function VeridicalBase({
    initialConfig,
    children,
}: {
    initialConfig: Readonly<{
        namespace: string;
        nodes?: readonly Klass<LexicalNode>[] | undefined;
        onError: (error: Error, editor: LexicalEditor) => void;
        editable?: boolean | undefined;
        theme?: EditorThemeClasses | undefined;
        editorState?: InitialEditorStateType | undefined;
    }>;
    children?: React.ReactNode;
}) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <VeridicalThemeComposer theme={initialConfig.theme}>
                {children}
            </VeridicalThemeComposer>
        </LexicalComposer>
    );
}

export { InitialConfig, Veridical, VeridicalBase, VeridicalEditorPlugins };
