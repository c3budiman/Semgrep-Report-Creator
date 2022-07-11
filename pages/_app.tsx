import "antd/dist/antd.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { themeColor } from "../Configs/themeColor";
import returnStoreAndPersistor from "../Redux/store";
import { isDev } from "../Utils/Helpers/HelperBrowser";

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const { store, persistor } = returnStoreAndPersistor();
  const queryClient = new QueryClient();

  return getLayout(
    <>
      <NextNProgress color={themeColor.success} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {
              isDev && (
                <ReactQueryDevtools initialIsOpen={false} />
              )
            }
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>,
  );
}
