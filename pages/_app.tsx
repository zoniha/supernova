import '@fontsource/overpass';
import '@fontsource/noto-sans-jp';

import { Box, ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import theme from '../theme/theme';
import Header from '../components/Header';
import { ApolloProvider } from '@apollo/client';
import { ApolloClientConfig } from '../graphql/config/ApolloClientConfig';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={ApolloClientConfig}>
      <ChakraProvider theme={theme}>
        <Header />
        <Box pt={'64px'} h={'100vh'} overflowY={'scroll'} overscrollBehaviorY={'contain'}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
