import React, { useContext } from 'react';
import { VeridicalThemeClasses } from '../theme';

const VeridicalThemeContext = React.createContext<
    VeridicalThemeClasses | null | undefined
>(null);

function useVeridicalTheme(): VeridicalThemeClasses | null | undefined {
    return useContext(VeridicalThemeContext);
}

function VeridicalThemeProvider({
    theme,
    children,
}: {
    theme?: VeridicalThemeClasses;
    children?: React.ReactNode;
}) {
    return (
        <VeridicalThemeContext.Provider value={theme}>
            {children}
        </VeridicalThemeContext.Provider>
    );
}

export { useVeridicalTheme, VeridicalThemeProvider };
