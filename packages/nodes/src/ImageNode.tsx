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

import { ImageComponent } from "@veridical/components";

type SerializedImageNode = {
    altText: string;
    src: string;
    width: number;
    height: number;
    type: "image";
    version: 1;
} & SerializedLexicalNode;

export interface ImageProps {
    src: string;
    altText: string;
    naturalWidth: number;
    naturalHeight: number;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __naturalWidth: number;
    __naturalHeight: number;

    static getType(): string {
        return "image";
    }

    constructor(
        src: string,
        altText: string,
        naturalWidth: number,
        naturalHeight: number,
        key?: NodeKey
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__naturalWidth = naturalWidth;
        this.__naturalHeight = naturalHeight;
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.getSrc(),
            node.getAltText(),
            node.getNaturalWidth(),
            node.getNaturalHeight(),
            node.getKey()
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText, width, height } = serializedNode;
        return $createImageNode({
            src,
            altText,
            naturalWidth: width,
            naturalHeight: height,
        });
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            width: this.getNaturalWidth(),
            height: this.getNaturalHeight(),
            type: "image",
            version: 1,
        };
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div");
        const className = config.theme.imageContainer;

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

    getNaturalWidth(): number {
        return this.__naturalWidth;
    }
    setNaturalWidth(width: number) {
        this.getWritable().__naturalWidth = width;
    }
    getNaturalHeight(): number {
        return this.__naturalHeight;
    }
    setNaturalHeight(height: number) {
        this.getWritable().__naturalHeight = height;
    }
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
        return (
            <ImageComponent
                src={this.getSrc()}
                alt={this.getAltText()}
                naturalWidth={this.getNaturalWidth()}
                naturalHeight={this.getNaturalHeight()}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
    naturalWidth,
    naturalHeight,
    key,
}: ImageProps): ImageNode {
    return new ImageNode(src, altText, naturalWidth, naturalHeight, key);
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode;
}
