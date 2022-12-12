import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isNodeSelection, LexicalEditor } from "lexical";
import { $isImageNode, ImageNode } from "@veridical/nodes";
import { isHTMLElement, useVeridicalTheme } from "@veridical/utils";
import { useHoverMenuContext } from "..";

function isHtmlImageElement(x: any): x is HTMLImageElement {
    return x instanceof HTMLImageElement;
}

interface HolderStyle {
    left: number;
    top: number;
    height: number;
    display: "none" | "flex";
}

const holderWidth = 8;
const initialHolderStyle: HolderStyle = {
    left: -100,
    top: -100,
    height: 0,
    display: "none",
};

function Holder({
    style,
    onResize,
    type,
}: {
    style: HolderStyle;
    onResize: (clientX: number, type: "left" | "right") => void;
    type: "left" | "right";
}) {
    const [initialPosition, setInitialPosition] = useState(0);
    const theme = useVeridicalTheme();

    function onDragStart(ev: React.DragEvent<HTMLDivElement>) {
        const dt = ev.dataTransfer;
        const img = new Image();
        setInitialPosition(ev.clientX);

        dt.setDragImage(img, 10, 10);
    }
    function onDrag(ev: React.DragEvent<HTMLDivElement>) {
        onResize(ev.screenX, type);
    }
    return (
        <div
            draggable={true}
            onDragStart={onDragStart}
            onDrag={onDrag}
            className={theme?.imageResizer?.container}
            style={{
                position: "absolute",
                width: holderWidth,
                cursor: "e-resize",
                ...style,
            }}
        >
            <div className={theme?.imageResizer?.paddle}></div>
        </div>
    );
}

function Resizer({
    imageNode,
    maxWidth,
    editor,
}: {
    imageNode?: ImageNode | null;
    maxWidth: number;
    editor: LexicalEditor;
}) {
    const [leftHolderStyle, setLeftHolderStyle] =
        useState<HolderStyle>(initialHolderStyle);
    const [rightHolderStyle, setRightHolderStyle] =
        useState<HolderStyle>(initialHolderStyle);

    const [imageContainer, setImageContainer] = useState<HTMLElement | null>(
        null
    );
    const [domImageNode, setDomImageNode] = useState<HTMLImageElement | null>(
        null
    );

    function setHolderPositions(domImageNode: HTMLImageElement | null) {
        if (!domImageNode) return;
        const { width, height, y, x } = domImageNode.getBoundingClientRect();
        const rightStyle: HolderStyle = {
            left: width + x,
            top: y + window.scrollY,
            height,
            display: "flex",
        };
        const leftStyle: HolderStyle = {
            left: x,
            top: y + window.scrollY,
            height,
            display: "flex",
        };
        setLeftHolderStyle(leftStyle);
        setRightHolderStyle(rightStyle);
    }

    useEffect(() => {
        if (!imageNode) {
        }
    }, [imageNode]);
    useEffect(() => {
        if (!imageNode) {
            const invisibleStyle: HolderStyle = {
                left: -100,
                top: -100,
                height: 0,
                display: "none",
            };
            setLeftHolderStyle(invisibleStyle);
            setRightHolderStyle(invisibleStyle);
            setDomImageNode(null);
            return;
        }
        const domImageContainer = editor.getElementByKey(imageNode.getKey());
        const domImageNode = domImageContainer?.firstElementChild;
        if (!domImageContainer || !isHtmlImageElement(domImageNode)) return;

        setImageContainer(domImageContainer);
        setDomImageNode(domImageNode);
    }, [imageNode]);

    useEffect(() => {
        if (!domImageNode) return;
        setHolderPositions(domImageNode);

        function windowResizeListener() {
            setHolderPositions(domImageNode);
        }

        window.addEventListener("resize", windowResizeListener);

        return () => {
            window.removeEventListener("resize", windowResizeListener);
        };
    }, [domImageNode]);

    function onResize(clientX: number, type: "left" | "right") {
        if (!imageContainer || !imageNode) return;
        setHolderPositions(domImageNode);
        const { left: leftEdge, width } =
            imageContainer.getBoundingClientRect();
        const rightEdge = leftEdge + width;

        editor.update(() => {
            let width;
            switch (type) {
                case "right":
                    width = clientX - leftEdge;
                    if (width > maxWidth) return;
                    imageNode.setMaxWidth(width);
                    break;
                case "left":
                    width = leftEdge - clientX;
                    if (width > maxWidth) return;
                    imageNode.setMaxWidth(width);
                    break;
            }
        });
    }

    return createPortal(
        <>
            <Holder type="left" onResize={onResize} style={leftHolderStyle} />
            <Holder
                type="right"
                onResize={onResize}
                style={{
                    ...rightHolderStyle,
                    left: rightHolderStyle.left - holderWidth,
                }}
            />
        </>,
        document.body
    );
}

export default function ImageResizerPlugin({ maxWidth }: { maxWidth: number }) {
    const [editor] = useLexicalComposerContext();
    const { hoveredLexicalNode } = useHoverMenuContext();
    const [imageNode, setImageNode] = useState<ImageNode | null>(null);
    useEffect(() => {
        if ($isImageNode(hoveredLexicalNode)) {
            setImageNode(hoveredLexicalNode);
        } else {
            setImageNode(null);
        }
    }, [hoveredLexicalNode]);
    return (
        <Resizer maxWidth={maxWidth} imageNode={imageNode} editor={editor} />
    );
}
