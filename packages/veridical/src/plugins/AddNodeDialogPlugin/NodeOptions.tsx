import React, { useEffect, useState } from 'react';
import { LexicalNode } from 'lexical';
import { NodeOption } from './DefaultNodeOptions';
import { useVeridicalTheme } from '../../utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Option from './Option';

interface NodeOptionsProps {
    searchText: string;
    selectedNode: LexicalNode | null | undefined;
    nodeOptions: NodeOption[];
    onClose: () => void;
}

function useSorteNodeOptions(nodeOptions: NodeOption[], searchText: string) {
    const [sortedNodeOptions, setSortedNodeOptions] = useState(nodeOptions);
    useEffect(() => {
        if (searchText === '') {
            setSortedNodeOptions(nodeOptions);
            return;
        }
        const searchRegex = new RegExp(`^${searchText}`, 'i');
        setSortedNodeOptions((options) => {
            const filteredOptions = options.filter((value) => {
                return (
                    value.name.match(searchRegex) ||
                    value.shortName.match(searchRegex) ||
                    value.description
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            });
            filteredOptions.sort((a, b) => {
                const aMatch = a.name.match(searchRegex);
                const bMatch = b.name.match(searchRegex);
                const aLen = aMatch ? aMatch[0].length : 0;
                const bLen = bMatch ? bMatch[0].length : 0;
                return bLen - aLen;
            });
            return [...new Set([...filteredOptions, ...nodeOptions])];
        });
    }, [nodeOptions, searchText]);

    return [sortedNodeOptions];
}

export default function NodeOptions({
    searchText,
    selectedNode,
    nodeOptions,
    onClose,
}: NodeOptionsProps) {
    const theme = useVeridicalTheme()?.addNodeDialog;
    const [sortedNodeOptions] = useSorteNodeOptions(nodeOptions, searchText);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        setSelectedOptionIndex(0);
    }, [sortedNodeOptions]);

    useEffect(() => {
        function keydownListener(ev: KeyboardEvent) {
            switch (ev.key) {
                case 'ArrowDown':
                    setSelectedOptionIndex((index) => {
                        if (index === sortedNodeOptions.length - 1) {
                            return 0;
                        }
                        return index + 1;
                    });
                    break;
                case 'ArrowUp':
                    setSelectedOptionIndex((index) => {
                        if (index === 0) {
                            return sortedNodeOptions.length - 1;
                        }
                        return index - 1;
                    });
                    break;
                case 'Enter':
                    ev.preventDefault();
                    editor.update(() => {
                        if (!selectedNode) return;
                        sortedNodeOptions[selectedOptionIndex].nodeCreator(
                            selectedNode,
                        );
                        onClose();
                    });
                    break;
            }
        }
        document.addEventListener('keydown', keydownListener);
        return () => document.removeEventListener('keydown', keydownListener);
    }, [sortedNodeOptions, selectedNode, selectedOptionIndex]);

    return (
        <div className={theme?.nodeOptions}>
            {sortedNodeOptions.map((option) => {
                return (
                    <Option
                        key={option.shortName}
                        option={option}
                        selectedNode={selectedNode}
                        isSelected={
                            option.shortName ===
                            sortedNodeOptions[selectedOptionIndex].shortName
                        }
                        editor={editor}
                        onClose={onClose}
                    />
                );
            })}
        </div>
    );
}
