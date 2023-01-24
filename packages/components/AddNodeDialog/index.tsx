import React, { useState, useEffect } from 'react';
import { LexicalNode } from 'lexical';
import { useVeridicalTheme } from '@veridical/utils';
import NodeOptions from './NodeOptions';
import { defaultNodeOptions } from './DefaultNodeOptions';
import type { NodeOption } from './DefaultNodeOptions';
import { Dialog } from '@veridical/components';

interface AddNodeDialogProps {
    isOpen: boolean;
    selectedNode: LexicalNode;
    nodeOptions?: NodeOption[];
    onClose: () => void;
}

export default function AddNodeDialog({
    isOpen,
    selectedNode,
    nodeOptions = defaultNodeOptions,
    onClose,
}: AddNodeDialogProps) {
    const [searchText, setSearchText] = useState('');
    const theme = useVeridicalTheme();

    useEffect(() => {
        setSearchText('');
    }, [isOpen]);

    useEffect(() => {
        function escapeListener(ev: KeyboardEvent) {
            if (ev.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', escapeListener);
        return () => document.removeEventListener('keydown', escapeListener);
    });

    return (
        <Dialog
            showDialog={isOpen}
            onClose={onClose}
            width="auto"
            height="auto"
            anchorElement={document.body}
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
