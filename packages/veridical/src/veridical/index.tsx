import React from 'react';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import {
    LexicalEditor,
    Klass,
    LexicalNode,
    EditorThemeClasses,
    $getRoot,
    $createParagraphNode,
    $createTextNode,
} from 'lexical';
import type { VeridicalThemeClasses, LexicalThemeClasses } from '../utils';
import { Placeholder, ErrorBoundary } from '../components';
import { defaultEditorNodes } from '../nodes';

import { CodeHighlightPlugin } from '../plugins';

import VeridicalEditorPlugins from './VeridicalEditorPlugins';
import VeridicalComposer from './VeridicalComposer';

type InitialConfig = Readonly<{
    namespace?: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    lexicalTheme?: LexicalThemeClasses;
    veridicalTheme?: VeridicalThemeClasses;
    editorState?: InitialEditorStateType;
    placeholder?: string;
    editable?: boolean;
}>;

function initializeEditor() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const p = $createParagraphNode();
        p.append($createTextNode(''));
        root.append(p);
    }
}

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
        editorState: initialConfig?.editorState || initializeEditor,
    };

    return (
        <VeridicalComposer initialConfig={config}>
            <div className={config?.veridicalTheme?.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={config.veridicalTheme?.contentEditable}
                        />
                    }
                    placeholder={
                        <Placeholder
                            text={
                                initialConfig?.placeholder ||
                                'Press Ctrl + k for command...'
                            }
                        />
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
