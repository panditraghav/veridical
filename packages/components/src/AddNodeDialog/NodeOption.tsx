import React from "react";
import type { NodeCreator, AddNodeOption } from "./addNodeOptions";

export type NodeOptionStyle = {
    container?: string;
    image?: string;
    text?: string;
    name?: string;
    description?: string;
    selectedBgColor?: string;
};

export default function NodeOption({
    option,
    style,
    selectedOption,
    createNode,
}: {
    option: AddNodeOption;
    style?: NodeOptionStyle;
    selectedOption: AddNodeOption;
    createNode: (creator: NodeCreator) => void;
}) {
    return (
        <div
            key={option.name}
            className={style?.container || "defaultAddNodeDialog_NodeOption"}
            onClick={() => createNode(option.creator)}
            style={{
                backgroundColor:
                    selectedOption.name === option.name
                        ? `${style?.selectedBgColor || "rgba(0, 0, 0, 0.069)"}`
                        : "",
            }}
        >
            <div
                className={
                    style?.image || "defaultAddNodeDialog_NodeOptionImage"
                }
            >
                {option.image}
            </div>
            <div
                className={style?.text || "defaultAddNodeDialog_NodeOptionText"}
            >
                <div
                    className={
                        style?.name || "defaultAddNodeDialog_NodeOptionName"
                    }
                >
                    {option.name}
                </div>
                <div
                    className={
                        style?.description ||
                        "defaultAddNodeDialog_NodeOptionDescription"
                    }
                >
                    {option.description}
                </div>
            </div>
        </div>
    );
}
