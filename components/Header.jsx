
import { useEffect, useRef, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';

import {
    InputBase,
    IconButton,
    Tooltip,
    Box,
    Popper,
    Fade,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';

import LogoIcon from "assets/logo/logo-48.svg"
import { DialogFilter } from 'components/dialogs/DialogFilter';
import { useQuery } from 'react-query';
import { getMovieBySearchTerm } from 'service';
import { useDebounce } from 'use-debounce';
import { useTheme } from '@mui/system';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useRouter } from 'next/router';
const Component = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
/*
adult: false
backdrop_path: "/stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg"
genre_ids: [28, 878, 35, 10751]
id: 454626
original_language: "en"
original_title: "Sonic the Hedgehog"
overview: "Sonic, el descarado erizo azul basado en la famosa serie de videojuegos de Sega, vivirá aventuras y desventuras cuando conoce a su amigo humano y policía, Tom Wachowski (James Marsden). Sonic y Tom unirán sus fuerzas para tratar de detener los planes del malvado Dr. Robotnik (Jim Carrey), que intenta atrapar a Sonic con el fin de emplear sus inmensos poderes para dominar el mundo."
popularity: 518.541
poster_path: "/rK25c71fYVi0Bv7RrTChK7NAQjC.jpg"
release_date: "2020-02-12"
title: "Sonic: La película"
video: false
vote_average: 7.4
vote_count: 7946



*/
function MediaControlCard({ title, overview, poster_path, id }) {
    const { push, replace } = useRouter();

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100px"
                        }}>
                        {overview}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                    <IconButton aria-label="play/pause" onClick={() => { replace("/" + id) }}>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={"https://image.tmdb.org/t/p/w92" + poster_path}
                alt={title}
            />
        </Card>
    );
}
const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false)

    const [value] = useDebounce(searchTerm, 1000);

    const searchRef = useRef(null)

    const { data, isLoading } = useQuery(
        ['searchTerm', value],
        () => getMovieBySearchTerm(value),
        { enabled: Boolean(value) }
    )

    return <>
        <Popper open={open} anchorEl={searchRef.current} placement={"bottom-start"} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper
                        sx={{
                            marginTop: "1rem",
                            width: "350px",
                            minHeight: "150px",
                            height: "auto",
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "1rem"
                        }}
                    >
                        <Grid container spacing={2}>
                            {
                                isLoading && "loading-----"
                            }
                            {
                                data &&
                                data.results &&
                                data.results.map((d, idx) => {
                                    return <MediaControlCard key={idx} {...d} />
                                })
                            }

                        </Grid>
                    </Paper>
                </Fade>
            )}
        </Popper>
        <Component ref={searchRef}>

            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onClick={() => setOpen(true)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setOpen(false)}
            />
        </Component>
    </>
}

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export const Header = () => {
    const [dialogFilter, setDialogFilter] = useState(false)
    const { push } = useRouter()
    return <>
        <Box >
            <LogoIcon onClick={() => { push("/") }} />
        </Box>

        <Search />
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'flex' } }}>
            <Tooltip title="filtros de categorias">
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => { setDialogFilter(true) }}
                >
                    <CategoryIcon />
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Box>
        <DialogFilter
            open={dialogFilter}
            onClose={() => { setDialogFilter(!dialogFilter) }}
        />
    </>
}