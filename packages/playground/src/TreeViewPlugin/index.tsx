import { TreeView } from '@lexical/react/LexicalTreeView';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';

export default function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <TreeView
            editor={editor}
            timeTravelButtonClassName=""
            timeTravelPanelButtonClassName=""
            timeTravelPanelClassName=""
            timeTravelPanelSliderClassName=""
            treeTypeButtonClassName="float-right"
            viewClassName="my-10 text-editor-p-dark dark:text-editor-p-light overflow-x-auto scrollbar scrollbar-thin dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600 scrollbar-track-gray-200 scrollbar-thumb-gray-400"
        />
    );
}
