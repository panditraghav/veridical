import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, $getNodeByKey } from "lexical";
import { $isImageNode, ImageNode } from "@veridical/nodes";
import { AddImageDialog } from "@veridical/components";

function useImagePlugin(editor: LexicalEditor, maxWidth: number) {
    const [imageNodeKey, setImageNodeKey] = useState<string | null>(null);
    const [showImageDialog, setShowImageDialog] = useState(false);

    useEffect(() => {
        return editor.registerMutationListener(ImageNode, (nodes, payload) => {
            nodes.forEach((value, key) => {
                if (value == "created") {
                    setImageNodeKey(key);
                    setShowImageDialog(true);
                }
            });
        });
    }, [editor]);

    function onSave(src: string, altText: string, imageAspectRatio: number) {
        if (!imageNodeKey) return;
        setShowImageDialog(false);
        editor.update(() => {
            const imageNode = $getNodeByKey(imageNodeKey);
            if ($isImageNode(imageNode)) {
                imageNode.setSrc(src);
                imageNode.setAltText(altText);
                imageNode.setImageAspectRatio(imageAspectRatio);
                imageNode.setFallbackAspectRatio(imageAspectRatio);
                imageNode.setMaxWidth(maxWidth);
            }
        });
    }
    function onClose() {
        setShowImageDialog(false);
        if (!imageNodeKey) return;
        editor.update(() => {
            const imageNode = $getNodeByKey(imageNodeKey);
            if (!$isImageNode(imageNode)) return;
            imageNode.remove();
        });
    }

    return (
        <AddImageDialog
            showDialog={showImageDialog}
            onClose={() => onClose()}
            onSave={onSave}
        />
    );
}

export default function ImagePlugin({ maxWidth }: { maxWidth: number }) {
    const [editor] = useLexicalComposerContext();
    return useImagePlugin(editor, maxWidth);
}
