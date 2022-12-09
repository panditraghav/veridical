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

function hasClickOnImage(
    event: MouseEvent,
    imageElement: HTMLDivElement | null
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
}

function LazyImage({ src, alt, style, className }: LazyImageProps) {
    useSuspenseImage(src);
    return <img src={src} alt={alt} style={style} className={className} />;
}

function FallBack({ width, height }: { width?: number; height?: number }) {
    return <div style={{ width, height }}></div>;
}

export default function ImageComponent({
    src,
    alt,
    width,
    height,
    maxWidth,
    nodeKey,
}: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    maxWidth: number;
    nodeKey: NodeKey;
}) {
    const imageComponentRef = useRef<HTMLDivElement | null>(null);
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
            editor.registerCommand<MouseEvent>(
                CLICK_COMMAND,
                (payload) => {
                    const event: MouseEvent = payload;
                    if (hasClickOnImage(event, imageComponentRef.current)) {
                        setIsSelected(!isSelected);
                        return true;
                    }
                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),
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
            <div
                style={{
                    borderWidth: isSelected ? "2px" : "0px",
                }}
                className="imageComponent"
                ref={imageComponentRef}
            >
                {src !== "" && (
                    <Suspense
                        fallback={
                            <FallBack
                                width={width || maxWidth}
                                height={height}
                            />
                        }
                    >
                        <LazyImage
                            src={src}
                            alt={alt}
                            style={{ width, height }}
                        />
                    </Suspense>
                )}
            </div>
        </>
    );
}
