import 'react-hot-loader'

import React from 'react'
import ReactDOM from 'react-dom'

import store, {Provider} from 'store'
import Root from 'components/Root'
import { ThemeProvider } from 'components'
import theme from 'theme'

// import { ApolloProvider } from '@apollo/client';
// import { client } from 'apollo/client';
import { jwtInterceptor } from 'utils/jwt.interceptor'

jwtInterceptor();

ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </Provider>
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  document.getElementById('wrapper')
)
