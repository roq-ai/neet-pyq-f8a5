import { ColorModeScript } from '@chakra-ui/react';
import { clientConfig } from 'config';
import { Html, Head, Main, NextScript } from 'next/document';
import { chakraTheme } from 'styles/themes';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={chakraTheme[clientConfig.defaultTheme]?.config?.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
