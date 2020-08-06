import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {auth} from "../Firebase/Firebase";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Layout = props => {
    const styles = useStyles();
    const {children} = props;

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        VibeCheck Admin
                    </Typography>
                    <Button variant="outlined" color="secondary"
                            startIcon={<ExitToAppIcon />}
                            onClick={() => auth.signOut()}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;
