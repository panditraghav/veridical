import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import {
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    LexicalEditor,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import AddNodeBtn from "./AddNodeBtn";
import { AddNodeDialog, NodeOption } from "@veridical/components";
import { useHoverMenuContext } from "..";

function useAddNodeButton(editor: LexicalEditor, nodeOptions?: NodeOption[]) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
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

export default function AddNodeButton({
    nodeOptions,
}: {
    nodeOptions?: NodeOption[];
}) {
    const [editor] = useLexicalComposerContext();
    return useAddNodeButton(editor, nodeOptions);
}
