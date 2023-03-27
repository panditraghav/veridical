import React from 'react';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import {
    MarkdownPlugin,
    CodeHighlightPlugin,
    CodeActionMenuLeft,
    CodeActionMenuRight,
    PrettierPlugin,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
    ImageDialogPlugin,
    ImagePlugin,
    HoverBlockOptions,
    AutoLinkPlugin,
    AddLinkDialogPlugin,
    OpenLinkPlugin,
    AddNodeDialogPlugin,
    ImageActionMenuRight,
} from '@veridical/plugins';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from 'lexical';
import {
    defaultVeridicalTheme,
    defaultLexicalTheme,
    VeridicalThemeProvider,
} from '@veridical/utils';
import type { VeridicalThemeClasses } from '@veridical/utils';
import { Placeholder, ErrorBoundary } from '@veridical/components';
import { defaultEditorNodes } from '@veridical/nodes';
import { CodeHighlightPlugin } from '@veridical/plugins';
import VeridicalEditorPlugins from './VeridicalEditorPlugins';
import VeridicalComposer from './VeridicalBase';

type InitialConfig = Readonly<{
    namespace?: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    lexicalTheme?: EditorThemeClasses;
    veridicalTheme?: VeridicalThemeClasses;
    editorState?: InitialEditorStateType;
    editable?: boolean;
}>;

function Veridical({
    initialConfig,
    children,
}: {
    initialConfig?: InitialConfig;
    children?: React.ReactNode;
}) {
    const config = {
        namespace: initialConfig?.namespace || 'veridical-editor',
        nodes: initialConfig?.nodes || defaultEditorNodes,
        onError:
            initialConfig?.onError || ((error, editor) => console.error(error)),
        editable: initialConfig?.editable || true,
        readOnly: initialConfig?.readOnly || false,
        theme: initialConfig?.lexicalTheme || defaultLexicalTheme,
        veridicalTheme: initialConfig?.veridicalTheme || defaultVeridicalTheme,
    };

    return (
        <VeridicalBase initialConfig={config}>
            <div className={config?.veridicalTheme?.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            readOnly={false}
                            className={config.veridicalTheme.contentEditable}
                        />
                    }
                    placeholder={
                        <Placeholder text="Press Ctrl + k for command..." />
                    }
                    ErrorBoundary={ErrorBoundary}
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                {children}
            </div>
        </VeridicalComposer>
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
            <HistoryPlugin />
            <TabIndentationPlugin />
            <HoverMenuPlugin offset={{ left: -50, top: 4 }}>
                <HoverBlockOptions offset={{ left: -50, top: 4 }}>
                    <AddNodeButton />
                    <DraggableNodeButton />
                </HoverBlockOptions>
                <CodeActionMenuLeft>
                    <CodeLanguageSelectionMenu />
                </CodeActionMenuLeft>
                <CodeActionMenuRight>
                    <CopyCodeButton />
                </CodeActionMenuRight>
                <ImageActionMenuRight>
                    <EditImageButton />
                </ImageActionMenuRight>
            </HoverMenuPlugin>
            <AddNodeShortcutPlugin />
            <AddNodeDialogPlugin />
            <MarkdownPlugin />
            <ImageDialogPlugin />
            <ImagePlugin />
            <OpenLinkPlugin />
        </>
    );
}

function VeridicalBase({
    initialConfig,
    children,
}: {
    initialConfig: Readonly<{
        namespace: string;
        nodes?: readonly Klass<LexicalNode>[];
        onError: (error: Error, editor: LexicalEditor) => void;
        editable?: boolean;
        theme?: EditorThemeClasses;
        veridicalTheme?: VeridicalThemeClasses;
        editorState?: InitialEditorStateType;
    }>;
    children?: React.ReactNode;
}) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <VeridicalThemeProvider theme={initialConfig.veridicalTheme}>
                {children}
            </VeridicalThemeProvider>
        </LexicalComposer>
    );
}

export { InitialConfig, Veridical, VeridicalBase, VeridicalEditorPlugins };
