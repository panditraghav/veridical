import React, { useEffect, useState, useCallback, useRef } from "react";
import { DragIcon } from "../../Icons";
import { createPortal } from "react-dom";
import useMouse from "../../hooks/useMouse";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getNearestNodeFromDOMNode,
    $getNodeByKey,
    COMMAND_PRIORITY_HIGH,
    DRAGOVER_COMMAND,
    DROP_COMMAND,
    LexicalEditor,
} from "lexical";
import { mergeRegister } from "@lexical/utils";

const LEFT_OFFSET = -25;
const TOP_OFFSET = 4;
const DRAG_DATA_FORMAT = "application/x-rb-editor-drag";

function isHTMLElement(x: unknown): x is HTMLElement {
    return x instanceof HTMLElement;
}

function getTopLevelNodeKey(editor: LexicalEditor): [string] | [] {
    const root = editor.getEditorState()._nodeMap.get("root");
    return root ? root.__children : [];
}

function isMouseInside(element: HTMLElement | null, ev: MouseEvent): boolean {
    if (!element) return false;
    const elementRect = element.getBoundingClientRect();
    const { paddingTop, paddingBottom, marginTop, marginBottom } =
        window.getComputedStyle(element);
    const { x: mouseX, y: mouseY } = ev;
    const {
        x: elementX,
        y: elementY,
        width: elementWidth,
        height: elementHeight,
    } = elementRect;
    if (
        mouseX >= elementX + LEFT_OFFSET &&
        mouseX <= elementX + elementWidth &&
        mouseY >= elementY &&
        mouseY <= elementY + elementHeight
    ) {
        return true;
    }
    return false;
}

function isAboveOrBelowCenter(
    ev: MouseEvent,
    element: HTMLElement
): "above" | "below" {
    const { y: elementY, height: elementHeight } =
        element.getBoundingClientRect();
    const { y: mouseY } = ev;

    const top = elementY;
    const bottom = elementY + elementHeight;
    const center = top + (bottom - top) / 2;

    if (mouseY >= center) {
        return "below";
    } else {
        return "above";
    }
}

function getLexicalDOMNode(
    ev: MouseEvent,
    editor: LexicalEditor
): HTMLElement | null {
    const topKeys = getTopLevelNodeKey(editor);
    let lexicalDOMNode: HTMLElement | null = null;

    for (const key of topKeys) {
        const element = editor.getElementByKey(key);
        if (isMouseInside(element, ev)) {
            lexicalDOMNode = element;
            break;
        }
    }
    return lexicalDOMNode;
}

function setTragetLinePosition(
    ev: DragEvent,
    editor: LexicalEditor,
    targetLine: HTMLDivElement | null
) {
    const targetLexicalDOMNode = getLexicalDOMNode(ev, editor);
    if (!targetLexicalDOMNode || !targetLine) return;
    const { top, width, height, left } =
        targetLexicalDOMNode.getBoundingClientRect();
    switch (isAboveOrBelowCenter(ev, targetLexicalDOMNode)) {
        case "above":
            targetLine.style.display = "block";
            targetLine.style.top = `${top + window.scrollY}px`;
            targetLine.style.left = `${left}px`;
            targetLine.style.width = `${width}px`;
            break;
        case "below":
            targetLine.style.display = "block";
            targetLine.style.top = `${top + window.scrollY + height}px`;
            targetLine.style.left = `${left}px`;
            targetLine.style.width = `${width}px`;
            break;
    }
}

function removeTargetLine(targetLine: HTMLDivElement | null) {
    if (!targetLine) return;
    targetLine.style.display = "none";
    targetLine.style.left = "-1000px";
    targetLine.style.top = "-1000px";
}

function setPositionBeside(
    element: HTMLElement | null,
    dragger: HTMLElement | null
) {
    if (!dragger) return;
    if (!element) {
        dragger.style.display = "none";
        dragger.style.left = `${-1000}px`;
        dragger.style.top = `${-1000}px`;
        return;
    }
    const elementRect = element.getBoundingClientRect();
    const { x: elementX, y: elementY, height } = elementRect;

    dragger.style.display = "block";
    dragger.style.left = `${elementX + LEFT_OFFSET}px`;
    dragger.style.top = `${elementY + TOP_OFFSET + window.scrollY}px`;
}

function setDragImage(dt: DataTransfer, draggedElement: HTMLElement) {
    dt.setDragImage(draggedElement, 0, 0);
}

function Dragger() {
    const [editor] = useLexicalComposerContext();
    const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(
        null
    );

    const dragIconRef = useRef<HTMLDivElement | null>(null);
    const targetLineRef = useRef<HTMLDivElement | null>(null);

    useMouse((ev) => {
        const lexicalDOMNode = getLexicalDOMNode(ev, editor);
        setPositionBeside(lexicalDOMNode, dragIconRef.current);
        setDraggedElement(lexicalDOMNode);
    });

    useEffect(() => {
        function onDragOver(ev: DragEvent) {
            ev.preventDefault();
            setTragetLinePosition(ev, editor, targetLineRef.current);
            return true;
        }

        function onDrop(ev: DragEvent) {
            const dt = ev.dataTransfer;
            const target = getLexicalDOMNode(ev, editor);

            if (!dt || !isHTMLElement(target)) return false;
            const nodeKey = dt.getData(DRAG_DATA_FORMAT);
            editor.update(() => {
                const draggedNode = $getNodeByKey(nodeKey);
                const targetNode = $getNearestNodeFromDOMNode(target);
                if (!targetNode || !draggedNode) return false;

                if (draggedNode === targetNode) return false;

                draggedNode.remove();
                switch (isAboveOrBelowCenter(ev, target)) {
                    case "below":
                        targetNode.insertAfter(draggedNode);
                        break;
                    case "above":
                        targetNode.insertBefore(draggedNode);
                        break;
                    default:
                        targetNode.insertAfter(draggedNode);
                        break;
                }
            });
            return true;
        }
        return mergeRegister(
            editor.registerCommand(
                DRAGOVER_COMMAND,
                onDragOver,
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(DROP_COMMAND, onDrop, COMMAND_PRIORITY_HIGH)
        );
    }, [editor]);

    function onDragStart(ev: React.DragEvent<HTMLDivElement>) {
        const dt = ev.dataTransfer;
        if (!dt || !draggedElement) return;

        setDragImage(dt, draggedElement);
        let nodeKey = "";

        editor.update(() => {
            const lexicalNode = $getNearestNodeFromDOMNode(draggedElement);
            if (lexicalNode) {
                nodeKey = lexicalNode.getKey();
            }
        });
        dt.setData(DRAG_DATA_FORMAT, nodeKey);
    }

    function onDragEnd() {
        removeTargetLine(targetLineRef.current);
    }

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    padding: 0,
                    margin: 0,
                    left: -100,
                    top: -100,
                    cursor: "pointer",
                }}
                ref={dragIconRef}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                draggable={true}
            >
                <DragIcon size="base" style={{ padding: 0, margin: 0 }} />
            </div>
            <div
                style={{ height: 2, background: "black", position: "absolute" }}
                ref={targetLineRef}
                className="target-line"
            ></div>
        </>
    );
}

export default function DragAndDropPlugin() {
    return createPortal(<Dragger />, document.body);
}
