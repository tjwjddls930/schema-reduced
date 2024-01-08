import '@/styles/globals.css';
import { LanguageProvider } from '@/contexts/Langaugecontext';
import { FontsizeProvider } from '@/contexts/Fontsizecontext';

export default function App({ Component, pageProps }) {
  return <LanguageProvider>
    <FontsizeProvider>
      <Component {...pageProps} />
    </FontsizeProvider>
  </LanguageProvider>
}
