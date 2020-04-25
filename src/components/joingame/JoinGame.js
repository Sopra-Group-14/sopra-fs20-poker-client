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
class JoinGame extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            player: "player",
            games: [],
            gameId: null,

        };
    }
    async join(){
        alert("joingame");
        const requestBody = JSON.stringify({
            userId: localStorage.getItem("id"),
            status: "player"
        });
    //    await api.put('/games/'+ this.state.gameId , requestBody,{headers:{ Authorization: localStorage.getItem("token")}})
        this.props.history.push(`/joinlobby`);

    }

    async gamelist() {
        try {
           const response =  await api.get('/games');
           this.setState({['games']: response.data});


        } catch (error) {
            alert(`Something went wrong when trying to play a game: \n${handleError(error)}`);
        }

    }

    componentDidMount() {
        this.gamelist();

    }


    render() {

        return (
            <FormContainer>
                <Form>
                    <label>Waiting Games: </label>
                    <ButtonContainer>
                            {!this.state.games? (
                                <Spinner />
                            ) : (
                                <div>
                                       {this.state.games.map(game => {
                                            return (
                                               <GameContainer key={game.gameId} onClick={() => {
                                                   this.state.gameId = game.gameId;
                                                  // this.join();


                                               }}   >
                                                   { game.gameName } {game.gameLimit} {game.playerNr}
                                               </GameContainer>
                                            );
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