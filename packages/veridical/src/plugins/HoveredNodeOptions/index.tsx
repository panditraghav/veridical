import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Offset, useHoveredNode } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

type Position = {
    left: number;
    top: number;
};

function getAnchorPosition(
    hoveredDOMNode: HTMLElement | null,
): Position | undefined {
    if (!hoveredDOMNode) return;

    const { left, top } = hoveredDOMNode.getBoundingClientRect();
    return {
        left,
        top: top + window.scrollY,
    };
}

export function HoveredNodeOptions({
    children,
    className,
    container,
    offset,
}: {
    children?: React.ReactNode;
    className?: string;
    container?: HTMLElement;
    offset?: Offset;
}) {
    const { hoveredDOMNode } = useHoveredNode();
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    function positionAnchor(position?: Position) {
        const anchor = anchorRef.current;
        if (!anchor || !position) return;

        const cRect = container?.getBoundingClientRect();

        anchor.style.left = `${position.left - (cRect?.left || 0)}px`;
        anchor.style.top = `${
            position.top + window.scrollY - (cRect?.top || 0)
        }px`;
    }

    useEffect(() => {
        if (hoveredDOMNode) {
            setOpen(true);
            positionAnchor(getAnchorPosition(hoveredDOMNode));
        } else {
            setOpen(false);
        }
    }, [hoveredDOMNode, offset]);

    useEffect(() => {
        return editor.registerUpdateListener(({ dirtyElements }) => {
            if (dirtyElements.get('root')) {
                setOpen(false);
            }
        });
    }, [editor]);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Anchor
                ref={anchorRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                }}
            />
            <Popover.Portal container={container}>
                <Popover.Content
                    side="left"
                    align="start"
                    onOpenAutoFocus={(ev) => ev.preventDefault()}
                    className={className}
                >
                    {children}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

export * from './AddNodeButton';
export * from './DraggableNodeButton';
