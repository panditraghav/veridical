import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LinkNode, $isLinkNode } from '@lexical/link';
import { $getNodeByKey, $getSelection } from 'lexical';
import { useVeridicalTheme } from '@veridical/utils';

const Y_OFFSET = -35;

type Position = {
    left?: number;
    top?: number;
    display?: 'block' | 'none';
};

function usePosition(linkDomNode: HTMLElement | null): Position {
    const [position, setPosition] = useState<Position>({ display: 'none' });
    useEffect(() => {
        if (linkDomNode) {
            const { left, top } = linkDomNode.getBoundingClientRect();
            setPosition({
                left,
                top: top + window.scrollY + Y_OFFSET,
                display: 'block',
            });
        }
    }, [linkDomNode]);
    return position;
}

export default function AddLinkDialogPlugin() {
    const [editor] = useLexicalComposerContext();
    const [linkNode, setLinkNode] = useState<LinkNode | null>(null);
    const [linkDomNode, setLinkDomNode] = useState<HTMLElement | null>(null);
    const [link, setLink] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const position = usePosition(linkDomNode);
    const theme = useVeridicalTheme()?.addLinkDialog;

    const saveLink = useCallback(() => {
        if (!linkNode) return;
        editor.update(() => {
            linkNode.setURL(link);
        });
    }, [linkNode, link, editor]);

    useEffect(() => {
        if (linkNode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [linkNode, inputRef.current]);

    useEffect(() => {
        return editor.registerMutationListener(LinkNode, (nodes, payload) => {
            nodes.forEach((value, key) => {
                if (value == 'created') {
                    // return when LinkNode is created using editor state (Markdown)
                    if (payload.updateTags.has('history-merge')) return;
                    editor.getEditorState().read(() => {
                        const linkNode = $getNodeByKey(key);
                        if ($isLinkNode(linkNode)) {
                            setLinkNode(linkNode);
                            setLink(linkNode.getURL());
                            setLinkDomNode(editor.getElementByKey(key));
                        }
                    });
                }
            });
        });
    }, [editor]);

    if (!linkNode) return null;
    return (
        <input
            style={{ ...position, position: 'absolute' }}
            ref={inputRef}
            type="url"
            className={theme?.input}
            spellCheck={false}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onBlur={() => {
                saveLink();
                setLinkNode(null);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    saveLink();
                    setLinkNode(null);
                    e.preventDefault();
                }
            }}
        />
    );
}
