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
import { ImageIcon } from "@veridical/icons";
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

const cachedImages = new Set<string>();
function useSuspenseImage(src: string) {
    if (!cachedImages.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                cachedImages.add(src);
                resolve(null);
            };
            img.src = src;
        });
    }
}

interface LazyImageProps {
    src: string;
    alt: string;
    style?: React.CSSProperties;
    className?: string;
    ref?: React.MutableRefObject<HTMLImageElement | null>;
    onClick: () => void;
}

function LazyImage({ src, alt, style, className, onClick }: LazyImageProps) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        function clickListener(ev: MouseEvent) {
            if (hasClickOnImage(ev, imgRef.current)) {
                onClick();
            }
        }
        document.addEventListener("click", clickListener);

        return () => document.removeEventListener("click", clickListener);
    }, [onClick]);
    useSuspenseImage(src);
    return (
        <img
            src={src}
            alt={alt}
            style={style}
            className={className}
            ref={imgRef}
        />
    );
}

function FallBack({ style }: { style?: React.CSSProperties }) {
    const theme = useVeridicalTheme();
    return <div className={`${theme?.imageFallback}`} style={style}></div>;
}

export default function ImageComponent({
    src,
    alt,
    maxWidth,
    imageAspectRatio,
    fallbackAspectRatio,
    nodeKey,
}: {
    src: string;
    alt: string;
    maxWidth: number;
    imageAspectRatio: number;
    fallbackAspectRatio: number;
    nodeKey: NodeKey;
}) {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    const [isSelected, setIsSelected, clearSelection] =
        useLexicalNodeSelection(nodeKey);

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
                <Suspense
                    fallback={
                        <FallBack
                            style={{
                                aspectRatio: fallbackAspectRatio,
                            }}
                        />
                    }
                >
                    <LazyImage
                        src={src}
                        alt={alt}
                        style={{
                            aspectRatio: imageAspectRatio,
                            maxWidth: maxWidth,
                        }}
                        className={`${theme?.image} ${
                            isSelected ? theme?.imageSelected : ""
                        }`}
                        onClick={() => setIsSelected(true)}
                    />
                </Suspense>
            )}
        </>
    );
}
