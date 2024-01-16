import '@/styles/globals.css';
import { LanguageProvider } from '@/contexts/Langaugecontext';
import { FontsizeProvider } from '@/contexts/Fontsizecontext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>쉐마미술관 AI키오스크 모바일</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="쉐마미술관 AI 키오스크 by Metalab"
      />
      {/* <meta property="og:image" content="/og-image.png" /> */}
    </Head>
    <LanguageProvider>
      <FontsizeProvider>
        <Component {...pageProps} />
      </FontsizeProvider>
    </LanguageProvider>
  </>
}
