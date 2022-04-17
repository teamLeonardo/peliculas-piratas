import { Container } from "@mui/material"
import { useInfiniteQuery } from "react-query"
import { getAllMovies } from "service"
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardParrilla } from "components/Card"

export default function Home() {
  // const { data, error } = useQuery("movies", () => , {})

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    'movies',
    getAllMovies,
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  )

  if (error) {
    return <div>
      not fount
    </div>
  }
  const datalength = (data) => {
    if (data) {
      if (data.pages) {
        return data.pages.reduce((pre, curr) => {
          return pre + curr.results.length
        }, 0)
      }
    }
    return 0
  }
  return (
    <InfiniteScroll
      dataLength={datalength(data)}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
    >
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 240,
            height: 350,
          },
        }}
      >

        {
          data && data.pages && data.pages.map((page) => page?.results.map((movie, idx) => <CardParrilla {...movie} key={idx} />))
        }

      </Container>
    </InfiniteScroll>
  )
}

