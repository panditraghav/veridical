import { TreeView } from '@lexical/react/LexicalTreeView';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <TreeView
            editor={editor}
            viewClassName="relative mt-20 mb-8 max-h-[400px] text-foreground bg-muted rounded-sm overflow-x-auto scrollbar scrollbar-thin dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600 scrollbar-track-gray-200 scrollbar-thumb-gray-400"
            timeTravelButtonClassName="text-foreground px-2 py-1 underline"
            timeTravelPanelButtonClassName="text-foreground px-2"
            timeTravelPanelClassName="overflow-hidden mx-8 my-2 flex"
            timeTravelPanelSliderClassName="w-full"
            treeTypeButtonClassName="float-right px-2 py-1 mx-2 underline"
        />
    );
}
