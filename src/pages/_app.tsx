import '@roq/nextjs/index.css';
import type { AppProps } from 'next/app';
import { RoqProvider } from 'providers';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/globals.css';
import { ThemeProvider } from 'styles/provider/theme-provider';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      {/* start tracking-scripts */}
      {/* end tracking-scripts */}
      <RoqProvider>
        <Component {...pageProps} />
      </RoqProvider>
    </ThemeProvider>
  );
}
