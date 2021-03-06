import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Welcomepage from "../../welcomepage/Welcomepage";
import Dashboard from "../../dashboard/Dashboard";
import Registration from "../../registration/Registration";
import Play from "../../play/Play";
import GameSettings from "../../gamesettings/GameSettings";
import Lobby from "../../lobby/Lobby";
import GameScreen from "../../gamescreen/GameScreen";
import Account from "../../account/Account";
import EndScreen from "../../endscreen/EndScreen";
import JoinGame from "../../joingame/JoinGame";
import JoinLobby from "../../joinlobby/JoinLobby";
import TopUpAccount from "../../topupaccount/TopUpAccount";
import JoinGameSpectator from "../../joingamespectator/JoinGameSpectator";
import GameScreenSpectator from "../../gamescreenspectator/GameScreenSpectator";
import Chat from "../../chat/Chat"
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <React.Fragment>

            <Route
              path="/login"
              exact
              render={() => (
                  <Login />
              )}
            />

              <Route
                  path="/welcomepage"
                  exact
                  render={() => (
                          <Welcomepage />
                  )}
              />

              <Route
                  path="/dashboard"
                  exact
                  render={() => (
                      <Dashboard />
                  )}
              />

              <Route
                  path="/registration"
                  exact
                  render={() => (
                      <Registration />
                  )}
              />
              <Route
                  path="/play"
                  exact
                  render={() => (
                      <Play />
                  )}
              />
            <Route
                path="/createagame"
                exact
                render={() => (
                    <GameSettings />
                )}
            />
            <Route
                path="/lobby"
                exact
                render={() => (
                    <Lobby />
                )}
            />
            <Route
                path="/gamescreen"
                exact
                render={() => (
                    <GameScreen />
                )}
            />
            <Route
                path="/account"
                exact
                render={() => (
                    <Account />
                )}
            />
            <Route
                path="/endscreen"
                exact
                render={() => (
                    <EndScreen />
                )}
            />
            <Route
                path="/joingame"
                exact
                render={() => (
                    <JoinGame />
                )}
            />
            <Route
                path="/joinlobby"
                exact
                render={() => (
                    <JoinLobby />
                )}
            />
            <Route
                path="/topupaccount"
                exact
                render={() => (
                    <TopUpAccount />
                )}
            />
            <Route
                path="/joingamespectator"
                exact
                render={() => (
                    <JoinGameSpectator />
                )}
            />
            <Route
                path="/gamescreenspectator"
                exact
                render={() => (
                    <GameScreenSpectator />
                )}
            />
            <Route
                path="/chat"
                exact
                render={() => (
                    <Chat />
                )}
            />
            <Route path="/" exact render={() => <Redirect to={"/welcomepage"} />} />
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
