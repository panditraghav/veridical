import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getNearestNodeFromDOMNode,
    $getNodeByKey,
    COMMAND_PRIORITY_HIGH,
    DRAGOVER_COMMAND,
    DROP_COMMAND,
    LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';

import {
    getHoveredDOMNode,
    isAboveOrBelowCenter,
    isHTMLElement,
    useHoveredNode,
} from '@/utils';

const LEFT_OFFSET = -25;
const DRAG_DATA_FORMAT = 'application/x-veridical-drag';

function setTragetLinePosition(
    ev: DragEvent,
    editor: LexicalEditor,
    targetLine: HTMLDivElement | null,
    leftOffset: number = LEFT_OFFSET,
) {
    const { lexicalDOMNode: targetLexicalDOMNode } = getHoveredDOMNode(
        ev,
        editor,
        {
            left: leftOffset,
        },
    );
    if (!targetLexicalDOMNode || !targetLine) return;
    const { top, width, height, left } =
        targetLexicalDOMNode.getBoundingClientRect();

    targetLine.style.display = 'block';
    targetLine.style.left = `${left}px`;
    targetLine.style.width = `${width}px`;

    switch (isAboveOrBelowCenter(ev, targetLexicalDOMNode)) {
        case 'above':
            targetLine.style.top = `${top + window.scrollY}px`;
            break;
        case 'below':
            targetLine.style.top = `${top + height + window.scrollY}px`;
            break;
    }
}

function removeTargetLine(targetLine: HTMLDivElement | null) {
    if (!targetLine) return;
    targetLine.style.display = 'none';
    targetLine.style.width = '0px';
    targetLine.style.height = '0px';
}

function setDragImage(dt: DataTransfer, draggedElement: HTMLElement) {
    dt.setDragImage(draggedElement, 0, 0);
}

const TargetLine = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className }, ref) => {
        return createPortal(
            <div
                ref={ref}
                style={{ position: 'absolute' }}
                className={className}
            />,
            document.body,
        );
    },
);
TargetLine.displayName = 'TargetLine';

export function DraggableNodeButton({
    children,
    classNames,
    leftOffset = LEFT_OFFSET,
}: {
    classNames?: {
        targetLine?: string;
        button?: string;
    };
    leftOffset?: number;
    children?: React.ReactNode;
}) {
    const [editor] = useLexicalComposerContext();
    const { hoveredDOMNode, hoveredLexicalNode } = useHoveredNode();
    const targetLineRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback(
        (ev: DragEvent) => {
            console.log(targetLineRef.current);
            ev.preventDefault();
            if (!isDragging) return false;
            setTragetLinePosition(
                ev,
                editor,
                targetLineRef.current,
                leftOffset,
            );
            return true;
        },
        [editor, isDragging],
    );

    const onDrop = useCallback(
        (ev: DragEvent) => {
            const dt = ev.dataTransfer;
            const { lexicalDOMNode: target } = getHoveredDOMNode(ev, editor, {
                left: leftOffset,
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
                    case 'below':
                        targetNode.insertAfter(draggedNode);
                        break;
                    case 'above':
                        targetNode.insertBefore(draggedNode);
                        break;
                    default:
                        targetNode.insertAfter(draggedNode);
                        break;
                }
            });
            return true;
        },
        [editor, leftOffset],
    );

    function onDragStart(ev: React.DragEvent<HTMLButtonElement>) {
        const dt = ev.dataTransfer;
        if (!dt || !hoveredDOMNode) return;
        setIsDragging(true);

        setDragImage(dt, hoveredDOMNode);
        let nodeKey = '';
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
                COMMAND_PRIORITY_HIGH,
            ),
            editor.registerCommand(DROP_COMMAND, onDrop, COMMAND_PRIORITY_HIGH),
        );
    }, [editor, onDragOver, onDrop]);

    return (
        <>
            <button
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                draggable={true}
                tabIndex={-1}
                className={classNames?.button}
            >
                {children}
            </button>
            <TargetLine
                className={classNames?.targetLine}
                ref={targetLineRef}
            />
        </>
    );
}
