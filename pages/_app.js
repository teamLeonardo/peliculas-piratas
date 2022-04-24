import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { SearchStore } from "context/ctx.search";
import { PageLayout } from "layout/page";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, 
        refetchOnMount: false
      },
    },
  })
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
      <SearchStore>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ThemeProvider>
      </SearchStore>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
