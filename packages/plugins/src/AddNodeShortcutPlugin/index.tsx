import React, { useEffect, useState } from "react";
import { AddNodeDialog } from "@veridical/components";
import { LexicalNode, $getSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function defaultIsKeydown(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === "k") return true;
    return false;
}

export default function AddNodeShortcutPlugin({
    isKeyPressed: isKeydown = defaultIsKeydown,
}: {
    isKeyPressed?: (ev: KeyboardEvent) => boolean;
}) {
    const [editor] = useLexicalComposerContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState<
        LexicalNode | null | undefined
    >(null);

    useEffect(() => {
        function keydownListener(ev: KeyboardEvent) {
            if (isKeydown(ev)) {
                ev.preventDefault();
                setIsDialogOpen(true);
            }
        }
        document.addEventListener("keydown", keydownListener);
        return () => document.removeEventListener("keydown", keydownListener);
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                const node = selection?.getNodes()[0];
                setSelectedNode(node);
            });
        });
    });
    if (!selectedNode) return null;
    return (
        <AddNodeDialog
            isOpen={isDialogOpen}
            selectedNode={selectedNode}
            onClose={() => setIsDialogOpen(false)}
        />
    );
}
