import React, { useEffect, useState, useCallback, useRef } from "react";
import { DragIcon } from "../../Icons";
import { createPortal } from "react-dom";
import useMouse from "../../hooks/useMouse";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getNearestNodeFromDOMNode,
    $getNodeByKey,
    $getSelection,
    COMMAND_PRIORITY_HIGH,
    DRAGOVER_COMMAND,
    DROP_COMMAND,
    LexicalEditor,
    LexicalNode,
    $isRangeSelection,
} from "lexical";
import {
    getHoveredDOMNode,
    Offset,
    isAboveOrBelowCenter,
    isHTMLElement,
} from "../../utils";
import { mergeRegister } from "@lexical/utils";
import { useHoverMenuContext } from "../../context/hoverMenuContext";

const LEFT_OFFSET = -25;
const TOP_OFFSET = 4;
const DRAG_DATA_FORMAT = "application/x-rb-editor-drag";

function setTragetLinePosition(
    ev: DragEvent,
    editor: LexicalEditor,
    targetLine: HTMLDivElement | null
) {
    const targetLexicalDOMNode = getHoveredDOMNode(ev, editor, {
        left: LEFT_OFFSET,
    });
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
            targetLine.style.top = `${top + height + window.scrollY}px`;
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

function setDragImage(dt: DataTransfer, draggedElement: HTMLElement) {
    dt.setDragImage(draggedElement, 0, 0);
}

function TargetLine({
    targetLineRef,
}: {
    targetLineRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
    return createPortal(
        <div
            style={{ height: 2, background: "black", position: "absolute" }}
            ref={targetLineRef}
            className="target-line"
        />,
        document.body
    );
}

function useDragAndDropButton(editor: LexicalEditor) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const targetLineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDragOver(ev: DragEvent) {
            ev.preventDefault();
            setTragetLinePosition(ev, editor, targetLineRef.current);
            return true;
        }

        function onDrop(ev: DragEvent) {
            const dt = ev.dataTransfer;
            const target = getHoveredDOMNode(ev, editor, { left: LEFT_OFFSET });

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
        if (!dt || !hoveredDOMNode) return;

        setDragImage(dt, hoveredDOMNode);
        let nodeKey = "";
        if (hoveredLexicalNode) nodeKey = hoveredLexicalNode.__key;

        dt.setData(DRAG_DATA_FORMAT, nodeKey);
    }

    function onDragEnd() {
        removeTargetLine(targetLineRef.current);
    }

    return (
        <>
            <div
                style={{
                    cursor: "pointer",
                }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                draggable={true}
            >
                <DragIcon size="base" style={{ padding: 0, margin: 0 }} />
            </div>
            <TargetLine targetLineRef={targetLineRef} />
        </>
    );
}
export default function DragAndDropButtonPlugin() {
    const [editor] = useLexicalComposerContext();
    return useDragAndDropButton(editor);
}
