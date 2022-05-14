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

// api movie
export const getAllMovies = async (payload) => {
    const { pageParam: page = 1, ...resto } = payload
    return (await point.get("/discover/movie", { params: { page, ...resto } || {} })).data
}
export const getMovieById = async (id) => {
    return (await point.get("/movie/" + id)).data
}
export const getMovieBySearchTerm = async (term) => {
    const params = { page: 1, query: term, include_adult: true }
    return (await point.get("/search/movie", { params })).data
}
// api gener
export const getGenres = async () => {
    return (await point.get("/genre/movie/list")).data?.genres
}