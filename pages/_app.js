import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { PageLayout } from "layout/page";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const queryClient = new QueryClient()
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',

        },

      }),
    [prefersDarkMode],
  );

  return (
    <QueryClientProvider client={queryClient} >

      <ThemeProvider theme={theme} >
        <CssBaseline />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
