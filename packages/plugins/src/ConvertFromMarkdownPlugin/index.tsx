import { $convertFromMarkdownString } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';
import { MARKDOWN_TRANSFORMERS } from '@veridical/utils';

interface IProps {
    markdown: string
}

export default function ConvertToMarkdownPlugin({markdown}: IProps) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.update(() => {
            $convertFromMarkdownString(markdown, MARKDOWN_TRANSFORMERS)
        });
    }, []);
    return null;
}
