import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from "@mui/material"
import Link from "next/link"

export const CardParrilla = (movie) => {
    if (!movie.poster_path) {
        return <></>
    }
    return <Link
        href={"/" + movie.id}
    >
        <Tooltip title={movie.overview} placement="right-start">

            <Card sx={{ maxWidth: "auto", height: "auto", position: "relative" }} >

                <CardMedia
                    component="img"
                    image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    sx={{
                        objectFit: "cover",
                        height: "100%",
                    }}
                />
                <CardContent sx={{
                    margin: "0", padding: "5px 8px 0px",
                    position: "absolute",
                    left: "0",
                    width: "100%",
                    height: "3rem",
                    bottom: "0",
                    bgcolor: '#00000050'
                }}>
                    <Typography variant="body2" textAlign={"center"} color="text.secondary">
                        {movie.title}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip >
    </Link>
}