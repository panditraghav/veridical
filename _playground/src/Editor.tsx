import { Veridical, VeridicalEditorPlugins } from 'veridical';
import {
    ConvertToMarkdownPlugin,
    ConvertFromMarkdownPlugin,
} from '@veridical/plugins';
import { defaultVeridicalTheme } from '@veridical/utils';
import TreeViewPlugin from './TreeViewPlugin';

export default function Editor() {
    function saveMarkdownToLocalStorage(markdown: string) {
        localStorage.setItem('blog', markdown);
    }
    return (
        <Veridical initialConfig={{ theme: defaultVeridicalTheme }}>
            <VeridicalEditorPlugins />
            {<TreeViewPlugin />}
            {
                <ConvertToMarkdownPlugin
                    onChangeMarkdown={(markdown) => {
                        saveMarkdownToLocalStorage(markdown);
                    }}
                />
            }
            {
                <ConvertFromMarkdownPlugin
                    markdown={localStorage.getItem('blog') || ''}
                />
            }
        </Veridical>
    );
}
