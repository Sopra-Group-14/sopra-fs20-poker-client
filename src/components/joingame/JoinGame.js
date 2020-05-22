import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {Spinner} from "../../views/design/Spinner";
import GameObject from "../../views/GameObject";
import GameLog from "../shared/models/GameLog";
import GameModel from "../shared/models/GameModel";


const FormContainer = styled.div`
  margin-top: 7.8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  width: 35%;
  height: 300px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
  background: rgba(0,0,0,0.9);
  border-radius: 20px;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 900;
  font-size: 17px;
  color: rgb(237,94,2) ;
  margin-bottom: -15px;
  margin-top: 20px;
  text-transform: uppercase;
  text-align: center
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
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
class JoinGame extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            player: "player",
            games: [],
            gameId: null,
            load: null,
            gamesEmpty: true,
        };
    }

    async join(){
        const requestBody = JSON.stringify({
            userId: localStorage.getItem("id"),
            mode:"player",
        });
        this.props.history.push(`/joinlobby`);

        const response = await api.put('/games/'+ this.state.gameId , requestBody, {headers:{ Authorization: localStorage.getItem("token")}});

    }

    async gamelist() {
        try {
           const response =  await api.get('/games');
         //  this.state.games = response.data;
           this.setState({['games']: response.data});
           //this.state.games =[{gameName: "abc",gameId: 1}, {gameName: "asdfasdf",gameId: 2}];
            //alert(this.state.games.length)
            if(this.state.games.length > 0){
               this.setState({['gamesEmpty']: false});
           }
        } catch (error) {
            alert(`Something went wrong when trying to play a game: \n${handleError(error)}`);
        }

    }

    tick() {
      this.gamelist()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentWillMount() {
        this.gamelist();
        this.interval = setInterval(() => this.tick(), 1000);

    }
    componentDidMount() {
        this.gamelist();
    }


    render() {

        return (

            <FormContainer>
                <Form>
                    <Label>Waiting Games: </Label>
                    <ButtonContainer>
                        {this.state.gamesEmpty? (
                            <Label>There are no waiting games</Label>
                        ): (

                            <div>
                                {this.state.games.map(game => {
                                    this.log = new GameModel(game.gameLog);
                                    if(this.log.gameStarted === false){
                                        return (
                                            <GameContainer key={game.gameId} onClick={() => {
                                                this.state.gameId = game.gameId;
                                                localStorage.setItem("gameId", game.gameId);
                                                this.join();
                                            }}>
                                                <Button
                                                    style = {{marginTop: 10, background: 'rgba(250, 158, 14,1)', padding: 15, width: '100%' }}>
                                                    {game.gameName} ᛫ {game.potType}
                                                </Button>
                                            </GameContainer>
                                        );
                                    }else{
                                        return;
                                    }
                                })}
                            </div>

                             )
                            }
                        <Button
                            onClick={() => {
                                this.props.history.push(`/dashboard`);
                            }}
                        >
                            go Back
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        );
    }
}

export default withRouter(JoinGame);
