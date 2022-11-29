import '../styles/globals.css'
import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery} from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
    }
});

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export default function App(props: AppProps) {
    const {Component, pageProps} = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    if ((prefersDarkMode ? 'dark' : 'light') != mode) {
        colorMode.toggleColorMode()
    }

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme({
        ...getDesignTokens(mode),
        typography: {
            fontFamily: 'SourceHanSansSC',
        }
    }), [mode]);

    return (
        <>
            <Head>
                <title>文件站</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}
