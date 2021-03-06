import React from 'react'
import { Provider } from 'mobx-react'
import { getSnapshot, applySnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import store from '../stores/store';

export default class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    const isServer = typeof window === 'undefined';
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
      ...isServer && { snapshot: getSnapshot(store) } // make a snapshot only on the server side
    };
  }

  constructor (props) {
    super(props)
    // Client-side: apply store recived from server-side 
    if (typeof window !== 'undefined') {
     applySnapshot(store, props.snapshot)
    }
    // Server-side: do nothing, because the store has already initialized
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
