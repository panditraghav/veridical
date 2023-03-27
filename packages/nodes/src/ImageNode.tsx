import {
    DecoratorNode,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    $applyNodeReplacement,
} from 'lexical';
import React from 'react';

import { ImageComponent } from '@veridical/components';

type SerializedImageNode = {
    altText: string;
    src: string;
    height: number;
    width: number;
    isMaxWidth: boolean;
    type: 'image';
    version: 1;
} & SerializedLexicalNode;

export interface ImageProps {
    src: string;
    altText: string;
    height: number;
    width: number;
    isMaxWidth: boolean;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width: number;
    __height: number;
    __isMaxWidth: boolean = true;

    static getType(): string {
        return 'image';
    }

    constructor(
        src: string,
        altText: string,
        height: number,
        width: number,
        isMaxWidth: boolean,
        key?: NodeKey,
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__height = height;
        this.__width = width;
        this.__isMaxWidth = isMaxWidth;
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.getSrc(),
            node.getAltText(),
            node.getHeight(),
            node.getWidth(),
            node.isMaxWidth(),
            node.getKey(),
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText, height, width, isMaxWidth } = serializedNode;
        return $createImageNode({
            src,
            altText,
            height,
            width,
            isMaxWidth,
        });
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            height: this.getHeight(),
            width: this.getWidth(),
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

    exportDOM(): DOMExportOutput {
        const element = document.createElement('img');
        element.setAttribute('src', this.getSrc());
        element.setAttribute('alt', this.getAltText());
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

    getHeight(): number {
        return this.__height;
    }
    setHeight(height: number) {
        this.getWritable().__height = height;
    }
    getWidth(): number {
        return this.__width;
    }
    setWidth(width: number) {
        this.getWritable().__width = width;
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
                height={this.getHeight()}
                width={this.getWidth()}
                isMaxWidth={this.isMaxWidth()}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
    height,
    width,
    isMaxWidth,
    key,
}: ImageProps): ImageNode {
    return $applyNodeReplacement(
        new ImageNode(src, altText, height, width, isMaxWidth, key),
    );
}

export function $isImageNode(
    node: LexicalNode | null | undefined,
): node is ImageNode {
    return node instanceof ImageNode;
}
