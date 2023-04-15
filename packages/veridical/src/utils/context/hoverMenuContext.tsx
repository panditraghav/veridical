import { LexicalNode } from 'lexical';
import React, { useContext } from 'react';

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

export function HoverMenuProvider({
    value,
    children,
}: {
    value: IHoverMenuContext;
    children?: React.ReactNode;
}) {
    return (
        <hoverMenuContext.Provider value={value}>
            {children}
        </hoverMenuContext.Provider>
    );
}
