import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { $isLinkNode, LinkNode } from '@lexical/link';

type DialogStyle = {
    left?: number;
    top?: number;
};

function useStyle(
    linkNode: LinkNode | null,
    editor: LexicalEditor,
): DialogStyle {
    const [style, setStyle] = useState<DialogStyle>({});

    useEffect(() => {
        if (linkNode) {
            const linkElement = editor.getElementByKey(linkNode.getKey());
            if (!linkElement) return;

            const { bottom, left } = linkElement.getBoundingClientRect();

            setStyle({
                top: bottom + window.scrollY,
                left: left,
            });
        } else {
            setStyle({});
        }
    }, [linkNode, editor]);

    return style;
}

export default function OpenLinkPlugin() {
    const [editor] = useLexicalComposerContext();
    const [linkNode, setLinkNode] = useState<LinkNode | null>(null);
    const [link, setLink] = useState<string>('');
    const dialogStyle = useStyle(linkNode, editor);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;
                if (!(selection.anchor.offset === selection.focus.offset))
                    return;

                const selectedNode = selection.getNodes()[0];
                const parentNode = selectedNode.getParent();

                if ($isLinkNode(parentNode)) {
                    setLinkNode(parentNode);
                    setLink(parentNode.getURL());
                } else if ($isLinkNode(selectedNode)) {
                    setLinkNode(selectedNode);
                    setLink(selectedNode.getURL());
                } else {
                    setLinkNode(null);
                    setLink('');
                }
            });
        });
    });
    if (!linkNode) return null;

    return (
        <a
            href={link}
            style={{ ...dialogStyle, position: 'absolute' }}
            target="_blank"
            rel="noreferrer"
        >
            {link}
        </a>
    );
}
