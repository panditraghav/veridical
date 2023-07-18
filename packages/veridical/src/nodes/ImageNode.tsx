import {
    $applyNodeReplacement,
    $createNodeSelection,
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    $setSelection,
    COMMAND_PRIORITY_HIGH,
    DecoratorNode,
    DOMExportOutput,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    KEY_ENTER_COMMAND,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import React, { Suspense, useCallback, useEffect, useRef } from 'react';

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
    return (
        <div>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                style={{
                    width: isMaxWidth ? '100%' : 'auto',
                    height: isMaxWidth ? 'auto' : undefined,
                    aspectRatio: `auto ${naturalWidth / naturalHeight}`,
                }}
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
    return (
        <div>
            <div
                style={{
                    width: isMaxWidth ? '100%' : 'auto',
                    height: isMaxWidth ? 'auto' : undefined,
                    aspectRatio: `auto ${naturalWidth / naturalHeight}`,
                }}
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
    const [isSelected, setIsSelected] = useLexicalNodeSelection(nodeKey);
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

type SerializedImageNode = {
    altText: string;
    src: string;
    naturalHeight: number;
    naturalWidth: number;
    isMaxWidth: boolean;
    type: 'image';
    version: 1;
} & SerializedLexicalNode;

export interface ImageProps {
    src: string;
    altText: string;
    naturalHeight: number;
    naturalWidth: number;
    isMaxWidth: boolean;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __naturalWidth: number;
    __naturalHeight: number;
    __isMaxWidth = true;

    static getType(): string {
        return 'image';
    }

    constructor(
        src: string,
        altText: string,
        naturalHeight: number,
        naturalWidth: number,
        isMaxWidth: boolean,
        key?: NodeKey,
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__naturalHeight = naturalHeight;
        this.__naturalWidth = naturalWidth;
        this.__isMaxWidth = isMaxWidth;
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.getSrc(),
            node.getAltText(),
            node.getNaturalHeight(),
            node.getNaturalWidth(),
            node.isMaxWidth(),
            node.getKey(),
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText, naturalHeight, naturalWidth, isMaxWidth } =
            serializedNode;
        return $createImageNode({
            src,
            altText,
            naturalHeight,
            naturalWidth,
            isMaxWidth,
        });
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            naturalHeight: this.getNaturalHeight(),
            naturalWidth: this.getNaturalWidth(),
            isMaxWidth: this.isMaxWidth(),
            type: 'image',
            version: 1,
        };
    }

    createDOM(): HTMLElement {
        const div = document.createElement('div');
        return div;
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const theme = editor._config.theme;
        const img = document.createElement('img');
        const container = document.createElement('div');
        const aspectRatioStyle = `aspect-ratio: auto ${
            this.getNaturalWidth() / this.getNaturalHeight()
        }; width: ${this.isMaxWidth() ? '100%' : 'auto'}; ${
            this.isMaxWidth() ? 'height: auto;' : ''
        }`;
        img.setAttribute('src', this.getSrc());
        img.setAttribute('alt', this.getAltText());
        img.setAttribute('class', theme.image || '');
        img.setAttribute('style', aspectRatioStyle);

        container.setAttribute('class', theme.imageContainer || '');
        //container.setAttribute('style', aspectRatioStyle);

        container.appendChild(img);
        return { element: container };
    }

    getSrc(): string {
        return this.__src;
    }
    setSrc(src: string): void {
        this.getWritable().__src = src;
    }

    getAltText() {
        return this.__altText;
    }
    setAltText(altText: string): void {
        this.getWritable().__altText = altText;
    }

    getNaturalHeight(): number {
        return this.__naturalHeight;
    }
    setNaturalHeight(naturalHeight: number) {
        this.getWritable().__naturalHeight = naturalHeight;
    }
    getNaturalWidth(): number {
        return this.__naturalWidth;
    }
    setNaturalWidth(naturalWidth: number) {
        this.getWritable().__naturalWidth = naturalWidth;
    }

    isMaxWidth(): boolean {
        return this.__isMaxWidth;
    }
    setIsMaxWidth(isMaxWidth: boolean) {
        this.getWritable().__isMaxWidth = isMaxWidth;
    }

    decorate(): JSX.Element {
        return (
            <ImageComponent
                src={this.getSrc()}
                alt={this.getAltText()}
                naturalHeight={this.getNaturalHeight()}
                naturalWidth={this.getNaturalWidth()}
                isMaxWidth={this.isMaxWidth()}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
    naturalHeight,
    naturalWidth,
    isMaxWidth,
    key,
}: ImageProps): ImageNode {
    return $applyNodeReplacement(
        new ImageNode(
            src,
            altText,
            naturalHeight,
            naturalWidth,
            isMaxWidth,
            key,
        ),
    );
}

export function $isImageNode(
    node: LexicalNode | null | undefined,
): node is ImageNode {
    return node instanceof ImageNode;
}
