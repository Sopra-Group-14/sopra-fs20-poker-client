import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameModel from "../shared/models/GameModel";
import Player from "../../views/Player";
import GameLog from "../shared/models/GameLog";


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
            ready: null,
            username: User.username,
            players: [],
            gameName: null,
            bigBlind: null,
            smallBlind: null,
        };


    }

    async getPlayers() {
        try {
           //localStorage.setItem("gameId", "2");
           //Koni const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/'+ localStorage.getItem("gameId"));
           //Lara const response = await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
            const response = await api.get('/games/'+ localStorage.getItem("gameId")/*, {headers:{ Authorization: localStorage.getItem("token")}}*/);
            let gamelog = new GameLog(response.data);
            alert(gamelog.gameName);
            this.setState({["players"]: gamelog.playerList});
            this.setState({["gameName"]: gamelog.gameName});
            this.setState({["bigBlind"]: gamelog.bigBlind});
            this.setState({["smallBlind"]: gamelog.smallBlind});
            alert(this.state.gameName)
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.getPlayers();
        this.playerReady();
    }

    async playerReady() {

        //lara const response = await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
        const response = await api.get('/games/'+localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});

        let gamelog = new GameLog(response.data);

        let readyCount = 0;
        if (this.state.playerList != null) {
            const playersReady = gamelog.playerList.map(player => {
                if (player.status === "ready") {
                    readyCount++;
                    return player;
                }
            })
        }
        if(readyCount >= 2){
            this.setState({['ready']: 'true'});
        }


    }



    async startGame(){
        try {

            const response = api.put('/games/'+localStorage.getItem("gameId")+'/gameStart', {headers:{ Authorization: localStorage.getItem("token")}});
            this.props.history.push("/gameScreen")
        }
        catch(error){
            alert(`Something went wrong during the login: \n${handleError(error)}`);

        }

    }



    render(){
        const playersEmpty = this.state.playerList;

        return (
            <FormContainer>
                <Form>
                    <h2>Name of the Game: {this.state.gameName} </h2>

                    <label>
                        List of all the Players:

                        <div>
                            {this.playersEmpty ? (
                                this.state.players.map(player => {
                                    return (
                                        <label>
                                            <h4>{player.username}           {player.status}</h4>
                                        </label>
                                    )
                                })
                            ) : (
                                <label>  </label>
                            )}
                        </div>



                    </label>

                    <label>Big Blind is: {this.state.bigBlind} </label>
                    <label> Small Blind is: {this.state.smallBlind} </label>



                    <ButtonContainer>

                        <Button
                            disabled={!(this.state.ready === 'true')}
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
