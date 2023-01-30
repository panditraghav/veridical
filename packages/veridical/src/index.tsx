import React from 'react';
import {
    LexicalComposer,
    InitialEditorStateType,
} from '@lexical/react/LexicalComposer';
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
    ImagePlugin,
    HoverBlockOptions,
    AutoLinkPlugin,
    AddLinkDialogPlugin,
    OpenLinkPlugin,
} from '@veridical/plugins';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from 'lexical';
import {
    defaultVeridicalTheme,
    VeridicalThemeProvider,
} from '@veridical/utils';
import type { VeridicalThemeClasses } from '@veridical/utils';
import {
    Placeholder,
    AddNodeButton,
    DraggableNodeButton,
    CopyCodeButton,
    CodeLanguageSelectionMenu,
    ErrorBoundary,
} from '@veridical/components';
import { defaultEditorNodes } from '@veridical/nodes';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

type InitialConfig = Readonly<{
    namespace?: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: VeridicalThemeClasses;
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
                    ErrorBoundary={ErrorBoundary}
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
            </HoverMenuPlugin>
            <AddNodeShortcutPlugin />
            <MarkdownPlugin />
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
            <VeridicalThemeProvider theme={initialConfig.theme}>
                {children}
            </VeridicalThemeProvider>
        </LexicalComposer>
    );
}

export { InitialConfig, Veridical, VeridicalBase, VeridicalEditorPlugins };
