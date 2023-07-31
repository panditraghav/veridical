import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createTextNode, $getRoot } from 'lexical';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect } from 'react';
import {
    AddLinkDialogPlugin,
    AddNodeButton,
    AutoLinkPlugin,
    CodeHighlightPlugin,
    defaultEditorNodes,
    DraggableNodeButton,
    HoveredNodeOptions,
    HoveredNodeProvider,
    ImagePlugin,
    MarkdownPlugin,
    OpenLinkPlugin,
    PrettierPlugin,
    SlashCommandMenuPlugin,
    RegisterVeridicalCommands,
} from 'veridical';
import { lexicalTheme } from '../theme/lexicalTheme';
import TreeViewPlugin from '../TreeViewPlugin';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import CommandMenuPlugin from '../plugins/CommandMenu';
import { AddIcon, DragIcon } from './Icons';
import FloatingActionMenuPlugin from '../plugins/FloatingActionMenu';

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
    if (root.getFirstChild() === null) {
        const h1 = $createHeadingNode('h1');
        h1.append($createTextNode('Hello World'));
        root.append(h1);
    }
}

export default function Editor() {
    const editorState = localStorage.getItem('blog');
    return (
        <LexicalComposer
            initialConfig={{
                namespace: 'playground',
                theme: lexicalTheme,
                nodes: defaultEditorNodes,
                editable: true,
                onError: (error: any) => console.log(error),
                editorState: editorState || initializeEditor,
            }}
        >
            <RegisterVeridicalCommands />
            <div className="mb-24 w-full px-4 md:mx-auto md:w-8/12">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="focus:outline-none" />
                    }
                    placeholder={
                        <div className="relative left-0 top-[-35px] z-[-10] text-muted-foreground">
                            Press / for commands
                        </div>
                    }
                    ErrorBoundary={VeridicalErrorBoundary}
                />
                <AutoLinkPlugin />
                <MarkdownPlugin />
                <ListPlugin />
                <CodeHighlightPlugin />
                <AutoFocusPlugin />
                <LinkPlugin />
                <PrettierPlugin />
                <HistoryPlugin />
                <TabIndentationPlugin />
                <AddLinkDialogPlugin />
                <HoveredNodeProvider offset={{ left: -50, top: 4 }}>
                    <HoveredNodeOptions
                        offset={{ left: -50, top: 4 }}
                        className="data-[state=open]:duration-200 data-[state=open]:ease-in-out data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-90 flex justify-between space-x-1"
                    >
                        <AddNodeButton>
                            <AddIcon className="fill-muted-foreground hover:fill-foreground" />
                        </AddNodeButton>
                        <DraggableNodeButton>
                            <DragIcon className="fill-muted-foreground hover:fill-foreground" />
                        </DraggableNodeButton>
                    </HoveredNodeOptions>
                </HoveredNodeProvider>
                <ImagePlugin />
                <OpenLinkPlugin />
                <TreeViewPlugin />
                <SaveStatePlugin />
                <CommandMenuPlugin />
                <FloatingActionMenuPlugin />
                <SlashCommandMenuPlugin />
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
