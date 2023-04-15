import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes } from '@lexical/html';
import { defaultEditorNodes } from 'veridical';
import { lexicalTheme } from '../theme/lexicalTheme';

export function getHTMLFromEditorJSONString(editorState: string | null) {
    if (!editorState) {
        return '<h1>Editor State not found!</h1>';
    }
    const editor = createHeadlessEditor({
        nodes: defaultEditorNodes,
        theme: lexicalTheme,
        onError: (err) => console.log(err),
    });
    editor.setEditorState(editor.parseEditorState(editorState));

    let html = '';
    editor.getEditorState().read(() => {
        html = $generateHtmlFromNodes(editor);
    });
    return html;
}
