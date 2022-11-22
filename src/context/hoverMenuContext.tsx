import { LexicalNode } from "lexical";
import React, { useContext } from "react";

export interface IHoverMenuContext {
    hoveredDOMNode: HTMLElement | null;
    hoveredLexicalNode: LexicalNode | null;
}

export const hoverMenuContext = React.createContext<IHoverMenuContext>({
    hoveredDOMNode: null,
    hoveredLexicalNode: null,
});

export function useHoverMenuContext() {
    return useContext(hoverMenuContext);
}
