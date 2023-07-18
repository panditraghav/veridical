import { INSERT_CODE_NODE } from '@/commands';
import { CodeIcon } from '@/components/Icons';
import { $getHighestSelectedNode } from '@/utils/selection';
import { $createCodeNode } from '@lexical/code';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Command } from 'cmdk';
import { $isParagraphNode, COMMAND_PRIORITY_LOW, LexicalNode } from 'lexical';
import React, { useEffect } from 'react';

export function RegisterInsertCodeCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            INSERT_CODE_NODE,
            ({ node, language }) => {
                let selectedNode: LexicalNode | null = null;

                if (node) {
                    selectedNode = node;
                } else {
                    selectedNode = $getHighestSelectedNode();
                }
                if (!selectedNode) return false;

                const code = $createCodeNode(language);
                if (
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(code);
                } else {
                    selectedNode.insertAfter(code);
                }
                code.select(0, 0);

                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    });
    return null;
}

type CommandItemProps = {
    name?: string;
    description?: string;
    icon?: React.ReactNode;
    classNames?: {
        root?: string;
        icon?: string;
        text?: {
            root?: string;
            title?: string;
            description?: string;
        };
    };
};

export function InsertCodeCommand({
    name = 'Code',
    description = 'Insert code block',
    icon,
    classNames,
}: CommandItemProps) {
    const [editor] = useLexicalComposerContext();

    function handleSelect() {
        editor.dispatchCommand(INSERT_CODE_NODE, {});
    }

    return (
        <Command.Item
            onSelect={handleSelect}
            className={classNames?.root}
            value={name + ' ' + description}
        >
            <div>
                {icon || <CodeIcon size="lg" className={classNames?.icon} />}
            </div>
            <div className={classNames?.text?.root}>
                <div className={classNames?.text?.title}>{name}</div>
                <div className={classNames?.text?.description}>
                    {description}
                </div>
            </div>
        </Command.Item>
    );
}
