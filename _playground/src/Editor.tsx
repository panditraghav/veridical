import React from 'react';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { TreeViewPlugin } from '@veridical/plugins';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { defaultVeridicalTheme } from '@veridical/utils';

function EditorStatePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            console.log(editorState.toJSON());
        });
    }, [editor]);
    return null;
}

function EditorFromState({
    stringifiedEditorState,
}: {
    stringifiedEditorState: string;
}) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return () => {
            const editorState = editor.parseEditorState(stringifiedEditorState);
            editor.setEditorState(editorState);
        };
    }, []);
    return null;
}

const previousEditorState = {
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Heading 1 is here and it can be long',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
            },
            {
                src: 'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                altText: 'Laptop Image',
                height: 780,
                width: 1170,
                type: 'image',
                version: 1,
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Heading 2 is here',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h2',
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Heading 3 is here',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h3',
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Here is some normal paragraph text',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
            {
                children: [
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'This  is a Unordered list',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 1,
                    },
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'This is another item',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 2,
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: 'this is sub item',
                                                type: 'text',
                                                version: 1,
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 1,
                                        type: 'listitem',
                                        version: 1,
                                        value: 1,
                                    },
                                    {
                                        children: [
                                            {
                                                children: [
                                                    {
                                                        children: [
                                                            {
                                                                detail: 0,
                                                                format: 0,
                                                                mode: 'normal',
                                                                style: '',
                                                                text: 'this sub sub item',
                                                                type: 'text',
                                                                version: 1,
                                                            },
                                                        ],
                                                        direction: 'ltr',
                                                        format: '',
                                                        indent: 2,
                                                        type: 'listitem',
                                                        version: 1,
                                                        value: 1,
                                                    },
                                                    {
                                                        children: [
                                                            {
                                                                children: [
                                                                    {
                                                                        children:
                                                                            [
                                                                                {
                                                                                    detail: 0,
                                                                                    format: 0,
                                                                                    mode: 'normal',
                                                                                    style: '',
                                                                                    text: 'this is sub sub sub item',
                                                                                    type: 'text',
                                                                                    version: 1,
                                                                                },
                                                                            ],
                                                                        direction:
                                                                            'ltr',
                                                                        format: '',
                                                                        indent: 3,
                                                                        type: 'listitem',
                                                                        version: 1,
                                                                        value: 1,
                                                                    },
                                                                ],
                                                                direction:
                                                                    'ltr',
                                                                format: '',
                                                                indent: 0,
                                                                type: 'list',
                                                                version: 1,
                                                                listType:
                                                                    'bullet',
                                                                start: 1,
                                                                tag: 'ul',
                                                            },
                                                        ],
                                                        direction: null,
                                                        format: '',
                                                        indent: 2,
                                                        type: 'listitem',
                                                        version: 1,
                                                        value: 2,
                                                    },
                                                ],
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0,
                                                type: 'list',
                                                version: 1,
                                                listType: 'bullet',
                                                start: 1,
                                                tag: 'ul',
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 1,
                                        type: 'listitem',
                                        version: 1,
                                        value: 2,
                                    },
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                type: 'list',
                                version: 1,
                                listType: 'bullet',
                                start: 1,
                                tag: 'ul',
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                    },
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'Final item',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'list',
                version: 1,
                listType: 'bullet',
                start: 1,
                tag: 'ul',
            },
            {
                children: [],
                direction: null,
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
            {
                children: [
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'This is ordered list',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 1,
                    },
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'another item',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 2,
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: 'this sub item',
                                                type: 'text',
                                                version: 1,
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 1,
                                        type: 'listitem',
                                        version: 1,
                                        value: 1,
                                    },
                                    {
                                        children: [
                                            {
                                                children: [
                                                    {
                                                        children: [
                                                            {
                                                                detail: 0,
                                                                format: 0,
                                                                mode: 'normal',
                                                                style: '',
                                                                text: 'sub sub item',
                                                                type: 'text',
                                                                version: 1,
                                                            },
                                                        ],
                                                        direction: 'ltr',
                                                        format: '',
                                                        indent: 2,
                                                        type: 'listitem',
                                                        version: 1,
                                                        value: 1,
                                                    },
                                                    {
                                                        children: [
                                                            {
                                                                children: [
                                                                    {
                                                                        children:
                                                                            [
                                                                                {
                                                                                    detail: 0,
                                                                                    format: 0,
                                                                                    mode: 'normal',
                                                                                    style: '',
                                                                                    text: 'sub sub sub item',
                                                                                    type: 'text',
                                                                                    version: 1,
                                                                                },
                                                                            ],
                                                                        direction:
                                                                            'ltr',
                                                                        format: '',
                                                                        indent: 3,
                                                                        type: 'listitem',
                                                                        version: 1,
                                                                        value: 1,
                                                                    },
                                                                ],
                                                                direction:
                                                                    'ltr',
                                                                format: '',
                                                                indent: 0,
                                                                type: 'list',
                                                                version: 1,
                                                                listType:
                                                                    'number',
                                                                start: 1,
                                                                tag: 'ol',
                                                            },
                                                        ],
                                                        direction: null,
                                                        format: '',
                                                        indent: 2,
                                                        type: 'listitem',
                                                        version: 1,
                                                        value: 2,
                                                    },
                                                ],
                                                direction: 'ltr',
                                                format: '',
                                                indent: 0,
                                                type: 'list',
                                                version: 1,
                                                listType: 'number',
                                                start: 1,
                                                tag: 'ol',
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 1,
                                        type: 'listitem',
                                        version: 1,
                                        value: 2,
                                    },
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                type: 'list',
                                version: 1,
                                listType: 'number',
                                start: 1,
                                tag: 'ol',
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                    },
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'final item',
                                type: 'text',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'list',
                version: 1,
                listType: 'number',
                start: 1,
                tag: 'ol',
            },
            {
                children: [],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
    },
};

export default function Editor() {
    return (
        <Veridical initialConfig={{ theme: defaultVeridicalTheme }}>
            <VeridicalEditorPlugins />
            <TreeViewPlugin />
            {/*<EditorStatePlugin />*/}
            {
                <EditorFromState
                    stringifiedEditorState={JSON.stringify(previousEditorState)}
                />
            }
        </Veridical>
    );
}
