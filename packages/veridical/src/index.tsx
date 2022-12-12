import "./style/editor.css";
import React, { useEffect, useState } from "react";
import {
    LexicalComposer,
    InitialEditorStateType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import {
    AddNodeButton,
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
    RichTextPlugin,
    ListPlugin,
    ImageResizerPlugin,
    HoverBlockOptions,
} from "@veridical/plugins";

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from "lexical";
import {
    defaultVeridicalTheme,
    useVeridicalTheme,
    VeridicalThemeComposer,
} from "@veridical/utils";
import type { VeridicalThemeClasses } from "@veridical/utils";
import { Placeholder } from "@veridical/components";
import { defaultEditorNodes } from "@veridical/nodes";

interface InitialConfig {
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: VeridicalThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}

function Veridical({
    initialConfig,
    children,
}: {
    initialConfig?: InitialConfig;
    children?: React.ReactNode;
}) {
    const config: InitialConfig = {
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
                            <HoverBlockOptions offset={{ left: -50, top: 4 }}>
                                <AddNodeButton />
                                <DraggableNodeButton />
                            </HoverBlockOptions>
                            <ImageResizerPlugin maxWidth={740} />
                        </HoverMenuPlugin>
                        <AddNodeShortcutPlugin />
                        <MarkdownPlugin />
                        <ImagePlugin maxWidth={740} />
                    </>
                )}
                {children}
            </div>
        </VeridicalBase>
    );
}

function VeridicalBase({
    initialConfig,
    children,
}: {
    initialConfig: InitialConfig;
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

export { InitialConfig, Veridical, VeridicalBase };
