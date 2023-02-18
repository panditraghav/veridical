import React, { useState, useEffect } from 'react';
import { COMMAND_PRIORITY_EDITOR, LexicalNode } from 'lexical';
import { useVeridicalTheme, ADD_NODE_DIALOG_COMMAND } from '@veridical/utils';
import NodeOptions from './NodeOptions';
import { defaultNodeOptions } from './DefaultNodeOptions';
import type { NodeOption } from './DefaultNodeOptions';
import { Dialog } from '@veridical/components';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function AddNodeDialogPlugin({
    nodeOptions = defaultNodeOptions,
    container,
}: {
    nodeOptions?: NodeOption[];
    container: DocumentFragment | Element;
}) {
    const [editor] = useLexicalComposerContext();
    const [selectedNode, setSelectedNode] = useState<
        LexicalNode | null | undefined
    >(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const theme = useVeridicalTheme();

    useEffect(() => {
        setSearchText('');
    }, [isOpen]);

    function onClose() {
        setIsOpen(false);
    }

    useEffect(() => {
        function escapeListener(ev: KeyboardEvent) {
            if (ev.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', escapeListener);
        return () => document.removeEventListener('keydown', escapeListener);
    });

    useEffect(() => {
        return editor.registerCommand(
            ADD_NODE_DIALOG_COMMAND,
            ({ selectedNode }) => {
                if (selectedNode) {
                    setSelectedNode(selectedNode);
                    setIsOpen(true);
                } else {
                    onClose();
                    setSelectedNode(null);
                }
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, []);

    return (
        <Dialog
            showDialog={isOpen}
            onClose={onClose}
            width="auto"
            height="auto"
            container={container}
        >
            <input
                placeholder="Search"
                type="text"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                className={theme?.addNodeDialog?.searchInput}
                autoFocus
            />
            <NodeOptions
                onClose={onClose}
                searchText={searchText}
                selectedNode={selectedNode}
                nodeOptions={nodeOptions}
            />
        </Dialog>
    );
}

export type { NodeOption };
