import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import { Add } from "@mui/icons-material"
import { useSearchStore } from "context/ctx.search";

export function DialogFilter({ onClose, open }) {

    const { genersAll } = useSearchStore()
    const { data, error } = genersAll;
    const handleClose = () => {
        onClose();
    };




    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Filtra tus categorias</DialogTitle>
            <DialogContent dividers>
                {
                    error &&
                    <DialogContentText >
                        error al cargar los datos
                    </DialogContentText>
                }
                {
                    data &&
                    <List sx={{ pt: 0 }}>
                        {
                            [...data].map(({ id, name }) => (
                                <ListItem autoFocus button key={id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {name[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))
                        }
                    </List>

                }
            </DialogContent>
            <DialogActions>
                <List sx={{ pt: 0 }}>
                    <ListItem autoFocus button >
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItem>
                </List>
            </DialogActions>
        </Dialog>
    );
}