import "./main.css";
import {
    Markor,
    InitialConfig,
    defaultMarkorTheme,
    useMarkorTheme,
} from "markor";
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

function App() {
    const initialConfig: InitialConfig = {
        namespace: "my-editor",
        nodes: defaultEditorNodes,
        onError: (error) => console.log(error),
        theme: defaultMarkorTheme,
        editable: true,
    };
    return (
        <Markor initialConfig={initialConfig}>
            {/* <TreeViewPlugin /> */}
            {/* <EditorStatePlugin /> */}
            {/* <EditorFromState
                stringifiedEditorState={JSON.stringify(previousEditorState)}
            /> */}
        </Markor>
    );
}

export default App;
