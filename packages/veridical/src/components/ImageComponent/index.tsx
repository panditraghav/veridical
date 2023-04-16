import React, { Suspense, useCallback, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_HIGH,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    KEY_ENTER_COMMAND,
    NodeKey,
    $setSelection,
    $createNodeSelection,
} from 'lexical';
import { $isImageNode } from '../../nodes';
import { useVeridicalTheme } from '../../utils';

function hasClickOnImage(
    event: MouseEvent,
    imageElement: HTMLImageElement | null,
) {
    let ele = event.target as HTMLElement;
    if (ele === imageElement) return true;
    while (ele?.parentElement) {
        ele = ele?.parentElement;
        if (ele === imageElement) return true;
    }

    return false;
}

const imageCache = new Set();

function useSuspenseImage(src: string) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve(null);
            };
        });
    }
}

function SuspenseImage({
    src,
    alt,
    naturalHeight,
    naturalWidth,
    isMaxWidth,
    isSelected,
    imgRef,
}: {
    src: string;
    alt: string;
    naturalHeight: number;
    naturalWidth: number;
    isMaxWidth: boolean;
    isSelected: boolean;
    imgRef: React.MutableRefObject<HTMLImageElement | null>;
}) {
    useSuspenseImage(src);
    const theme = useVeridicalTheme()?.veridicalImage;
    return (
        <div className={theme?.container}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                style={{
                    width: isMaxWidth ? '100%' : 'auto',
                    height: isMaxWidth ? 'auto' : undefined,
                    aspectRatio: `auto ${naturalWidth / naturalHeight}`,
                }}
                className={`${theme?.image} ${
                    isSelected ? theme?.selected : ''
                }`}
            />
        </div>
    );
}

function ImageFallback({
    naturalWidth,
    naturalHeight,
    isMaxWidth,
}: {
    naturalWidth: number;
    naturalHeight: number;
    isMaxWidth: boolean;
}) {
    const theme = useVeridicalTheme()?.veridicalImage;
    return (
        <div className={theme?.container}>
            <div
                style={{
                    width: isMaxWidth ? '100%' : 'auto',
                    height: isMaxWidth ? 'auto' : undefined,
                    aspectRatio: `auto ${naturalWidth / naturalHeight}`,
                }}
                className={theme?.fallback}
            ></div>
        </div>
    );
}

export default function ImageComponent({
    src,
    alt,
    naturalHeight,
    naturalWidth,
    isMaxWidth,
    nodeKey,
}: {
    src: string;
    alt: string;
    naturalHeight: number;
    naturalWidth: number;
    isMaxWidth: boolean;
    nodeKey: NodeKey;
}) {
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
        document.addEventListener('click', clickListener);

        return () => document.removeEventListener('click', clickListener);
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

                p.append($createTextNode(''));
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

                p.append($createTextNode(''));
                p.select(0, 0);

                return true;
            }
            return false;
        },
        [isSelected],
    );

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                KEY_DELETE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_HIGH,
            ),
            editor.registerCommand(
                KEY_BACKSPACE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_HIGH,
            ),
            editor.registerCommand(
                KEY_ENTER_COMMAND,
                onEnter,
                COMMAND_PRIORITY_HIGH,
            ),
        );
    });

    return (
        <>
            {src !== '' && (
                <Suspense
                    fallback={
                        <ImageFallback
                            naturalWidth={naturalWidth}
                            naturalHeight={naturalHeight}
                            isMaxWidth={isMaxWidth}
                        />
                    }
                >
                    <SuspenseImage
                        imgRef={imgRef}
                        src={src}
                        alt={alt}
                        naturalWidth={naturalWidth}
                        naturalHeight={naturalHeight}
                        isMaxWidth={isMaxWidth}
                        isSelected={isSelected}
                    />
                </Suspense>
            )}
        </>
    );
}
