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
import { AddNodeDialog } from "@veridical/components";

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
                src: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                altText: "",
                maxWidth: 531.3333282470703,
                imageAspectRatio: 1.5,
                fallbackAspectRatio: 2.089104543449493,
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
                        text: "This is first heading",
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

export default function Editor() {
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
