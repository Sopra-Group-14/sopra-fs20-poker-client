import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button';
import chips from '../../graphics/chips.png';
import GameLog from "../shared/models/GameLog";
import {graphicsList} from '../../images'
import Card from "../shared/models/Card";
import Slider from "../Slider/Slider";
import User from "../shared/models/User";
import {Chat} from "../chat/Chat";

const ChatButton = styled.div`

  &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    background: rgba(237,94,2,1);
    
  }
  line-height: 4px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 10px;
  text-align: center;
  padding: 25px;
  margin-top: 15px; 
  color: #000000;
  margin-left: 10%
  margin-right: 10%
  width: 40%;
  height: 30px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: rgba(237,94,2,0.85);
  font-weight: 100;
  color: $black;
  text-transform: uppercase;
  
  
`;

const PlayersContainer = styled.div`
  margin: auto;
  display: flex;
  width: 810px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;
const PlayerContainer = styled.div`
     background: rgba(237,94,2,0.85); 
     width: 100px;
     height: 119px;
     box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
     border-radius: 8px;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `;
const ActivePlayerContainer = styled.div`
background: rgba(237,94,2,0.85); 
     border: 1px solid #FFFFFF;
     width: 100px;
     height: 119px;
     box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
     border-radius: 8px;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `;

const PotContainer = styled.div`
  margin: auto;
background: rgba(237,94,2,0.85); 
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 119px;
`;
const ChatContainer = styled.div`
  
  position: absolute;
  width: 200px;
  height: 100%;
  top: 0px;
  right: 0px;
  background: rgba(237,94,2,0.85);
`;
const TableCardContainer = styled.div`
  padding-top: 20px; 
  margin: auto;
  width: 700px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HandCardContainer = styled.div`
  margin: auto;
  width: 200px; 
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const CardContainer = styled.div`
       margin: auto;
      width: 95px;
      height: 133px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InputField = styled.input`
  &::placeholder {
    color: dark grey;
  }
  margin-left: 5px;
  margin-bottom: 10px;
  height: 30px;
  width: 190px;
  background: rgba(255, 255, 255);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: black;
`;

const InputFieldRaise = styled.input`
  &::placeholder {
    color: dark grey;
  }
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: -3px;
  height: 30px;
  width: 190px;
  background: rgba(255, 255, 255);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: black;
`;


const ButtonContainer = styled.div`
  margin: auto;
  flex-direction: column;
  width: 200px;
  display: flex;
  justify-content: 'center';  
`;

const ButtonContainerRow = styled.div`
  margin: auto;
  flex-direction: row;
  width: 200px;
  display: flex;
  justify-content: 'center';  
`;

const ControlContainer= styled.div`
  margin: auto;
  margin-top: 30px;
  width: 600px; 
  height: 250px;
  display: flex;
  flex-direction: row;
  background: rgba(0,0,0,0.85);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: space-between;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 600;
  font-size: 17px;
  color: rgb(237,94,2);
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center
`;

class GameScreenSpectator extends React.Component {
    constructor() {
        super();
        this.state = {


            //ActivePlayer
            activePlayerId:null,
            activeCredit:null,
            activeUsername:null,
            activehandcards: null,

            //Cards
            tablecards: [],
            handcards: [],

            //Handcards
            posh1: null,
            posh2:null,

            //Tablecards
            tablecard1:null,
            tablecard2:null,
            tablecard3:null,
            tablecard4:null,
            tablecard5:null,

            //Gamelog
            currentPlayerName: null,
            currentPlayerId : null,
            players:[],

            playerPot: null,
            transactionNr : null,
            gameRound : null,
            action : null,
            raiseAmount : null,
            nextPlayerName : null,
            nextPlayerId : null,
            roundOver : null,
            gameOver : null,
            amountToCall : null,
            winner : null,
            possibleActions : null,
            gameName : null,
            potAmount : null,
            activePlayers : null,
            thisPlayersTurn : null,
            nextPlayersTurn : null,
        };
    }

    async getGamelog(){
        const response = await api.get('/games/' + localStorage.getItem("gameId"));
        let gamelog = new GameLog(response.data);

        this.handleInputChange('players', gamelog.players);
        this.handleInputChange('currentPlayerName', gamelog.playerName);
        this.handleInputChange('playerPot', gamelog.playerPot);
        this.handleInputChange('gameRound', gamelog.gameRound);
        this.handleInputChange('transactionNr', gamelog.transactionNr);
        this.handleInputChange('action', gamelog.action);
        this.handleInputChange('raiseAmount', gamelog.raiseAmount);
        this.handleInputChange('nextPlayerName', gamelog.nextPlayerName);
        this.handleInputChange('nextPlayerId', gamelog.nextPlayerId);
        this.handleInputChange('roundOver', gamelog.roundOver);
        this.handleInputChange('gameOver', gamelog.gameOver);
        this.handleInputChange('amountToCall', gamelog.amountToCall);
        this.handleInputChange('winner', gamelog.winner);
        this.handleInputChange('possibleActions', gamelog.possibleActions);
        this.handleInputChange('gameName', gamelog.gameName);
        this.handleInputChange('potAmount', gamelog.potAmount);
        this.handleInputChange('activePlayers', gamelog.activePlayers);
        this.handleInputChange('thisPlayersTurn', gamelog.thisPlayersTurn);
        this.handleInputChange('nextPlayersTurn', gamelog.nextPlayersTurn);
    }



    async nextRound(){
        const response = await api.get('/games/' + localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});
        let gamelog = new GameLog(response.data);

        if (gamelog.winner != null){
            localStorage.setItem("winner", gamelog.winner);
            this.props.history.push(`/dashboard`);
        }
    }

    async displayHandCards() {
        try {
            //Backend with Postman:
            //localStorage.setItem("gameId", "2");
            //localStorage.setItem("playerId", "1");
            //Lara  const response =  await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));

            //const response =  await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));

            const response =  await api.get('/games/'+localStorage.getItem("gameId")+'/players/'+this.state.activePlayerId,{headers:{ Authorization: localStorage.getItem("token")}});
            console.log("response body " + response);
            const player = response.data;
            this.state.handcards = player.hand;
            /*
            alert("playerhand"+player.hand);
            alert("player"+player);
            alert("response"+response.data);
             */
            //alert(localStorage.getItem("id"));

            this.setState({ ["posh1"]: this.getImageOfCard(this.state.handcards[0])});
            this.setState({ ["posh2"]: this.getImageOfCard(this.state.handcards[1])});
            this.handleInputChange("playerCredit", player.credit);


        } catch (error) {
            alert(`Something went wrong when trying to load the hand cards: \n${handleError(error)}`);
        }
    }
/*
    async getOddsPreFlop(){
        const response =  await api.get('https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/pre-flop?hole=Ac%252C3c', {headers: {'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const odds = response.data;
        alert(odds.message);
        alert("lol");
    }
*/
    async getOddsPreFlop(){
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/pre-flop?hole=Ac%2C3s");
        xhr.setRequestHeader("x-rapidapi-host", "sf-api-on-demand-poker-odds-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0");

        xhr.send(data);

        xhr.onload = function () {
            alert(xhr.status)
        };




    }

    async displayTableCards() {
        try {

            const response = await api.get('/games/' + localStorage.getItem("gameId"),/*{headers:{ Authorization: localStorage.getItem("token")}}*/);

            let gamelog = new GameLog(response.data);
            this.state.tablecards = gamelog.revealedCards;

            if(this.state.tablecards === []){
                for (let i = 0; i < 5; i++){
                    this.setState({["tablecard"+(i+1)]: graphicsList.find(data => data.name === "BACKSIDE").src});
                }
                return
            }
            for (let i = 0; i < this.state.tablecards.length; i++){
                this.setState({["tablecard"+(i+1)]: this.getImageOfCard(this.state.tablecards[i])});
            }
            if(this.state.tablecards.length !== 5) {
                for (let i = this.state.tablecards.length; i < 5; i++) {
                    this.setState({["tablecard" + (i + 1)]: graphicsList.find(data => data.name === "BACKSIDE").src});
                }
            }
        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }
    }

    getImageOfCard(card){
        let cardname = card.suit + card.rank;
        return graphicsList.find(data => data.name === cardname).src;
    }


    async leave(){
        localStorage.removeItem('spectatorId');
        if (localStorage.getItem('id') === null){
            this.props.history.push(`/welcomepage`);
        }
        else{
            this.props.history.push('/dashboard')
        }
        //await api.put( '/games/'+localStorage.getItem("gameId")+'/spectator/'+localStorage.getItem("spectatorId")+'/leave')
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});$
        this.setState({ [key]: value });
    }

    callbackFunction = (data) => {
        this.setState({raiseAmountInput: data})
    };

    playRound(){
        if(this.state.activePlayerId === null){
            this.handleInputChange("activePlayerId", this.state.nextPlayerId);
        }
        if(this.state.gameOver === false){
            this.getGamelog();
            this.displayHandCards();
            this.displayTableCards();

        }
        this.nextRound();
    }

    tick() {
        //alert("Everything gets refreshed");
        this.playRound();
        this.displayHandCards();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.getGamelog();
        this.displayTableCards();
        this.interval = setInterval(() => this.tick(), 2000);
    }



    render() {
        return (
            <BaseContainer>
                <PlayersContainer>
                    {this.state.players.map(user => {
                        if(user.id === this.state.activePlayerId){
                            this.state.activehandcards = user.handcards;
                            this.state.activeplayerCredit = user.credit;
                            this.state.activeUsername = user.playerName;
                            return(
                                <PlayerContainer key={user.id}   >
                                    <label>{user.playerName}</label>
                                    <img width={80}  src={chips} />
                                    <label> {user.credit} </label>
                                    <label>{user.action}</label>
                                </PlayerContainer>
                            )
                        } else {
                            return (
                                <PlayerContainer key={user.id}  onClick={() => {
                                    this.handleInputChange("activePlayerId",user.id);
                                }}   >
                                    <label>{user.playerName}</label>
                                    <img width={80}  src={chips} />
                                    <label> {user.credit} </label>
                                    <label>{user.action}</label>
                                </PlayerContainer>
                            );
                        }
                    })}


                </PlayersContainer>
                <TableCardContainer>
                    <PotContainer>  <img width={80}  src={chips} />
                        <label>{this.state.potAmount} </label></PotContainer>
                    <CardContainer>
                        <img width={95}  src={this.state.tablecard1} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={this.state.tablecard2} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={this.state.tablecard3} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={this.state.tablecard4} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={this.state.tablecard5} />
                    </CardContainer>

                </TableCardContainer>



                <ControlContainer>
                    <label>{this.state.activeUsername}</label>

                    <HandCardContainer>
                        <CardContainer>
                            <img width={95}  src={this.state.posh1} />
                        </CardContainer>
                        <CardContainer>
                            <img width={95}  src={this.state.posh2} />
                        </CardContainer>
                    </HandCardContainer>
                    <PotContainer>
                        <img width={80}  src={chips} />
                        <label>{this.state.playerCredit}</label>
                    </PotContainer>
                    <HandCardContainer>
                        <Label>This are the winning stats of this player: xy</Label>
                    </HandCardContainer>


                </ControlContainer>

                <ChatContainer>

                    <Chat >
                    </Chat>
                </ChatContainer>


                <Button
                    style = {{width: '15%'}}
                    margin-bottom="40px"
                    height="30%"
                    onClick={() => {
                        this.getOddsPreFlop();

                    }}
                >
                    Leave Game
                </Button>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameScreenSpectator);