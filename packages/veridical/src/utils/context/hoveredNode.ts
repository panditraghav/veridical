import { LexicalNode } from 'lexical';
import React, { useContext } from 'react';

export interface IHoveredNodeContext {
    hoveredDOMNode: HTMLElement | null;
    hoveredLexicalNode: LexicalNode | null;
}

export const HoveredNodeContext = React.createContext<IHoveredNodeContext>({
    hoveredDOMNode: null,
    hoveredLexicalNode: null,
});

export function useHoveredNode() {
    return useContext(HoveredNodeContext);
}
