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
import { AddNodeDialog, AddNodeOption } from "@veridical/components";
import { useHoverMenuContext } from "..";

function useAddNodeButton(
    editor: LexicalEditor,
    addNodeOptions?: AddNodeOption[]
) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <AddNodeBtn
                onClick={() => {
                    setIsDialogOpen(true);
                }}
            />
            <AddNodeDialog
                editor={editor}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                lexicalNode={hoveredLexicalNode}
                addNodeOptions={addNodeOptions}
            />
        </>
    );
}

export default function AddNodeButton({
    addNodeOptions,
}: {
    addNodeOptions?: AddNodeOption[];
}) {
    const [editor] = useLexicalComposerContext();
    return useAddNodeButton(editor, addNodeOptions);
}
