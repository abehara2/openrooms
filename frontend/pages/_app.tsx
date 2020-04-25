/**
 * @file Configuring page initialization.
 */

import React, { ErrorInfo } from "react";

import App, { AppContext, AppInitialProps } from "next/app";

import { Store } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { initializeStore } from "../redux/store";

// @ts-ignore @types/next-page-transitions does not exist
import { PageTransition } from "next-page-transitions";

/**
 * Props with a Redux store
 * @property store
 */
interface PropsWithRedux extends AppInitialProps {
  store: Store;
}

/**
 * Injects Redux functionality into the app.
 */
export default withRedux(initializeStore as any)(
  /**
   * Wraps the default Next app.
   */
  class WrappedApp extends App<PropsWithRedux> {
    /**
     * Fetches initial props.
     * @param Component the component being rendered.
     * @param ctx the Next page context.
     * @returns the app's initial props.
     */
    static async getInitialProps({
      Component,
      ctx
    }: AppContext): Promise<AppInitialProps> {
      return {
        pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    /**
     * Called on caught errors.
     * @param error the caught error.
     * @param errorInfo information about the caught Error.
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.error("Page Error Boundary: ", error);
      super.componentDidCatch(error, errorInfo);
    }

    /**
     * Renders the app.
     */
    render(): JSX.Element {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} />
          </PageTransition>
        </Provider>
      );
    }
  }
);
