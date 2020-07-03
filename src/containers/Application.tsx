import {
  AppBar,
  createStyles,
  Divider,
  Drawer,
  makeStyles,
  MuiThemeProvider
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import classNames from "classnames";
import { observer, Provider } from "mobx-react";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import Notification from "../components/Notification";
import Settings from "../components/Settings";
import config from "../config";
import stores, { useStores } from "../stores/stores";
import ChartEditor from "./ChartEditor";
import ChartTab from "./ChartTab";
import Inspector from "./Inspector";
import Layer from "./Layer";
import Player from "./Player";
import Toolbar from "./Toolbar";

const drawerWidth: number = config.sidebarWidth;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      /* ... */
    },

    drawerPaperOpen: {
      position: "relative",
      width: drawerWidth
    },
    drawerPaperClose: {
      position: "relative",
      width: 0,
      border: "none"
    },
    button: {
      margin: theme.spacing()
    },

    playerButton: {},

    fab: {
      position: "absolute",
      top: theme.spacing(0.5),
      right: theme.spacing(2),
      zIndex: 10000
    },

    appFrame: {
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    appBarOpen: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    appBarClose: {
      width: "100%"
    },
    appBarLeftOpen: {
      marginLeft: drawerWidth
    },
    appBarLeftClose: {
      marginLeft: 0
    },
    toolbar: theme.mixins.toolbar,

    paper: {
      /* ... */
    },

    timeSliderTrack: {
      height: "4px",
      background: "red"
    },
    timeSliderThumb: {
      width: "14px",
      height: "14px",
      background: "red"
    },
    volumeSliderTrack: {
      height: "4px",
      background: "#fff"
    },
    volumeSliderThumb: {
      width: "14px",
      height: "14px",
      background: "#fff"
    },

    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
      // padding: theme.spacing.unit * 3
    }
  })
);

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});
const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const Application = observer(function Application() {
  const classes = useStyles();
  const { editor } = useStores();
  return (
    <div style={{ flexGrow: 1 }}>
      <div className={classes.appFrame} style={{ height: "100vh" }}>
        <AppBar
          position="absolute"
          color="default"
          className={classNames(
            editor.setting.drawerOpened
              ? classes.appBarOpen
              : classes.appBarClose,
            editor.setting.drawerOpened
              ? classes.appBarLeftOpen
              : classes.appBarLeftClose
          )}
        >
          <Toolbar />
          <Divider />
          <ChartTab />
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: editor.setting.drawerOpened
              ? classes.drawerPaperOpen
              : classes.drawerPaperClose
          }}
          anchor="left"
        >
          <Settings />
          <Inspector />
        </Drawer>
        <main
          className={classes.content}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ChartEditor />
          <Player />
        </main>
        <SnackbarProvider maxSnack={4}>
          <Notification />
        </SnackbarProvider>
        <Layer />
      </div>
    </div>
  );
});

const ThemeProvider = observer(function ThemeProvider() {
  const { editor } = useStores();
  return (
    <MuiThemeProvider
      theme={editor.setting.muiThemeType === "light" ? lightTheme : darkTheme}
    >
      <Application />
    </MuiThemeProvider>
  );
});

export default function ApplicationProvider() {
  return (
    <Provider {...stores}>
      <ThemeProvider />
    </Provider>
  );
}
