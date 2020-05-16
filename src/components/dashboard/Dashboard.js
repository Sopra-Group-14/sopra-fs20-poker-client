import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Popup from "reactjs-popup";


const FormContainer = styled.div`
  margin-top: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 450px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
  
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            username: null,
            spectator: "spectator",
            player: "player",

        };
    }

    async watchGame() {
        try {
            const requestBody = JSON.stringify({
                spectator: this.state.spectator,
            });
            await api.put('/users/' + localStorage.getItem("id") + '/mode', requestBody,{headers:{ Authorization: localStorage.getItem("token")}});
            //Backend with Postman: const response = await api.put('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/users/' + localStorage.getItem("id") + '/mode', requestBody);
            //const user = new User(response.data);
            //alert(user.id)


        } catch (error) {
            alert(`Something went wrong when trying to watch a game: \n${handleError(error)}`);
        }

    }

    async playGame() {
        try {
            const requestBody = JSON.stringify({
                mode: this.state.player,
            });
            await api.put('/users/' + localStorage.getItem("id") + '/mode', requestBody,{headers:{ Authorization: localStorage.getItem("token")}});

        } catch (error) {
            alert(`Something went wrong when trying to play a game: \n${handleError(error)}`);
        }

    }

    async logout() {
        try {
                api.defaults.headers.common['Authorization']=localStorage.getItem('token');
                api.post('/logout');
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                this.props.history.push('/login');

            /*
            const requestBody = JSON.stringify({
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody);
            localStorage.setItem("token", null);
            localStorage.setItem("id", null);

             */

        } catch (error) {
            alert(`Something went wrong when trying to logout: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.playGame();
                                this.props.history.push(`/play`);
                            }}
                        >
                            Play a Game
                        </Button>




                        <Button
                            onClick={() => {
                                this.props.history.push(`/account`);
                            }}
                        >
                            My Account
                        </Button>
                        <Button

                        onClick={() => {
                            this.watchGame();
                            this.props.history.push(`/joingamespectator`);
                        }}
                    >
                        Watch a Game
                    </Button>
                        <Popup trigger={<Button> Game Rules </Button>} modal>
                            {close => (
                                <div className="modal">
                                    <a className="close" onClick={close}>
                                        &times;
                                    </a>
                                    <div className="header"> How to Play </div>
                                    <div className="content">
                                        {" "}
                                        The first player of first round (preflop) has to bet the small blind.
                                        {" "}

                                        The second player of first round has to raise (preflop) at least as high as the bigblind or higher
                                        {" "}

                                        if pot type no limit: maximum bet or raise can be until all the credit, player has left. (all in)

                                    </div>
                                    <button
                                            className="button"
                                            onClick={() => {
                                                console.log("closed ");
                                                close();
                                            }}
                                        >
                                            close
                                        </button>
                                </div>
                            )}
                        </Popup>

                     <Button
                            onClick={() => {
                                this.logout();
                                this.props.history.push(`/welcomepage`);
                            }}
                        >
                            logout
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Dashboard);
