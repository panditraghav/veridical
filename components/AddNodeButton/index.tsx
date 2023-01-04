import React, { useState } from "react";
import AddNodeBtn from "./AddNodeBtn";
import { AddNodeDialog, NodeOption } from "..";
import { useHoverMenuContext } from "../../plugins";

export default function AddNodeButton({
    nodeOptions,
}: {
    nodeOptions?: NodeOption[];
}) {
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <AddNodeBtn
                onClick={() => {
                    setIsDialogOpen(true);
                }}
            />
            {hoveredLexicalNode && (
                <AddNodeDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    selectedNode={hoveredLexicalNode}
                    nodeOptions={nodeOptions}
                />
            )}
        </>
    );
}
