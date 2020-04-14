import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameModel from "../shared/models/GameModel";
import Player from "../../views/Player";


const FormContainer = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
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


const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            id: User.id,
            ready: User.ready,
            username: User.username,
            users: [],
            gameName: GameModel.gameName,
            bigBlind: GameModel.bigBlind,
            smallBlind: GameModel.smallBlind,
            gameCreator: GameModel.gameCreator,
            gameId: GameModel.gameId
        };


    }

    componentDidMount() {

        try {
            localStorage.setItem("gameId", "2");
            const response =  api.get('/games/'+ localStorage.getItem("gameId"));

            // Get the returned user and update a new object.
            const game = new GameModel(response.data);
            GameModel.thisGame = game;
           /* GameModel.thisGame = {gameName:'ourGame' , bigBlind: 'lara1', smallBlind: 'lara2', gameCreator: '1',
                users: [{username:'lara', id: '1', status:'ready'}, {username:'lara2', id: '2'}, {username:'Lara3', id: '3', status:'ready'}, {username:'Lara4', id: '4'}]
            };*/


        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

    }
    async playerReady() {
        try{
        const response = api.get('/games/'+localStorage.getItem("gameId"));
        const players = response.users;
        for (User.user in players) {
            if (User.user.status === 'ready') {
                return true;
            } else {
                return false;
            }

        }
    } catch(error){
            alert(`Something went wrong during the login: \n${handleError(error)}`);

        }
    }

    async startGame(){
        try {
            const response = api.put('/games/'+localStorage.getItem("gameId")+'/gameStart');
            this.props.history.push("/gameScreen")
        }
        catch(error){
            alert(`Something went wrong during the login: \n${handleError(error)}`);

        }

    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <h2>Name of the Game: {this.state.gameName} </h2>
                    <label>
                        List of all the Players:
                        <Users>
                            {this.state.users.map(user => {
                                    return (
                                        <PlayerContainer key={user.id}>
                                            <Player user={user} />
                                        </PlayerContainer>
                                    );
                                })}

                        </Users>
                    </label>
                    <label>Big Blind is: {this.state.bigBlind} </label>
                    <label> Small Blind is: {this.state.smallBlind} </label>



                    <ButtonContainer>

                        <Button
                            disabled={!(this.playerReady() === true)}
                            onClick={() => {
                                this.startGame();

                            }}
                        >
                            Start
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
export default withRouter(Lobby);
