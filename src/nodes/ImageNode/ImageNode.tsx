import {
    DecoratorNode,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    LexicalEditor
} from "lexical";
import React from "react"

import ImageComponent from "./ImageComponent"


type SerializedImageNode = {
    altText: string;
    src: string;
    type: 'image';
    version: 1;
} & SerializedLexicalNode

export interface ImageProps {
    src: string;
    altText: string;
    key?: NodeKey;
}

export class ImageNode extends DecoratorNode<JSX.Element>{
    __src: string;
    __altText: string;

    static getType(): string {
        return "image"
    }

    constructor(
        src: string,
        altText: string,
        key?: NodeKey,
    ) {
        super(key)
        this.__src = src
        this.__altText = altText
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.__key,
            node.__src,
            node.__altText,
        )
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText } = serializedNode
        return $createImageNode({
            src,
            altText,
        })
    }

    exportJSON(): SerializedImageNode {
        return {
            altText: this.getAltText(),
            src: this.getSrc(),
            type: 'image',
            version: 1,
        }
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div")
        const className = config.theme.image

        if (className) div.className = className
        return div
    }

    updateDOM(): false {
        return false
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
        return { element };
    }
    getSrc(): string {
        return this.__src
    }
    setSrc(src: string): void {
        this.getWritable().__src = src
    }

    getAltText() {
        return this.__altText
    }
    setAltText(altText: string): void {
        this.getWritable().__altText = altText
    }

    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
        return (
            <ImageComponent
                src={this.__src}
                alt={this.__altText}
                nodeKey={this.getKey()}
            />
        )
    }

}


export function $createImageNode({
    src,
    altText,
    key,
}: ImageProps): ImageNode {
    return new ImageNode(
        src,
        altText,
        key,
    )
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode
}