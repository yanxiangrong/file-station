import {Head, Html, Main, NextScript} from 'next/document'


export default function Document() {
    return (
        <Html lang={'zh'}>
            <Head>
                {/* PWA primary color */}
                <meta name="theme-color" content={"primary.main"}/>
                <link rel="shortcut icon" href="/favicon.ico"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
