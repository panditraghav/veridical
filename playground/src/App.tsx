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
            {/* <TreeViewPlugin /> */}
            {/* <EditorStatePlugin /> */}
            {/* <EditorFromState
                stringifiedEditorState={JSON.stringify(previousEditorState)}
            /> */}
        </Veridical>
    );
}

export default App;
