import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';




const FormContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #000000;
  padding-left: 37px;
  padding-right: 37px;
  padding-bottom: 37px;
  background: #C4C4C4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 19px;


`;


const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: 'center';
  margin-top: 20px;
  margin-bottom: 20 px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
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
                                this.watchGame();
                                this.props.history.push(`/joingamespectator`);
                            }}
                        >
                            Watch a Game
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
