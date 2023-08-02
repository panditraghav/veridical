import { TreeView } from '@lexical/react/LexicalTreeView';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <TreeView
            editor={editor}
            viewClassName="relative mt-20 mb-8 max-h-[400px] text-foreground bg-muted rounded-sm overflow-x-auto scrollbar scrollbar-thin dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600 scrollbar-track-gray-200 scrollbar-thumb-gray-400"
            timeTravelButtonClassName="bg-red-800 aboslute top-0 right-0"
            timeTravelPanelButtonClassName="bg-orange-800"
            timeTravelPanelClassName="overflow-hidden mx-8 my-2 bg-orange-800 flex"
            timeTravelPanelSliderClassName="p-0 flex-8"
            treeTypeButtonClassName="float-right"
        />
    );
}
