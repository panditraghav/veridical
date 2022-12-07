import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    LexicalEditor,
    LexicalNode,
} from "lexical";
import { AddNodeDialog, defaultAddNodeOptions } from "@markor/components";
import type { AddNodeOption } from "@markor/components";

function defaultIsShortcutTriggered(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === "k") {
        return true;
    } else {
        return false;
    }
}

function useAddNodeShortcutPlugin(
    editor: LexicalEditor,
    isShortcutTriggered: (ev: KeyboardEvent) => boolean,
    addNodeOptions?: AddNodeOption[]
) {
    const [selectedNode, setSelectedNode] = useState<LexicalNode | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!selectedNode) return;
        function keyboardShortcutListener(ev: KeyboardEvent) {
            if (isShortcutTriggered(ev)) {
                ev.preventDefault();
                setIsDialogOpen(true);
            }
        }
        document.addEventListener("keydown", keyboardShortcutListener);

        return () =>
            document.removeEventListener("keydown", keyboardShortcutListener);
    }, [selectedNode]);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (
                    !(
                        $isRangeSelection(selection) ||
                        $isNodeSelection(selection)
                    )
                )
                    return;
                const nodes = selection.getNodes();
                const firstNode = nodes[0];
                setSelectedNode(firstNode);
            });
        });
    });

    return (
        <AddNodeDialog
            editor={editor}
            lexicalNode={selectedNode}
            addNodeOptions={addNodeOptions}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
        />
    );
}

export default function AddNodeShortcutPlugin({
    isShortcutTriggered = defaultIsShortcutTriggered,
    addNodeOptions = defaultAddNodeOptions,
}: {
    isShortcutTriggered?: (ev: KeyboardEvent) => boolean;
    addNodeOptions?: AddNodeOption[];
}) {
    const [editor] = useLexicalComposerContext();

    return useAddNodeShortcutPlugin(
        editor,
        isShortcutTriggered,
        addNodeOptions
    );
}
