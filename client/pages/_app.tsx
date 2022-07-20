import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthConsumer, AuthProvider } from "../context/TokenAuthContext";
import { Loader } from "../components/Loader";
import { NextPageWithLayout } from "../types/next.types";
import { Toaster } from "../components/Toaster";

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <AuthConsumer>
        {(auth) =>
          !auth.isInitialized ? (
            <div className="flex h-screen w-screen align-center justify-center">
              <Loader />
            </div>
          ) : (
            getLayout(
              <div className="h-screen w-screen bg-slate-900 text-white">
                <>
                  <Component {...pageProps} />
                  <Toaster />
                </>
              </div>
            )
          )
        }
      </AuthConsumer>
    </AuthProvider>
  );
}

export default MyApp;
