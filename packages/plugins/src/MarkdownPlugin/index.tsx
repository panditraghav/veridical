import React from 'react';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { MARKDOWN_TRANSFORMERS } from '@veridical/utils';

export default function MarkdownPlugin() {
    return <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />;
}
