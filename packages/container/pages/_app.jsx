import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../src';
import Layout from '../layout/Layout';

export default withRouter(class MyApp extends App {
    state = {
      height: 300,
    };

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
      // receive height from client
      if (process.browser && window) {
        window.onmessage = (e) => {
          if (e.origin === 'http://localhost:3001' || e.origin === 'http://127.0.0.1:3001') {
            this.setState({ height: Number(e.data.height) });
          }
        };
      }
    }

    render() {
      const { router } = this.props;
      const { height } = this.state;

      const step = Number(router.query.step) || 0;

      return (
        <>
          <Head>
            <title>AlgoVisio</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <iframe
                title="vis-frame"
                id="vis-frame"
                src={`http://localhost:3001/${step}`}
                style={{
                  width: '100%',
                  height,
                  minHeight: 300,
                  borderWidth: 0,
                }}
                width="100%"
                height={height}
              />
            </Layout>
          </ThemeProvider>
        </>
      );
    }
});
