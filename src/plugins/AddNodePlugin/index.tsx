import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    LexicalEditor,
} from "lexical";
import AddNodeDialog, { AddNodeDialogStyle } from "./components/AddNodeDialog";
import AddNodeBtn from "./components/AddNodeBtn";
import { NodeTransformerOption } from "./NodeTransformers";

export default function AddNodePlugin({
    nodeTransformerOptions,
    style,
}: {
    nodeTransformerOptions: NodeTransformerOption[];
    style?: AddNodeDialogStyle;
}) {
    const [editor] = useLexicalComposerContext();
    const [addNodeBtn, setAddNodeBtn] = useState<{
        showBtn: boolean;
        boundingClientRect: DOMRect | null;
    }>({
        showBtn: false,
        boundingClientRect: null,
    });
    const [isOpen, setIsOpen] = useState(false);

    const updatePlugin = useCallback(() => {
        const selection = $getSelection();
        const nativeSelection = window.getSelection();
        const nativeAnchorNode =
            nativeSelection?.anchorNode as HTMLParagraphElement;

        if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            const textContent = anchorNode.getTextContent();

            if (
                ($isParagraphNode(anchorNode) ||
                    $isParagraphNode(anchorNode.getParent())) &&
                textContent === ""
            ) {
                if (nativeAnchorNode.getBoundingClientRect) {
                    let boundingClientRect =
                        nativeAnchorNode.getBoundingClientRect();
                    setAddNodeBtn({ showBtn: true, boundingClientRect });
                }
            } else {
                setAddNodeBtn({ showBtn: false, boundingClientRect: null });
            }
        }
    }, [editor]);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                updatePlugin();
            });
        });
    });

    useEffect(() => {
        const keyPressListener = (ev: KeyboardEvent) => {
            if ((ev.key === "k" || ev.key === "K") && ev.ctrlKey) {
                ev.preventDefault();
                setIsOpen(true);
            }
        };
        document.addEventListener("keydown", keyPressListener);
        return () => document.removeEventListener("keydown", keyPressListener);
    }, []);

    if (!addNodeBtn.showBtn) return null;

    return ReactDOM.createPortal(
        <>
            <AddNodeBtn
                boundingClientRect={addNodeBtn.boundingClientRect}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <AddNodeDialog
                    onClose={() => setIsOpen(false)}
                    editor={editor}
                    nodeTransformerOptions={nodeTransformerOptions}
                    style={style}
                />
            )}
        </>,
        document.body
    );
}

export { defaultNodeTransformerOptions } from "./NodeTransformers";
export { NodeTransformer } from "./NodeTransformers";
export { NodeTransformerOption };