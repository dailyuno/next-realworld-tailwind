import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "~/common/components/layouts/Layout";
import PageContextProvider from "~/modules/pagination/context/PageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PageContextProvider>
  );
}

export default MyApp;
