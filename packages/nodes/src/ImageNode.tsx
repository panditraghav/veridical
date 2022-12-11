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
    maxWidth: number;
    imageAspectRatio: number;
    fallbackAspectRatio: number;
    type: "image";
    version: 1;
} & SerializedLexicalNode;

export interface ImageProps {
    src: string;
    altText: string;
    maxWidth: number;
    imageAspectRatio: number;
    fallbackAspectRatio: number;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __imageAspectRatio: number;
    __fallbackAspectRatio: number;
    __maxWidth: number;

    static getType(): string {
        return "image";
    }

    constructor(
        src: string,
        altText: string,
        maxWidth: number,
        imageAspectRatio: number,
        fallbackAspectRatio: number,
        key?: NodeKey
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth;
        this.__imageAspectRatio = imageAspectRatio;
        this.__fallbackAspectRatio = fallbackAspectRatio;
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.getSrc(),
            node.getAltText(),
            node.getMaxWidth(),
            node.getImageAspectRatio(),
            node.getFallbackAspectRatio(),
            node.getKey()
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const {
            src,
            altText,
            maxWidth,
            imageAspectRatio,
            fallbackAspectRatio,
        } = serializedNode;
        return $createImageNode({
            src,
            altText,
            maxWidth,
            imageAspectRatio,
            fallbackAspectRatio,
        });
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            maxWidth: this.getMaxWidth(),
            imageAspectRatio: this.getImageAspectRatio(),
            fallbackAspectRatio: this.getFallbackAspectRatio(),
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

    getMaxWidth(): number {
        return this.__maxWidth;
    }
    setMaxWidth(maxWidth: number) {
        this.getWritable().__maxWidth = maxWidth;
    }
    getImageAspectRatio(): number {
        return this.__imageAspectRatio;
    }
    setImageAspectRatio(ratio: number) {
        this.getWritable().__imageAspectRatio = ratio;
    }
    getFallbackAspectRatio(): number {
        return this.__fallbackAspectRatio;
    }
    setFallbackAspectRatio(ratio: number) {
        this.getWritable().__fallbackAspectRatio = ratio;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
        return (
            <ImageComponent
                src={this.getSrc()}
                alt={this.getAltText()}
                maxWidth={this.getMaxWidth()}
                imageAspectRatio={this.getImageAspectRatio()}
                fallbackAspectRatio={this.getFallbackAspectRatio()}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
    maxWidth,
    imageAspectRatio,
    fallbackAspectRatio,
    key,
}: ImageProps): ImageNode {
    return new ImageNode(
        src,
        altText,
        maxWidth,
        imageAspectRatio,
        fallbackAspectRatio,
        key
    );
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode;
}
