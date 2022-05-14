
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
} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';

import LogoIcon from "assets/logo/logo-48.svg"
import { DialogFilter } from 'components/dialogs/DialogFilter';
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

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false)

    const searchRef = useRef(null)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (
                typeof searchTerm === "string" &&
                searchTerm !== "" &&
                searchTerm.trim() !== ""
            ) {
                console.log(searchTerm)
            }
            // Send Axios request here
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


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
                            <Grid item xs={12}>
                                <Paper elevation={3} >xs=8</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3} >xs=8</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=8</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=4</Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3}>xs=8</Paper>
                            </Grid>
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



    return <>
        <Box >
            <LogoIcon />
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