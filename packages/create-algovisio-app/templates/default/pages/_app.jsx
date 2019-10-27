import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '@algovisio/container';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // Send height to parent
    if (process.browser && window && window.parent) {
      const sendHeight = () => {
        window.parent.postMessage({ height: document.body.scrollHeight }, '*');
      };
      sendHeight();
      window.onresize = sendHeight;
      const observer = new MutationObserver(sendHeight);
      observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>AlgoVisio</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          {/* eslint-enable react/jsx-props-no-spreading */}
        </ThemeProvider>
      </>
    );
  }
}
