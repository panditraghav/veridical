import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createTextNode, $getRoot } from 'lexical';
import React, { useEffect } from 'react';
import {
    AddLinkDialogPlugin,
    AddNodeButton,
    AutoLinkPlugin,
    CodeActionMenuLeft,
    CodeActionMenuRight,
    CodeHighlightPlugin,
    CommandEmpty,
    CommandGroup,
    CommandList,
    CommandMenuPlugin,
    defaultEditorNodes,
    DraggableNodeButton,
    VeridicalErrorBoundary,
    HighlightMenuPlugin,
    HoverBlockOptions,
    HoverMenuPlugin,
    ImageActionMenuRight,
    ImageDialogPlugin,
    ImagePlugin,
    InsertCodeCommand,
    InsertHeading1Command,
    InsertHeading2Command,
    InsertHeading3Command,
    MarkdownPlugin,
    OpenLinkPlugin,
    PrettierPlugin,
    RegisterInsertCodeCommand,
    RegisterInsertHeadingCommand,
    SlashCommandMenuPlugin,
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

const CommandItemClassNames = {
    root: 'flex my-1 py-2 px-2 rounded-md data-[selected="true"]:bg-muted cursor-pointer',
    text: {
        root: 'px-4 py-1',
        title: 'text-lg font-medium text-foreground',
        description: 'text-xs text-foreground/60',
    },
    icon: 'fill-foreground',
};

export default function Editor() {
    const editorState = localStorage.getItem('blog');
    const container = document.body;
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
            <div className="mb-24 w-full px-4 md:mx-auto md:w-8/12">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="focus:outline-none" />
                    }
                    placeholder={
                        <div className="relative left-1 top-[-35px] z-[-10] text-muted">
                            Press <kbd>Ctrl</kbd>+<kbd>K</kbd> for commands
                        </div>
                    }
                    ErrorBoundary={VeridicalErrorBoundary}
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                <AutoFocusPlugin />
                <AutoLinkPlugin />
                <LinkPlugin />
                <PrettierPlugin />
                <HistoryPlugin />
                <TabIndentationPlugin />
                {container && (
                    <>
                        <HighlightMenuPlugin container={container} />
                        <AddLinkDialogPlugin container={container} />
                        <HoverMenuPlugin
                            offset={{ left: -50, top: 4 }}
                            container={container}
                        >
                            <HoverBlockOptions
                                container={container}
                                offset={{ left: -50, top: 4 }}
                            >
                                <AddNodeButton />
                                <DraggableNodeButton container={container} />
                            </HoverBlockOptions>
                            <CodeActionMenuLeft
                                container={container}
                            ></CodeActionMenuLeft>
                            <CodeActionMenuRight
                                container={container}
                            ></CodeActionMenuRight>
                            <ImageActionMenuRight
                                container={container}
                            ></ImageActionMenuRight>
                        </HoverMenuPlugin>
                        <ImageDialogPlugin container={container} />
                    </>
                )}
                <MarkdownPlugin />
                <ImagePlugin />
                <OpenLinkPlugin />
                <TreeViewPlugin />
                <SaveStatePlugin />
                <RegisterInsertCodeCommand />
                <RegisterInsertHeadingCommand />
                <CommandMenuPlugin
                    classNames={{
                        commandRoot:
                            'box-border flex flex-col rounded-md my-2 border border-border bg-background',
                        popoverContent:
                            'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:ease-out data-[state=open]:duration-300',
                    }}
                    defaultValue="Heading 1"
                >
                    <CommandEmpty className="py-2 text-center">
                        No result
                    </CommandEmpty>
                    <CommandList className="max-h-[270px] w-[300px] overflow-y-auto scrollbar scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600">
                        <CommandGroup
                            heading="Insert nodes"
                            className="p-2 text-xs font-medium text-muted-foreground"
                        >
                            <InsertHeading1Command
                                classNames={CommandItemClassNames}
                            />
                            <InsertHeading2Command
                                classNames={CommandItemClassNames}
                            />
                            <InsertHeading3Command
                                classNames={CommandItemClassNames}
                            />
                            <InsertCodeCommand
                                classNames={CommandItemClassNames}
                            />
                        </CommandGroup>
                    </CommandList>
                </CommandMenuPlugin>
                <SlashCommandMenuPlugin />
            </div>
        </LexicalComposer>
    );
}
