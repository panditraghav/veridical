import {
    DecoratorNode,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    $applyNodeReplacement,
    LexicalEditor,
} from 'lexical';
import React from 'react';

import { ImageComponent } from '@veridical/components';

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
    __isMaxWidth: boolean = true;

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

    createDOM(config: EditorConfig): HTMLElement {
        const div = document.createElement('div');
        const className = config.theme.image;

        if (className) div.className = className;
        return div;
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const theme = editor._config.theme;
        const element = document.createElement('img');
        element.setAttribute('src', this.getSrc());
        element.setAttribute('alt', this.getAltText());
        element.setAttribute('class', theme.image || '');
        return { element };
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
