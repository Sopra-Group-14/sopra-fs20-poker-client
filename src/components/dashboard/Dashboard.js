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
                                            <p>
                                            <h3>The Basics</h3>
                                            In Poker the highest 5 card poker hand wins. Meaning the Person who can get the highest combination of
                                            cards between their hand cards and the table cards gets the pot.<br/>
                                            During the Game you have the following options: <br/>
                                            Bet: you can choose an amount to put in the pot<br/>
                                            Raise: somebody already made a bet, you can raise it by putting more in the pot <br/>
                                            Call: somebody made a bet, to stay in the game you can put the same amount in the pot <br/>
                                            Check: if nobody has made a bet, you can check, nothing happens and you are still in the game <br/>
                                            Fold: if you fold you are out of the current round. You loose the credit you might already have bet.<br/>
                                            <br/>
                                            The first player of first round (preflop) has to bet the small blind.<br/>
                                            The second player of first round has to raise (preflop) at least as high as the bigblind or higher<br/>
                                            </p>
                                            <h3>There are different Limits</h3>
                                            <p>
                                               no limit: There is no limit, the player can raise or bet as much as he has. (all in)<br/>
                                               fixed limit: In the rounds preflop and flop the betted amount must be the lower limit. in the other
                                                -             rounds it must be high limit. <br/>
                                                -             lower limit = big blind<br/>
                                                -             higher limit = 2* big blind <br/>
                                                -             it isnt possible to reaise more then three times per round. <br/>
                                               pot limit: The betted/raised amount mustn't be bigger than the amount that is in the pot. <br/>
                                               split limit: In the rounds preflop and flop, the betted amount can't be higher then high limit.<br/>
                                               -              lower limit = big blind<br/>
                                               -              higher limit = 2* big blind <br/>
                                               -              per round it is not possible to raise more than three times.

                                            </p>

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
