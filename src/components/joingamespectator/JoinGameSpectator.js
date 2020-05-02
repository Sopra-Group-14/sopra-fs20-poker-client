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
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const PlayerContainer = styled.li`
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
const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: 'center';
  margin-top: 20px;
  margin-bottom: 20 px;
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
        this.interval = setInterval(() => this.tick(), 1000);
    }


    render() {

        return (

            <FormContainer>
                <Form>
                    <label>Games to Watch: </label>
                    <ButtonContainer>
                        {this.state.gamesEmpty? (

                            <label>There are no current games</label>


                        ): (

                            <div>
                                {this.state.games.map(game => {
                                    return (
                                        <GameContainer key={game.gameId} onClick={() => {
                                            this.state.gameId = game.gameId;
                                            localStorage.setItem("gameId", game.gameId);
                                            this.watch();
                                        }}   >
                                            {game.gameName}    {game.potType   }
                                        </GameContainer>
                                    );
                                })}
                            </div>

                             )
                            }
                        <Button
                            onClick={() => {
                                    this.props.history.push(`/welcomepage`);
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
