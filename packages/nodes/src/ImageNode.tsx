import {
    DecoratorNode,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    LexicalEditor,
    DOMConversionMap,
} from "lexical";
import React from "react";

import { ImageComponent } from "@markor/components";

type SerializedImageNode = {
    altText: string;
    src: string;
    width?: number;
    height?: number;
    maxWidth: number;
    type: "image";
    version: 1;
} & SerializedLexicalNode;

export interface ImageProps {
    src: string;
    altText: string;
    width?: number;
    height?: number;
    maxWidth: number;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width?: number;
    __height?: number;
    __maxWidth: number;

    static getType(): string {
        return "image";
    }

    constructor(
        src: string,
        altText: string,
        maxWidth: number,
        width?: number,
        height?: number,
        key?: NodeKey
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth;
        this.__width = width;
        this.__height = height;
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.getSrc(),
            node.getAltText(),
            node.getMaxWidth(),
            node.getWidth(),
            node.getHeight(),
            node.getKey()
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText, width, height, maxWidth } = serializedNode;
        return $createImageNode({
            src,
            altText,
            width,
            height,
            maxWidth,
        });
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            width: this.getWidth(),
            height: this.getHeight(),
            maxWidth: this.getMaxWidth(),
            type: "image",
            version: 1,
        };
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div");
        const className = config.theme.image;

        if (className) div.className = className;
        return div;
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("img");
        element.setAttribute("src", this.getSrc());
        element.setAttribute("alt", this.getAltText());
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

    getWidth(): number | undefined {
        return this.__width;
    }
    setWidth(width: number) {
        this.getWritable().__width = width;
    }
    getMaxWidth(): number {
        return this.__maxWidth;
    }
    setMaxWidth(maxWidth: number) {
        this.getWritable().__maxWidth = maxWidth;
    }

    getHeight(): number | undefined {
        return this.__height;
    }
    setHeight(height: number) {
        this.getWritable().__height = height;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
        return (
            <ImageComponent
                src={this.getSrc()}
                alt={this.getAltText()}
                width={this.getWidth()}
                height={this.getHeight()}
                maxWidth={this.getMaxWidth()}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
    width,
    height,
    maxWidth,
    key,
}: ImageProps): ImageNode {
    return new ImageNode(src, altText, maxWidth, width, height, key);
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode;
}
