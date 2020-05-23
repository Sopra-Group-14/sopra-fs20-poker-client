import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameModel from "../shared/models/GameModel";
import Player from "../../views/Player";
import GameLog from "../shared/models/GameLog";
import {Spinner} from "../../views/design/Spinner";


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
  justify-content: top;
  width: 45%;
  height: 450px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
  background: rgba(0, 0, 0,0.9);
  border-radius: 20px;
`;
const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 0px;
  align-items: center;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 900;
  font-size: 17px;
  color: rgb(237,94,2);
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center
`;


class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            id: User.id,
            ready: null,
            username: User.username,
            players: [],
            gameName: null,
            gameStarted: false,
        };


    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async getPlayers() {
        try {
             const response = await api.get("/games/"+ localStorage.getItem("gameId"), /*{headers:{ Authorization: localStorage.getItem("token")}}*/);
          let gameModel = new GameModel(response.data);

            this.setState({["players"]: gameModel.players});
            this.setState({["gameName"]: gameModel.gameName});
            this.setState({["bigBlind"]: gameModel.bigBlind});
            this.setState({["smallBlind"]: gameModel.smallBlind});
            this.setState({["gameStarted"]: gameModel.gameStarted});

        } catch (error) {
            alert(`Something went wrong when getting the players: \n${handleError(error)}`);
        }
    }


    async playerReady() {

        const response = await api.get('/games/'+localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});

        let gameModel = new GameModel(response.data);

        let readyCount = 0;
        if (this.state.players != null) {
            const playersReady = gameModel.players.map(player => {
                if (player.readyStatus === 'READY') {
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

            const response = await api.put('/games/'+localStorage.getItem("gameId")+'/gameStart', {headers:{ Authorization: localStorage.getItem("token")}});
            this.props.history.push("/gameScreen")
        }
        catch(error){
            alert(`Something went wrong when starting the game: \n${handleError(error)}`);

        }

    }
    tick() {
        this.getPlayers();
        this.playerReady();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    componentDidMount() {
        this.getPlayers();
        this.playerReady();

        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillMount() {
        this.getPlayers();
        this.playerReady();
    }

    render(){


        return (
            <FormContainer>
                <Form>
                    <Label
                        style = {{fontSize: 40, textTransform: 'uppercase'}}>
                        {this.state.gameName} </Label>

                    <Label style={{fontSize: 25}}>
                        Playerlist:

                        <div>
                            {this.state.players ? (
                                this.state.players.map(player => {
                                    return (
                                        <div>
                                        <Label
                                            style = {{fontSize: 20}}>
                                            {player.playerName} ᛫ {player.readyStatus}
                                        </Label></div>
                                    )
                                })
                            ) : (
                                <label>  </label>
                            )}
                        </div>

                    </Label>
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
                    {!(this.state.ready === 'true')?
                    < Label style={{"font-weight": '500', 'text-transform': 'none', fontSize: 20, marginTop: '5%'}}> You need to wait until at least 2 players are ready to start the game</Label>
                        :null
                    }
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
