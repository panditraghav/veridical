import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

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
import { mergeRegister } from "@lexical/utils";

import {
    getHoveredDOMNode,
    Offset,
    isAboveOrBelowCenter,
    isHTMLElement,
} from "@veridical/utils";
import { DragIcon } from "@veridical/components";
import { useHoverMenuContext } from "@veridical/plugins";

const LEFT_OFFSET = -25;
const TOP_OFFSET = 4;
const DRAG_DATA_FORMAT = "application/x-veridical-drag";

function setTragetLinePosition(
    ev: DragEvent,
    editor: LexicalEditor,
    targetLine: HTMLDivElement | null
) {
    const { lexicalDOMNode: targetLexicalDOMNode } = getHoveredDOMNode(
        ev,
        editor,
        {
            left: LEFT_OFFSET,
        }
    );
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
    className,
}: {
    targetLineRef: React.MutableRefObject<HTMLDivElement | null>;
    className?: string;
}) {
    return createPortal(
        <div
            ref={targetLineRef}
            className={className || "DefaultDraggableNodeButton_targetLine"}
        />,
        document.body
    );
}

function useDraggableNode(
    editor: LexicalEditor,
    style?: DraggableNodeButtonStyle
) {
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const targetLineRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback(
        (ev: DragEvent) => {
            ev.preventDefault();
            if (!isDragging) return false;
            setTragetLinePosition(ev, editor, targetLineRef.current);
            return true;
        },
        [isDragging]
    );

    const onDrop = useCallback(
        (ev: DragEvent) => {
            const dt = ev.dataTransfer;
            const { lexicalDOMNode: target } = getHoveredDOMNode(ev, editor, {
                left: LEFT_OFFSET,
            });

            if (!dt || !isHTMLElement(target)) return false;
            setIsDragging(false);
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
        },
        [editor]
    );

    function onDragStart(ev: React.DragEvent<HTMLDivElement>) {
        const dt = ev.dataTransfer;
        if (!dt || !hoveredDOMNode) return;
        setIsDragging(true);

        setDragImage(dt, hoveredDOMNode);
        let nodeKey = "";
        if (hoveredLexicalNode) nodeKey = hoveredLexicalNode.__key;

        dt.setData(DRAG_DATA_FORMAT, nodeKey);
    }

    function onDragEnd() {
        removeTargetLine(targetLineRef.current);
    }

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                DRAGOVER_COMMAND,
                onDragOver,
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(DROP_COMMAND, onDrop, COMMAND_PRIORITY_HIGH)
        );
    }, [editor, onDragOver, onDrop]);

    return (
        <>
            <div
                className={
                    style?.iconContainer ||
                    "DefaultDraggableNodeButton_iconContainer"
                }
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                draggable={true}
            >
                <DragIcon
                    size="base"
                    className={
                        style?.dragIcon || "DefaultDraggableNodeButton_dragIcon"
                    }
                />
            </div>
            <TargetLine
                className={
                    style?.targetLine || "DefaultDraggableNodeButton_targetLine"
                }
                targetLineRef={targetLineRef}
            />
        </>
    );
}
export type DraggableNodeButtonStyle = {
    iconContainer?: string;
    dragIcon?: string;
    targetLine?: string;
};
export default function DraggableNodeButton({
    style,
}: {
    style?: DraggableNodeButtonStyle;
}) {
    const [editor] = useLexicalComposerContext();
    return useDraggableNode(editor, style);
}
