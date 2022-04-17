import { Breadcrumbs, Chip, Container, Grid, Link, Paper, Rating, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getMovieById } from "service";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import StarIcon from '@mui/icons-material/Star';

const ImgBack = styled("img")(({ theme }) => ({
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    objectFit: "cover",
    filter: "blur(1ch)"
}));

export default ({ detail }) => {
    const { id } = useQuery()
    const { push } = useRouter()
    const { data, error } = useQuery('movieId', () => getMovieById(id), { initialData: detail, refetchOnWindowFocus: false, refetchOnMount: false })
    return <>
        <ImgBack alt={data.title} src={"https://image.tmdb.org/t/p/original" + data.backdrop_path} />
        <Container maxWidth="xl" position={"relative"} sx={{ mt: 2 }} >
            <Breadcrumbs aria-label="breadcrumb" position={"relative"}>
                <Link
                    href=""
                    underline="hover"
                    color="inherit"
                    onClick={(e) => {
                        e.preventDefault();
                        push("/")
                    }}
                >
                    MOVIES
                </Link>
                {/* <Typography underline="hover" color="inherit">
                </Typography> */}
                <Typography color="text.primary">{data.title}</Typography>
            </Breadcrumbs>
            <Grid container position={"relative"} spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={5}>
                    <Paper variant="outlined" sx={{
                        width: "fit-content",
                        height: "fill"
                    }}>
                        <img alt={data.title} src={"https://image.tmdb.org/t/p/w500" + data.poster_path} />
                    </Paper>
                </Grid>
                <Grid item xl={7} xs={12}>
                    <Paper sx={{
                        width: "fit-content",
                        height: "fill",
                        padding: "1rem 1.5rem"
                    }}>
                        <Typography variant="h3" gutterBottom component="div">
                            {data.title}
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {data.tagline}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {data.overview}
                        </Typography>
                        <Stack
                            spacing={1}
                            sx={{ marginBottom: "1rem", marginTop: "1rem" }}
                            alignItems="flex-start"
                            direction="row"
                            justifyContent={"space-between"}
                        >
                            <Stack
                                spacing={1}
                                direction="row"
                            >
                                {data.genres.map((data) => (

                                    <Chip
                                        key={data.id}
                                        variant="outlined" color="warning" size="small"
                                        icon={<TagFacesIcon />}
                                        label={data.name}
                                    />
                                ))}
                            </Stack>
                            <Rating
                                name="text-feedback"
                                value={data.vote_average}
                                readOnly
                                size="large"
                                precision={0.5}
                                max={10}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Stack>
                        <Paper elevation={12} sx={{
                            width: "100%",
                            height: "500px"
                        }}>
                            <iframe
                                id="iframe"
                                src={"https://www.2embed.ru/embed/tmdb/movie?id=" + data.id}
                                width="100%"
                                height="100%"
                                frameborder="0"
                            ></iframe>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>
}
export async function getServerSideProps({ query: { id } }) {
    const detail = await getMovieById(id)
    if (!detail) {
        return {
            redirect: {
                permanent: false,
                destination: `/`
            },
        };
    }
    // ...
    return { props: { detail } }
}