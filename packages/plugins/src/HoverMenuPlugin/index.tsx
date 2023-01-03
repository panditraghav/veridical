import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { $getNodeByKey, LexicalEditor, LexicalNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
    getHoveredDOMNode,
    isHTMLElement,
    Offset,
    useVeridicalTheme,
    VeridicalThemeClasses,
} from "@veridical/utils";
import { useHoverMenuContext, hoverMenuContext } from "./hoverMenuContext";

function isOverlay(ev: MouseEvent): boolean {
    let target: HTMLElement | null = ev.target as HTMLElement;
    while (target) {
        if (target.getAttribute("data-type") === "overlay") return true;
        target = target.parentElement;
    }
    return false;
}

function useHoverMenuPlugin(
    editor: LexicalEditor,
    children?: React.ReactNode,
    offset?: Offset
) {
    const hoverMenuRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();
    const [hoveredDOMNode, setHoveredDOMNode] = useState<HTMLElement | null>(
        null
    );
    const [hoveredLexicalNode, setHoveredLexicalNode] =
        useState<LexicalNode | null>(null);

    useEffect(() => {
        function mouseEventListener(ev: MouseEvent) {
            if (isOverlay(ev)) return;
            const { lexicalDOMNode: domNode, key: nodeKey } = getHoveredDOMNode(
                ev,
                editor,
                offset
            );
            setHoveredDOMNode(domNode);
            editor.update(() => {
                if (!nodeKey) return;
                const lexicalNode = $getNodeByKey(nodeKey);
                setHoveredLexicalNode(lexicalNode);
            });
        }
        document.addEventListener("mousemove", mouseEventListener);
        return () =>
            document.removeEventListener("mousemove", mouseEventListener);
    });

    return createPortal(
        <hoverMenuContext.Provider
            value={{ hoveredDOMNode, hoveredLexicalNode }}
        >
            {children}
        </hoverMenuContext.Provider>,
        document.body
    );
}

export function HoverMenuPlugin({
    children,
    offset,
}: {
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const [editor] = useLexicalComposerContext();
    return useHoverMenuPlugin(editor, children, offset);
}

export { useHoverMenuContext, hoverMenuContext };
