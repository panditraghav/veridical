import "./main.css";
import { Veridical, InitialConfig } from "veridical";
import { defaultVeridicalTheme, useVeridicalTheme } from "@veridical/utils";
import { defaultEditorNodes } from "@veridical/nodes";
import { TreeViewPlugin } from "@veridical/plugins";
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
                        text: "This is my blog",
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
                src: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                altText: "",
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
                        text: "This is second heading",
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
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Writing something that seems reasonable",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
            },
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "This is third heading",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "heading",
                version: 1,
                tag: "h3",
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
        theme: defaultVeridicalTheme,
        editable: true,
    };
    return (
        <Veridical initialConfig={initialConfig}>
            <TreeViewPlugin />
            {/* <EditorStatePlugin />
            <EditorFromState
                stringifiedEditorState={JSON.stringify(previousEditorState)}
            /> */}
        </Veridical>
    );
}

export default App;
