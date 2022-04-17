import axios from "axios"

const point = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "c2be49192f9721b951964f057b8c6d3b",
        language: "es",
    }
});

point.interceptors.request.use((conf) => {
    const { url } = conf
    if (url && url.includes("discover")) {
        conf.params = {
            ...conf.params,
            // "primary_release_date.gte": "2022-01-01",
            // "primary_release_date.lte": "2022-02-01",
            "sort_by": "popularity.desc",
        }
    }
    return conf
})

// api
export const getAllMovies = async ({ pageParam = 1 }) => {
    console.log({ pageParam });
    return (await point.get("/discover/movie", { params: { page: pageParam } || {} })).data
}
export const getMovieById = async (id) => {
    return (await point.get("/movie/" + id)).data
}