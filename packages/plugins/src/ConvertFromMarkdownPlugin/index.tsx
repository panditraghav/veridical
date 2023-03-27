import { $convertFromMarkdownString } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';
import { MARKDOWN_TRANSFORMERS } from '@veridical/utils';

interface IProps {
    markdown: string;
}

export default function ConvertFromMarkdownPlugin({ markdown }: IProps) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.update(() => {
            if (markdown !== '')
                $convertFromMarkdownString(markdown, MARKDOWN_TRANSFORMERS);
        });
    }, []);
    return null;
}
