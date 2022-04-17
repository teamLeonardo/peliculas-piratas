import { Card, CardActionArea, CardMedia } from "@mui/material"
import { useRouter } from "next/router"

export const CardParrilla = (movie) => {
    const { push } = useRouter()
    if (!movie.poster_path) {
        return <></>
    }
    return <Card sx={{ maxWidth: "auto", height: "auto" }} >
        <CardActionArea>
            <CardMedia
                component="img"
                height="350"
                image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={movie.title}
                onClick={(e) => {
                    e.preventDefault()
                    push("/" + movie.id)
                }}
            />
        </CardActionArea>
    </Card>
}