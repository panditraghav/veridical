import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop";
import DialogAnimation from "../DialogAnimation";
import { LexicalNode } from "lexical";
import { useVeridicalTheme } from "@veridical/utils";
import NodeOptions from "./NodeOptions";
import { defaultNodeOptions } from "./DefaultNodeOptions";
import type { NodeOption } from "./DefaultNodeOptions";
import OverlayContainer from "../OverlayContainer";

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
    const [searchText, setSearchText] = useState("");
    const theme = useVeridicalTheme();

    useEffect(() => {
        setSearchText("");
    }, [isOpen]);

    useEffect(() => {
        function escapeListener(ev: KeyboardEvent) {
            if (ev.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", escapeListener);
        return () => document.removeEventListener("keydown", escapeListener);
    });

    if (!isOpen) return null;
    return createPortal(
        <OverlayContainer>
            <Backdrop onClose={onClose}>
                <DialogAnimation>
                    <div className={theme?.addNodeDialog?.dialog}>
                        <input
                            placeholder="Search"
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={theme?.addNodeDialog?.searchInput}
                            autoFocus
                        />
                        <NodeOptions
                            onClose={onClose}
                            searchText={searchText}
                            selectedNode={selectedNode}
                            nodeOptions={nodeOptions}
                        />
                    </div>
                </DialogAnimation>
            </Backdrop>
        </OverlayContainer>,
        document.body
    );
}

export type { NodeOption };
