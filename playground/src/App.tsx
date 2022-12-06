import "./main.css";
import { Editor, InitialConfig, defaultTheme } from "markor";
import { defaultEditorNodes } from "@markor/nodes";
import { TreeViewPlugin } from "@markor/plugins";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { LexicalEditor } from "lexical/LexicalEditor";
import { $createRootNode } from "lexical/nodes/LexicalRootNode";
import { $restoreEditorState } from "@lexical/utils";
import { EditorState } from "lexical/LexicalEditorState";

function EditorStatePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            console.log(editorState);
            console.log(editorState.toJSON());
        });
    }, [editor]);
}

function EditorFromState({
    stringifiedEditorState,
}: {
    stringifiedEditorState: string;
}) {
    const [editor] = useLexicalComposerContext();
    const editorState = editor.parseEditorState(stringifiedEditorState);
    editor.setEditorState(editorState);
}

const previousEditorState = {
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Nature images",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h1",
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Ocean",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h2",
            },
            {
                src: "https://images.unsplash.com/photo-1669935874092-f2632a30c89c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                altText: "Nature",
                width: 740,
                height: 493.3333333333333,
                maxWidth: 740,
                type: "image",
                version: 1,
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Egals",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h2",
            },
            {
                src: "https://images.unsplash.com/photo-1669843629860-138951faf65e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                altText: "Egals",
                width: 740,
                height: 493.3333333333333,
                maxWidth: 740,
                type: "image",
                version: 1,
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Road with trees",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h2",
            },
            {
                src: "https://images.unsplash.com/photo-1669585180834-513bddd2cb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                altText: "Road with trees",
                width: 740,
                height: 1110.9560723514212,
                maxWidth: 740,
                type: "image",
                version: 1,
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Elephant",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h2",
            },
            {
                src: "https://images.unsplash.com/photo-1669836053928-5b90afddd893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                altText: "Elephant walking in grass",
                width: 740,
                height: 493.3333333333333,
                maxWidth: 740,
                type: "image",
                version: 1,
            },
            {
                children: [],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
            },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
    },
};

function App() {
    const initialConfig: InitialConfig = {
        namespace: "my-editor",
        nodes: defaultEditorNodes,
        onError: (error) => console.log(error),
        theme: defaultTheme,
        editable: true,
    };
    return (
        <Editor initialConfig={initialConfig}>
            <TreeViewPlugin />
            <EditorStatePlugin />
            {/* <EditorFromState
                stringifiedEditorState={JSON.stringify(previousEditorState)}
            /> */}
        </Editor>
    );
}

export default App;
