import { $convertToMarkdownString } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';
import { MARKDOWN_TRANSFORMERS } from '../../utils';

interface IProps {
    onChangeMarkdown: (markdown: string) => void;
}

export default function ConvertToMarkdownPlugin({ onChangeMarkdown }: IProps) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                onChangeMarkdown(
                    $convertToMarkdownString(MARKDOWN_TRANSFORMERS),
                );
            });
        });
    }, []);
    return null;
}
