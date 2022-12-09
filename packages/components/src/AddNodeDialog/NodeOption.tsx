import React from "react";
import type { NodeCreator, AddNodeOption } from "./addNodeOptions";
import { VeridicalThemeClasses, useVeridicalTheme } from "@veridical/utils";

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
    selectedOption,
    createNode,
}: {
    option: AddNodeOption;
    selectedOption: AddNodeOption;
    createNode: (creator: NodeCreator) => void;
}) {
    const theme = useVeridicalTheme();
    return (
        <div
            key={option.name}
            className={`${theme?.addNodeDialog?.nodeOption?.container} ${
                selectedOption.name === option.name
                    ? `${theme?.addNodeDialog?.nodeOption?.selected}`
                    : ""
            }`}
            onClick={() => createNode(option.creator)}
            style={{
                backgroundColor:
                    selectedOption.name === option.name
                        ? `${theme?.addNodeDialog?.nodeOption?.selected}`
                        : "",
            }}
        >
            <div className={theme?.addNodeDialog?.nodeOption?.image}>
                {option.image}
            </div>
            <div className={theme?.addNodeDialog?.nodeOption?.text?.container}>
                <div className={theme?.addNodeDialog?.nodeOption?.text?.name}>
                    {option.name}
                </div>
                <div
                    className={
                        theme?.addNodeDialog?.nodeOption?.text?.description
                    }
                >
                    {option.description}
                </div>
            </div>
        </div>
    );
}
