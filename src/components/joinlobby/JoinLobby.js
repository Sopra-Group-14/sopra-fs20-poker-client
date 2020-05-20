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

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class JoinLobby extends React.Component {
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
            buttonClicked:false,
        };


    }

    async getPlayers() {
        try {
             //localStorage.setItem("gameId", "4");
            //Koni const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/'+ localStorage.getItem("gameId"));
            //const response = await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
            const response = await api.get("/games/"+ localStorage.getItem("gameId"), {headers:{ Authorization: localStorage.getItem("token")}});
            let gameModel = new GameModel(response.data);

            this.setState({["players"]: gameModel.players});
            this.setState({["gameName"]: gameModel.gameName});
            this.setState({["bigBlind"]: gameModel.bigBlind});
            this.setState({["smallBlind"]: gameModel.smallBlind});
            if(gameModel.gameStarted === true){
                this.props.history.push("/gameScreen")
            }

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    blind(){
        this.player = new User(this.state.bigBlind);
        this.player2 = new User(this.state.smallBlind);
        //    alert(this.player.playerName)
        if(this.username === this.player.playerName){
            alert("you are the Bigblind, please raise 5!");
        }
        else if(this.username === this.player2.playerName){
            alert("you are the Smallblind, pleaser bet 5!")
        }
    }

    tick() {
        //alert("Lobby gets refreshed");
        this.getPlayers();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    componentDidMount() {
        /*setTimeout(function(){

        },1000);*/
        this.getPlayers();
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillMount() {

        this.getPlayers();
    }

    async gameStart(){
        //alert("game not ready yet")
        const response = await api.get('/games/'+localStorage.getItem("gameId"));
        this.blind();
        if(response.gameStart === true){
            this.props.history.push(`/gamescreen`);
        }

    }



    async ready(){
        try {

           await api.put('/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id"));

        }
        catch(error){
            alert(`Something went wrong : \n${handleError(error)}`);

        }

    }



    render(){
        return (
            <FormContainer>
                <Form>
                    <Label
                        style = {{fontSize: 40}}>
                        {this.state.gameName} </Label>

                    <Label style = {{fontSize: 25}}>
                        Playerlist

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
                        <Button  disabled={this.state.buttonClicked}
                                 onClick={() => {
                                     this.setState({'buttonClicked':'true'});
                                     this.ready();
                            }}
                        >
                            Im Ready
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
export default withRouter(JoinLobby);