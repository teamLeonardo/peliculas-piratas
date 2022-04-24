
import { styled, alpha } from '@mui/material/styles';

import {
    InputBase,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';

import LogoIcon from "assets/logo/logo-48.svg"
import { useState } from 'react';
import { DialogFilter } from 'components/dialogs/DialogFilter';
const Search = styled('div')(({ theme }) => ({
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

        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
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