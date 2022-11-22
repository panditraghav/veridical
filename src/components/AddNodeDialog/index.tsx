import "./AddNodeDialog.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    COMMAND_PRIORITY_EDITOR,
    LexicalEditor,
    LexicalNode,
} from "lexical";
import {
    NodeCreator,
    AddNodeOption,
    defaultAddNodeOptions,
} from "./addNodeOptions";
import useBackdropClose from "../../hooks/useBackdropClose";
import { createPortal } from "react-dom";

export interface AddNodeDialogStyle {
    backdrop?: string;
    dialog?: string;
    searchInput?: string;
    option?: string;
    optionImage?: string;
    optionText?: string;
    optionName?: string;
    optionDescription?: string;
    optionSelectdBGColor?: string;
}

export interface AddNodeDialogProps {
    editor: LexicalEditor;
    isOpen: boolean;
    onClose: () => void;
    lexicalNode: LexicalNode | null;
    addNodeOptions?: AddNodeOption[];
    style?: AddNodeDialogStyle;
}

function Dialog({
    editor,
    onClose,
    lexicalNode,
    addNodeOptions = defaultAddNodeOptions,
    isOpen,
    style,
}: AddNodeDialogProps) {
    const [searchText, setSearchText] = useState("");
    const [orderedNodeOptions, setOrderedNodeOptions] =
        useState(addNodeOptions);
    const [selectedOption, setSelectedOption] = useState(addNodeOptions[0]);
    const [selectedNode, setSelectedNode] = useState<LexicalNode | null>(
        lexicalNode
    );
    const backdropRef = useRef<HTMLDivElement>();
    useBackdropClose(onClose, backdropRef.current);

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
    }, [selectedOption]);

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

    return createPortal(
        <div
            //@ts-ignore
            ref={backdropRef}
            className={style?.backdrop || "backdrop"}
        >
            <div className={style?.dialog || "dialog"}>
                <div>
                    <input
                        className={style?.searchInput || "searchInput"}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        autoFocus
                        type="text"
                        placeholder="Search.."
                    />
                </div>
                <div>
                    {orderedNodeOptions.map((option) => {
                        return (
                            <div
                                key={option.name}
                                className={style?.option || "nodeOption"}
                                onClick={() => createNode(option.creator)}
                                style={{
                                    backgroundColor:
                                        selectedOption.name === option.name
                                            ? `${
                                                  style?.optionSelectdBGColor ||
                                                  "rgba(0, 0, 0, 0.069)"
                                              }`
                                            : "",
                                }}
                            >
                                <div
                                    className={
                                        style?.optionImage || "nodeOptionImage"
                                    }
                                >
                                    {option.image}
                                </div>
                                <div
                                    className={
                                        style?.optionText || "nodeOptionText"
                                    }
                                >
                                    <div
                                        className={
                                            style?.optionName ||
                                            "nodeOptionName"
                                        }
                                    >
                                        {option.name}
                                    </div>
                                    <div
                                        className={
                                            style?.optionDescription ||
                                            "nodeOptionDescription"
                                        }
                                    >
                                        {option.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function AddNodeDialog({
    editor,
    onClose,
    lexicalNode,
    addNodeOptions = defaultAddNodeOptions,
    style,
    isOpen,
}: AddNodeDialogProps) {
    if (!isOpen) return null;

    return (
        <Dialog
            editor={editor}
            onClose={onClose}
            lexicalNode={lexicalNode}
            addNodeOptions={addNodeOptions}
            style={style}
            isOpen={isOpen}
        />
    );
}

export { AddNodeOption, NodeCreator, defaultAddNodeOptions };
