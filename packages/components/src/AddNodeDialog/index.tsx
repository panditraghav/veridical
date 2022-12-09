import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import {
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    COMMAND_PRIORITY_EDITOR,
    LexicalEditor,
    LexicalNode,
} from "lexical";

import { useBackdropClose , useVeridicalTheme} from "@veridical/utils";
import { defaultAddNodeOptions } from "./addNodeOptions";
import type { NodeCreator, AddNodeOption } from "./addNodeOptions";
import type { NodeOptionStyle } from "./NodeOption";
import NodeOption from "./NodeOption";
import { DialogAnimation, Backdrop } from "..";

export type AddNodeDialogProps = {
    editor: LexicalEditor;
    isOpen: boolean;
    onClose: () => void;
    lexicalNode: LexicalNode | null;
    addNodeOptions?: AddNodeOption[];
};

export default function AddNodeDialog({
    editor,
    onClose,
    lexicalNode,
    addNodeOptions = defaultAddNodeOptions,
    isOpen,
}: AddNodeDialogProps) {
    const theme = useVeridicalTheme();
    const [searchText, setSearchText] = useState("");
    const [orderedNodeOptions, setOrderedNodeOptions] =
        useState(addNodeOptions);
    const [selectedOption, setSelectedOption] = useState(addNodeOptions[0]);
    const [selectedNode, setSelectedNode] = useState<LexicalNode | null>(
        lexicalNode
    );

    useEffect(() => {
        setSearchText("");
        setOrderedNodeOptions(addNodeOptions);
        setSelectedOption(addNodeOptions[0]);
        setSelectedNode(lexicalNode);
    }, [isOpen]);

    useEffect(() => {
        if (lexicalNode && !selectedNode) {
            setSelectedNode(lexicalNode);
        }
    }, [lexicalNode]);

    const createNode = useCallback(
        (creator: NodeCreator) => {
            if (!selectedNode) throw Error("No node is selected");
            editor.update(() => {
                creator(selectedNode);
            });
            onClose();
        },
        [editor, selectedNode]
    );

    useEffect(() => {
        if (!isOpen) return;
        const keyPressListener = (ev: KeyboardEvent) => {
            let selectedOptionIndex = orderedNodeOptions.findIndex((option) => {
                return option.name === selectedOption.name;
            });

            switch (ev.key) {
                case "Escape":
                    onClose();
                    break;
                case "Enter":
                    createNode(selectedOption.creator);
                    onClose();
                    ev.preventDefault();
                    break;
                case "ArrowDown":
                    if (
                        selectedOptionIndex + 1 < orderedNodeOptions.length &&
                        selectedOptionIndex !== -1
                    ) {
                        setSelectedOption(
                            orderedNodeOptions[selectedOptionIndex + 1]
                        );
                    }
                    break;
                case "ArrowUp":
                    if (
                        selectedOptionIndex - 1 >= 0 &&
                        selectedOptionIndex !== -1
                    ) {
                        setSelectedOption(
                            orderedNodeOptions[selectedOptionIndex - 1]
                        );
                    }
                    break;
            }
        };
        document.addEventListener("keydown", keyPressListener);
        return () => document.removeEventListener("keydown", keyPressListener);
    }, [selectedOption, isOpen]);

    useEffect(() => {
        let searchedTerm = orderedNodeOptions.filter((option) => {
            const name = option.name.toLowerCase();
            const st = searchText.toLowerCase();
            const shortName = option.shortName.toLowerCase();
            return name.includes(st) || shortName.includes(st);
        });
        let optionSet = new Set([...searchedTerm, ...orderedNodeOptions]);
        let orderedOptions = new Array(...optionSet);

        setOrderedNodeOptions(orderedOptions);
        setSelectedOption(orderedOptions[0]);
    }, [searchText]);

    if (!isOpen) return null;
    return createPortal(
        <Backdrop onClose={onClose}>
            <DialogAnimation>
                <div
                    className={`${theme?.addNodeDialog?.dialog} ${theme?.dialog?.dialog}`}
                >
                    <input
                        className={theme?.addNodeDialog?.searchInput}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        autoFocus
                        type="search"
                        placeholder="Search.."
                    />
                    <div>
                        {orderedNodeOptions.map((option) => {
                            return (
                                <NodeOption
                                    key={option.name}
                                    option={option}
                                    selectedOption={selectedOption}
                                    createNode={createNode}
                                />
                            );
                        })}
                    </div>
                </div>
            </DialogAnimation>
        </Backdrop>,
        document.body
    );
}
