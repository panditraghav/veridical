import React, {
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { ImageIcon } from "@veridical/components";
import {
    $createParagraphNode,
    $createTextNode,
    $getNodeByKey,
    $getRoot,
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_HIGH,
    COMMAND_PRIORITY_LOW,
    CLICK_COMMAND,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    KEY_ENTER_COMMAND,
    NodeKey,
    $setSelection,
    $createNodeSelection,
} from "lexical";
import { $isImageNode } from "@veridical/nodes";
import { useVeridicalTheme } from "@veridical/utils";

function hasClickOnImage(
    event: MouseEvent,
    imageElement: HTMLImageElement | null
) {
    let ele = event.target;
    if (ele === imageElement) return true;
    //@ts-ignore
    while (ele.parentElement) {
        //@ts-ignore
        ele = ele.parentElement;
        if (ele === imageElement) return true;
    }

    return false;
}

export default function ImageComponent({
    src,
    alt,
    height,
    width,
    nodeKey,
}: {
    src: string;
    alt: string;
    height: number;
    width: number;
    nodeKey: NodeKey;
}) {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    const [isSelected, setIsSelected, clearSelection] =
        useLexicalNodeSelection(nodeKey);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        function clickListener(ev: MouseEvent) {
            if (hasClickOnImage(ev, imgRef.current)) {
                setIsSelected(true);
            }
        }
        document.addEventListener("click", clickListener);

        return () => document.removeEventListener("click", clickListener);
    });

    const onDelete = useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        const selection = $getSelection();
        const selectedNode = selection?.getNodes()[0];
        const previousNode = selectedNode?.getPreviousSibling();
        const root = $getRoot();

        if (
            selectedNode &&
            $isNodeSelection(selection) &&
            $isImageNode(selectedNode)
        ) {
            if (root.getChildren().length < 2) {
                const p = $createParagraphNode();

                p.append($createTextNode(""));
                root.append(p);
                p.select(0, 0);
            }
            selectedNode.remove();

            return true;
        } else if (
            $isRangeSelection(selection) &&
            previousNode &&
            $isImageNode(previousNode)
        ) {
            const newSelection = $createNodeSelection();
            newSelection.add(previousNode.getKey());
            $setSelection(newSelection);

            selectedNode?.remove();
            return true;
        }
        return false;
    }, []);

    const onEnter = useCallback(
        (evt: KeyboardEvent | null) => {
            if (!evt) return false;

            if (isSelected) {
                evt.preventDefault();

                const selection = $getSelection();
                const node = selection?.getNodes()[0];
                const p = $createParagraphNode();
                const root = $getRoot();

                if ($isNodeSelection(selection) && node && $isImageNode(node)) {
                    node.insertAfter(p);
                } else {
                    root.append(p);
                }

                p.append($createTextNode(""));
                p.select(0, 0);

                return true;
            }
            return false;
        },
        [isSelected]
    );

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                KEY_DELETE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(
                KEY_BACKSPACE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(
                KEY_ENTER_COMMAND,
                onEnter,
                COMMAND_PRIORITY_HIGH
            )
        );
    });

    return (
        <>
            {src !== "" && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    style={{
                        width: width,
                        height: height,
                        aspectRatio: `auto ${width / height}`,
                    }}
                    className={`${theme?.image} ${
                        isSelected && theme?.imageSelected
                    }`}
                />
            )}
        </>
    );
}
