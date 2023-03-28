import React from 'react';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import { LexicalEditor, Klass, LexicalNode, EditorThemeClasses } from 'lexical';
import type { VeridicalThemeClasses } from '@veridical/utils';
import { Placeholder, ErrorBoundary } from '@veridical/components';
import { defaultEditorNodes } from '@veridical/nodes';

import { CodeHighlightPlugin } from '@veridical/plugins';

import VeridicalEditorPlugins from './VeridicalEditorPlugins';
import VeridicalComposer from './VeridicalComposer';

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
        theme: initialConfig?.lexicalTheme,
        veridicalTheme: initialConfig?.veridicalTheme,
    };

    return (
        <VeridicalComposer initialConfig={config}>
            <div className={config?.veridicalTheme?.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            readOnly={false}
                            className={config.veridicalTheme?.contentEditable}
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

export { InitialConfig, Veridical, VeridicalEditorPlugins, VeridicalComposer };
