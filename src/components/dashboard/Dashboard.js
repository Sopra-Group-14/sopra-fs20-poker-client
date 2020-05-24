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
            balance: null

        };
    }

    async watchGame() {
        try {
            const requestBody = JSON.stringify({
                spectator: this.state.spectator,
            });
            await api.put('/users/' + localStorage.getItem("id") + '/mode', requestBody,{headers:{ Authorization: localStorage.getItem("token")}});

        } catch (error) {
            alert(`Something went wrong when trying to watch a game: \n${handleError(error)}`);
        }

    }

    async getUser() {
        try {
              const response = await api.get('/users/' + localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});
            const user = new User(response.data);
            this.handleInputChange('balance', user.balance);

        } catch (error) {
            alert(`Something went wrong when trying to get the User: \n${handleError(error)}`);
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

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async logout() {
        try {
                api.defaults.headers.common['Authorization']=localStorage.getItem('token');
                api.post('/logout');
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                this.props.history.push('/login');

        } catch (error) {
            alert(`Something went wrong when trying to logout: \n${handleError(error)}`);
        }

    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            disabled={(this.state.balance < 10)}
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
                                            In Poker the highest 5 card poker hand wins. Meaning the person who can get the highest combination of
                                            cards between their hand cards and the table cards wins the pot.<br/>
                                            During the Game you have the following options: <br/>
                                            Bet: you can choose an amount to put in the pot<br/>
                                            Raise: somebody already made a bet, you can raise it by putting more in the pot <br/>
                                            Call: somebody made a bet, to stay in the game you can put the same amount in the pot <br/>
                                            Check: if nobody has made a bet, you can check, nothing happens and you are still in the game <br/>
                                            Fold: if you fold you are out of the current round. You loose the credit you might already have bet.<br/>
                                            <br/>
                                            The first player of first round (Preflop) has to bet the small blind.<br/>
                                            The second player of first round has to raise (Preflop) at least as high as the big blind or higher<br/>
                                            </p>
                                            <h3>There are different Limits</h3>
                                            <p>
                                               No limit:\t Recommended to experts. Players' bets is only restricted by the their remaining stake.<br/>
                                               Fixed limit:\tRecommended to beginners. A Players can only decide whether to bet or not. In the first two rounds (Preflop and Flop) a bet equals the lower limit (Big Blind).
                                                            In the following two rounds (Turn and River), a bet must equal the higher limit (twice the Big Blind). Additionally, players are not allowed to raise more than three times a round, including the blind bets.<br/>
                                               Pot limit:\tRecommended to intermediates. Players cannot place bets greater than the pot limit. The pot limit is determined by the all the amount that has been betted beforehand.<br/>
                                               Split limit:\tRecommended to beginners. A players in the first two rounds (Preflop and Flop) is restricted by the higher limit (twice the big blind); bets can be placed that are smaller or equal the higher limimt.
                                               In the remaining two rounds (Turn and River), the same logic applies with the maximum amount being the higher limit (twice the big blind). Additionally, a round has a maximum of three raises including the blind bets. <br/>
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
