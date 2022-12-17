import React, { useCallback, useEffect, useRef, useState } from "react";
import { LexicalNode, LexicalEditor } from "lexical";
import { NodeOption } from "./DefaultNodeOptions";
import { useVeridicalTheme } from "@veridical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Option from "./Option";

interface NodeOptionsProps {
    searchText: string;
    selectedNode: LexicalNode;
    nodeOptions: NodeOption[];
    onClose: () => void;
}

function useSorteNodeOptions(nodeOptions: NodeOption[], searchText: string) {
    const [sortedNodeOptions, setSortedNodeOptions] = useState(nodeOptions);
    useEffect(() => {
        setSortedNodeOptions((options) => {
            let filteredOptions = options.filter((value) => {
                return (
                    value.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    value.shortName
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    value.description
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            });
            filteredOptions.sort((a, b) => {
                const indexA = nodeOptions.findIndex((v) => v.name === a.name);
                const indexB = nodeOptions.findIndex((v) => v.name === b.name);
                return indexA - indexB;
            });
            return [...new Set([...filteredOptions, ...nodeOptions])];
        });
    }, [searchText]);

    return [sortedNodeOptions];
}

export default function NodeOptions({
    searchText,
    selectedNode,
    nodeOptions,
    onClose,
}: NodeOptionsProps) {
    const theme = useVeridicalTheme();
    const [sortedNodeOptions] = useSorteNodeOptions(nodeOptions, searchText);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        setSelectedOptionIndex(0);
    }, [sortedNodeOptions]);

    useEffect(() => {
        function keydownListener(ev: KeyboardEvent) {
            switch (ev.key) {
                case "ArrowDown":
                    setSelectedOptionIndex((index) => {
                        if (index === sortedNodeOptions.length - 1) {
                            return 0;
                        }
                        return index + 1;
                    });
                    break;
                case "ArrowUp":
                    setSelectedOptionIndex((index) => {
                        if (index === 0) {
                            return sortedNodeOptions.length - 1;
                        }
                        return index - 1;
                    });
                    break;
                case "Enter":
                    ev.preventDefault();
                    editor.update(() => {
                        sortedNodeOptions[selectedOptionIndex].nodeCreator(
                            selectedNode
                        );
                        onClose();
                    });
                    break;
            }
        }
        document.addEventListener("keydown", keydownListener);
        return () => document.removeEventListener("keydown", keydownListener);
    }, [sortedNodeOptions, selectedNode, selectedOptionIndex]);

    return (
        <div className={theme?.addNodeDialog?.nodeOptions}>
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