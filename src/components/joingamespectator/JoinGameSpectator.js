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
  margin-top: 4%;
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


class JoinGameSpectator extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            games: [],
            gameId: null,
            load: null,
            gamesEmpty: true,
            spectatorId:null,
        };
    }

    async watch(){



           const response = await api.put('/games/' + this.state.gameId + '/spectator');
           let gamelog = new GameLog(response.data);
           this.setState({'spectatorId': gamelog.createdSpectatorId});
           localStorage.setItem("spectatorId", this.state.spectatorId);

        localStorage.setItem("Spectator","true");
        this.props.history.push(`/gamescreenspectator`);

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
                                    if(this.log.gameStarted === true && this.log.gameOver === false) {
                                        return (
                                            <GameContainer key={game.gameId} onClick={() => {
                                                this.state.gameId = game.gameId;
                                                localStorage.setItem("gameId", game.gameId);
                                                this.watch();
                                            }}>
                                                <Button
                                                    style = {{marginTop: 10, background: 'rgba(250, 158, 14,1)', padding: 15, width: '100%', }}>
                                                {game.gameName} ᛫ {game.potType}
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
