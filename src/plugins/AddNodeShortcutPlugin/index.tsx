import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    LexicalNode,
} from "lexical";
import AddNodeDialog, {
    AddNodeDialogStyle,
    AddNodeOption,
    defaultAddNodeOptions,
} from "../../components/AddNodeDialog";

function defaultIsShortcutTriggered(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === "k") {
        return true;
    } else {
        return false;
    }
}

export default function AddNodeShortcutPlugin({
    isShortcutTriggered = defaultIsShortcutTriggered,
    addNodeOptions = defaultAddNodeOptions,
    style,
}: {
    isShortcutTriggered?: (ev: KeyboardEvent) => boolean;
    addNodeOptions?: AddNodeOption[];
    style?: AddNodeDialogStyle;
}) {
    const [editor] = useLexicalComposerContext();
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
            style={style}
        />
    );
}
