import {
    InitialConfigType,
    LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getRoot } from 'lexical';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import {
    CodeHighlightPlugin,
    defaultEditorNodes,
    MarkdownPlugin,
    PrettierPlugin,
    RegisterCommands,
} from 'veridical';
import { lexicalTheme } from '../theme/lexicalTheme';
import TreeViewPlugin from '../TreeViewPlugin';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import CommandMenuPlugin from '../plugins/CommandMenu';
import FloatingActionMenuPlugin from '../plugins/FloatingActionMenu';
import LinkPlugins from '../plugins/LinkPlugins';
import HoveredNodePlugin from '../plugins/HoveredNodePlugin';
import { useAppContext } from '../utils/context';
import ImageDialogPlugin from '../plugins/ImageDialogPlugin';

function saveStateToLocalStorage(state: string) {
    localStorage.setItem('blog', state);
}

function SaveStatePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            saveStateToLocalStorage(JSON.stringify(editorState.toJSON()));
        });
    }, [editor]);
    return null;
}

function initializeEditor() {
    const root = $getRoot();
    console.log(root);
    if (root.getFirstChild() === null) {
        root.append($createParagraphNode());
    }
}

export default function Editor() {
    const { showTreeView } = useAppContext();
    const editorState = localStorage.getItem('blog');
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    const initialConfig: InitialConfigType = {
        namespace: 'Playground',
        theme: lexicalTheme,
        nodes: [...defaultEditorNodes],
        editable: true,
        onError: (error: any) => console.log(error),
        editorState: editorState || initializeEditor,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RegisterCommands />
            <div className="mb-24 w-full px-4 md:mx-auto md:w-8/12 lg:w-[850px]">
                <RichTextPlugin
                    contentEditable={
                        <div ref={onRef}>
                            <ContentEditable className="focus:outline-none" />
                        </div>
                    }
                    placeholder={
                        <div className="relative left-0 top-[-35px] z-[-10] text-muted-foreground">
                            Press / for commands
                        </div>
                    }
                    ErrorBoundary={VeridicalErrorBoundary}
                />
                <MarkdownPlugin />
                <ListPlugin />
                <CodeHighlightPlugin />
                <AutoFocusPlugin />
                <PrettierPlugin />
                <HistoryPlugin />
                <TabIndentationPlugin />
                <SaveStatePlugin />
                <ImageDialogPlugin />

                {floatingAnchorElem && (
                    <>
                        <LinkPlugins container={floatingAnchorElem} />
                        <CommandMenuPlugin container={floatingAnchorElem} />
                        <HoveredNodePlugin container={floatingAnchorElem} />
                        <FloatingActionMenuPlugin
                            container={floatingAnchorElem}
                        />
                    </>
                )}

                {showTreeView && <TreeViewPlugin />}
            </div>
        </LexicalComposer>
    );
}

export function VeridicalErrorBoundary({
    children,
    onError,
}: {
    children: React.ReactNode;
    onError: (error: Error) => void;
}) {
    return (
        <ErrorBoundary
            fallback={
                <div
                    style={{
                        border: '1px solid #f00',
                        color: '#f00',
                        padding: '8px',
                    }}
                >
                    An error was thrown.
                </div>
            }
            onError={onError}
        >
            {children}
        </ErrorBoundary>
    );
}
