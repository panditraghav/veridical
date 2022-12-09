import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, $getNodeByKey } from "lexical";
import { $isImageNode, ImageNode } from "@veridical/nodes";
import { AddImageDialog } from "@veridical/components";

function getImageHeight(
    maxWidth: number,
    naturalWidth: number,
    naturalHeight: number
): number {
    return (naturalHeight / naturalWidth) * maxWidth;
}

function useImagePlugin(editor: LexicalEditor) {
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

    function onSave(
        src: string,
        altText: string,
        width: number,
        height: number
    ) {
        if (!imageNodeKey) return;
        setShowImageDialog(false);
        editor.update(() => {
            const imageNode = $getNodeByKey(imageNodeKey);
            if ($isImageNode(imageNode)) {
                const maxWidth = imageNode.getMaxWidth();
                const imgWidth = maxWidth;
                const imgHeight = getImageHeight(maxWidth, width, height);
                console.log(
                    `Max Width: ${maxWidth}\n Image Width: ${imgWidth}\n Image Height: ${imgHeight}`
                );

                imageNode.setSrc(src);
                imageNode.setAltText(altText);
                imageNode.setWidth(imgWidth);
                imageNode.setHeight(imgHeight);
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

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();
    return useImagePlugin(editor);
}
