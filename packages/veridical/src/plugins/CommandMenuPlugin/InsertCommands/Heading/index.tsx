import { INSERT_HEADING_NODE } from '@/commands';
import { H1Icon, H2Icon, H3Icon } from '@/components/Icons';
import { $getHighestSelectedNode } from '@/utils/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { Command } from 'cmdk';
import {
    $createTextNode,
    $isParagraphNode,
    COMMAND_PRIORITY_LOW,
    LexicalNode,
} from 'lexical';
import React, { useEffect } from 'react';

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

export function RegisterInsertHeadingCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_HEADING_NODE,
            ({ headingTag, node }) => {
                let selectedNode: LexicalNode | null = null;

                if (node) {
                    selectedNode = node;
                } else {
                    selectedNode = $getHighestSelectedNode();
                }
                if (!selectedNode) return false;

                const heading = $createHeadingNode(headingTag);
                const textNode = $createTextNode();
                heading.append(textNode);
                if (
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(heading);
                } else {
                    selectedNode.insertAfter(heading);
                }
                heading.select(0, 0);

                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);

    return null;
}

export function InsertHeading1Command({
    icon,
    name = 'Heading 1',
    description = 'Title level heading',
    classNames,
}: CommandItemProps) {
    const [editor] = useLexicalComposerContext();

    function handleSelect() {
        editor.dispatchCommand(INSERT_HEADING_NODE, { headingTag: 'h1' });
    }

    return (
        <Command.Item
            value={name + ' ' + description}
            onSelect={handleSelect}
            className={classNames?.root}
        >
            <div>
                {icon || <H1Icon size="lg" className={classNames?.icon} />}
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

export function InsertHeading2Command({
    icon,
    name = 'Heading 2',
    description = 'Second Level Heading',
    classNames,
}: CommandItemProps) {
    const [editor] = useLexicalComposerContext();

    function handleSelect() {
        editor.dispatchCommand(INSERT_HEADING_NODE, { headingTag: 'h2' });
    }

    return (
        <Command.Item
            value={name + ' ' + description}
            onSelect={handleSelect}
            className={classNames?.root}
        >
            <div>
                {icon || <H2Icon size="lg" className={classNames?.icon} />}
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

export function InsertHeading3Command({
    icon,
    name = 'Heading 3',
    description = 'Third level heading',
    classNames,
}: CommandItemProps) {
    const [editor] = useLexicalComposerContext();

    function handleSelect() {
        editor.dispatchCommand(INSERT_HEADING_NODE, { headingTag: 'h3' });
    }

    return (
        <Command.Item
            value={name + ' ' + description}
            onSelect={handleSelect}
            className={classNames?.root}
        >
            <div>
                {icon || <H3Icon size="lg" className={classNames?.icon} />}
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
