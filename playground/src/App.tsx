import { Editor, InitialConfig, defaultTheme } from "markor";
import { defaultEditorNodes } from "@markor/nodes";
import { createParagraphNode, $getRoot, $createTextNode } from "lexical";
import { $createLinkNode } from "@lexical/link";
import { $createHeadingNode } from "@lexical/rich-text";

function App() {
    const initialConfig = {
        namespace: "my-editor",
        nodes: defaultEditorNodes,
        onError: (error) => console.log(error),
        theme: defaultTheme,
        editable: true,
        // editorState(editor) {
        //     const root = $getRoot();
        //     root.append(
        //         $createHeadingNode("h1").append($createTextNode("Hello World"))
        //     );
        // },
    };
    return <Editor initialConfig={initialConfig} />;
}

export default App;
