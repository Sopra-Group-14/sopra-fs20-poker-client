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
  width: 25%;
  height: 300px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
  background: rgba(115, 28, 1,0.8);
  border-radius: 3px;
`;

const InputField = styled.input`
  &::placeholder {
    font-family: 'Roboto', sans-serif;
    color: rgba(0,0,0,0.5);;
    font-size: 19px;
    opacity: 0.6;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(237,94,2, 0.4);
  color: black;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 900;
  font-size: 17px;
  color: black ;
  margin-bottom: 5px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
`;

const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;


class JoinGameSpectator extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            games: [],
            gameId: null,
            load: null,
            gamesEmpty: true,
        };
    }

    async watch(){
      /*  const requestBody = JSON.stringify({
            userId: localStorage.getItem("id"),
            status:'spectator'
        });*/
        this.props.history.push(`/gamescreenspectator`);
        //ToDo Check if this request exists, or how the variable for id is called !
       // const response = await api.put('/games/'+ this.state.gameId , requestBody, {headers:{ Authorization: localStorage.getItem("token")}});
       // localStorage.setItem("spectatorId", response.spectatorId);
    }


    async gamelist() {
        try {
           const response =  await api.get('/games');
           this.setState({['games']: response.data});
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


    render() {

        return (

            <FormContainer>
                <Form>
                    <Label>Games to Watch: </Label>
                    <ButtonContainer>
                        {this.state.gamesEmpty? (

                            <Label>There are no current games</Label>


                        ): (

                            <div>
                                {this.state.games.map(game => {
                                    this.log = new GameModel(game.gameLog);
                                    if(this.log.gameStarted === true) {
                                        return (
                                            <GameContainer key={game.gameId} onClick={() => {
                                                this.state.gameId = game.gameId;
                                                localStorage.setItem("gameId", game.gameId);
                                                this.watch();
                                            }}>
                                                <Button
                                                    style = {{height: 30, marginTop: -15, background: 'rgba(179, 29, 3,1)'}}>
                                                {game.gameName} {game.potType}
                                                </Button>
                                            </GameContainer>
                                        );
                                    }
                                })}
                            </div>

                             )
                            }
                        <Button
                            style = {{marginTop: 30}}
                            onClick={() => {
                                if (localStorage.getItem('id') === null){
                                    this.props.history.push(`/welcomepage`);
                                }
                                else{
                                    this.props.history.push('/dashboard')
                                }
                            }
                            }
                        >
                            go Back
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        );
    }
}

export default withRouter(JoinGameSpectator);
