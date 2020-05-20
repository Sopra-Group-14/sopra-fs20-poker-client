import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
//import {Button} from '../../views/design/Button';
import chips from '../../graphics/chips.png';
import GameLog from "../shared/models/GameLog";
import {graphicsList} from '../../images'
import Card from "../shared/models/Card";
import Slider from "../Slider/Slider";
import User from "../shared/models/User";
import {Chat} from "../chat/Chat";
import PreFlopOdds from "../shared/models/OddsPreFlop";
import OddsFlopTurnRiver from "../shared/models/OddsFlopTurnRiver";
import {Spinner} from "../../views/design/Spinner";

const Button = styled.div`
  &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    background: rgba(189,47,12,1);
    
  }
  line-height: 35px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 15px;
  text-align: center;
  padding: 0px;
  margin-top: 15px; 
  color: #000000;
  margin-left: 0%
  margin-right: 0%
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
     background: rgba(189,47,12,.85);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 900;
  color: $black;
  text-transform: uppercase;
`;

const StyledBody = styled.div`
 background: rgb(48,152,58);
background: radial-gradient(circle, rgba(48,152,58,1) 12%, rgba(30,62,0,1) 82%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;
const BoxText = styled.div`
 margin-top: 5px;
 margin-left: 18px;
 width: 600px; 
 text-align: top;
 justify-content: top; 
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
     border: 1px solid #FFFFFF;
     width: 100px;
     height: 119px;
     text-color: #FFFFFF;
     box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
     border-radius: 8px;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `;
const ActivePlayerContainer = styled.div`
     background: rgba(0,0,0,0.85); 
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
  border: 1px solid #FFFFFF;
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
  border: 1px solid #FFFFFF;
  text-align: center;
  position: absolute;
  width: 230px;
  height: 100%;
  top: 0px;
  right: 0px;
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

const ContainerRow = styled.div`
  margin-bottom: 20px;
  width: 800px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
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
     border: 1px solid #FFFFFF;

  margin: auto;
  margin-top: 30px;
  width: 600px; 
  height: 250px;
  display: flex;
  flex-direction: row;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: space-between;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 500;
  font-size: 15px;
  color:#FFFFFF;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const LabelOdds = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 500;
  font-size: 15px;
  color:#FFFFFF;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 5px;
  text-align: right;
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
            apihand: [],
            apitable: [],

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
            //preflop
            preflop_HC : null,
            preflop_1P : null,
            preflop_2P : null,
            preflop_3K : null,
            preflop_ST : null,
            preflop_FL : null,
            preflop_FH : null,
            preflop_4K : null,
            preflop_SF : null,

            //flop, turn & river
            flop_prob : null,
            turn_prob : null,
            river_prob : null,

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
            //debugger;
            //console.log("response body " + response);
            const player = response.data;
            this.state.handcards = player.hand;
            this.state.apihand = player.apiHand;

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

    async getOddsPreFlop(){
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/pre-flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const preflop = new PreFlopOdds(response.data);
        this.setState({['preflop_HC']: preflop.data.hit['HC'].toFixed(5)*100});
        this.setState({['preflop_1P']: preflop.data.hit['1P'].toFixed(5)*100});
        this.setState({['preflop_2P']: preflop.data.hit['2P'].toFixed(5)*100});
        this.setState({['preflop_3K']: preflop.data.hit['3K'].toFixed(5)*100});
        this.setState({['preflop_ST']: preflop.data.hit['ST'].toFixed(5)*100});
        this.setState({['preflop_FL']: preflop.data.hit['FL'].toFixed(5)*100});
        this.setState({['preflop_FH']: preflop.data.hit['FH'].toFixed(5)*100});
        this.setState({['preflop_4K']: preflop.data.hit['4K'].toFixed(5)*100});
        this.setState({['preflop_SF']: preflop.data.hit['SF'].toFixed(5)*100});

        /*
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/pre-flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1]);
        xhr.setRequestHeader("x-rapidapi-host", "sf-api-on-demand-poker-odds-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0");

        await xhr.send(data);

        xhr.onload = function () {
            const preflop = new PreFlopOdds(xhr.response);
            //alert(preflop.data.hit['3K']);

            localStorage.setItem('preflop_HC', preflop.data.hit['HC'].toFixed(2)*100);
            localStorage.setItem('preflop_1P', preflop.data.hit['1P'].toFixed(2)*100);
            localStorage.setItem('preflop_2P', preflop.data.hit['2P'].toFixed(2)*100);
            localStorage.setItem('preflop_3K', preflop.data.hit['3K'].toFixed(2)*100);
            localStorage.setItem('preflop_ST', preflop.data.hit['ST'].toFixed(5 )*100);
            localStorage.setItem('preflop_FL', preflop.data.hit['FL'].toFixed(5)*100);
            localStorage.setItem('preflop_FH', preflop.data.hit['FH'].toFixed(5)*100);
            localStorage.setItem('preflop_4K', preflop.data.hit['4K'].toFixed(5)*100);
            localStorage.setItem('preflop_SF', preflop.data.hit['SF'].toFixed(5)*100);
        };
        */
    }

    async getOddsFlop(){
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['flop_prob']: flop.data.winning.average['probability']});
        /*
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.open("GET", "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2]);
        xhr.setRequestHeader("x-rapidapi-host", "sf-api-on-demand-poker-odds-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0");
        xhr.send(data);
        xhr.onload = function () {
            const flop = new OddsFlopTurnRiver(xhr.response);
            localStorage.setItem('flop_prob', flop.data.winning.average['probability']);
        };
         */
    }

    async getOddsTurn(){
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/turn?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['turn_prob']: flop.data.winning.average['probability']});
        /*
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        //flop?hole=Ac%252C3c&board=As%252C2h%252CTh
        xhr.open("GET", "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/turn?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3]);
        xhr.setRequestHeader("x-rapidapi-host", "sf-api-on-demand-poker-odds-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0");
        xhr.send(data);
        xhr.onload = function () {
            const flop = new OddsFlopTurnRiver(xhr.response);
            localStorage.setItem('turn_prob', flop.data.winning.average['probability']);
            //alert(localStorage.getItem('flop_prob'))
        };
        */
    }

    async getOddsRiver(){
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/river?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3]  + "%2C" + this.state.apitable[4],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['river_prob']: flop.data.winning['probability']});

        /*
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.open("GET", "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/river?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3]  + "%2C" + this.state.apitable[4]);
        xhr.setRequestHeader("x-rapidapi-host", "sf-api-on-demand-poker-odds-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0");
        xhr.send(data);
        xhr.onload = function () {
            const flop = new OddsFlopTurnRiver(xhr.response);
            localStorage.setItem('river_prob', flop.data.winning['probability']);
        };
         */
    }

    async displayTableCards() {
        try {

            const response = await api.get('/games/' + localStorage.getItem("gameId"),/*{headers:{ Authorization: localStorage.getItem("token")}}*/);

            let gamelog = new GameLog(response.data);
            this.state.tablecards = gamelog.revealedCards;
            this.state.apitable = gamelog.revealedAPICards;

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
        //this.displayHandCards();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    componentDidMount() {
        this.getGamelog();
        this.displayTableCards();
        this.interval = setInterval(() => this.tick(), 3000);
    }



    render() {
      /*  window.onbeforeunload = function() {
            localStorage.removeItem('spectatorId');
            localStorage.removeItem('gameId');
            localStorage.removeItem('token');
            localStorage.removeItem('winner');
            localStorage.removeItem('playerId');
            localStorage.removeItem('id');

            return '';
        };*/
        return (
            <StyledBody>
                <BaseContainer
                    style = {{"margin-top": '10px'}}
                >

                <PlayersContainer>
                    {this.state.players.map(user => {
                        if(user.id === this.state.activePlayerId){
                            this.state.activehandcards = user.handcards;
                            this.state.activeplayerCredit = user.credit;
                            this.state.activeUsername = user.playerName;
                            return(
                                <PlayerContainer key={user.id} >
                                    <Label>{user.playerName}</Label>
                                    <img width={80}  src={chips} />
                                    <Label> {user.credit} </Label>
                                    <Label>{user.action}</Label>
                                </PlayerContainer>
                            )
                        } else {
                            return (
                                <PlayerContainer style={{cursor: "pointer"}} key={user.id}  onClick={() => {
                                    this.handleInputChange("activePlayerId",user.id);
                                }}   >
                                    <Label>{user.playerName}</Label>
                                    <img width={80}  src={chips} />
                                    <Label> {user.credit} </Label>
                                    <Label>{user.action}</Label>
                                </PlayerContainer>
                            );
                        }
                    })}


                </PlayersContainer>
                <TableCardContainer>
                    <PotContainer>  <img width={80}  src={chips} />
                        <Label>{this.state.potAmount} </Label></PotContainer>
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
                    <BoxText><Label>{this.state.activeUsername }</Label></BoxText>

                    <ContainerRow>
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

                    {this.state.gameRound === 'Preflop' ? <HandCardContainer
                        style={{"flex-direction": "column"}}>
                        <Label
                            style={{"margin-bottom": "5px"}}>
                            Odds for</Label>
                        <LabelOdds>High Card: {this.state.preflop_HC}%</LabelOdds>
                        <LabelOdds>One Pair: {this.state.preflop_1P}%</LabelOdds>
                        <LabelOdds>Two Pair: {this.state.preflop_2P}% </LabelOdds>
                        <LabelOdds>Three of a Kind: {this.state.preflop_3K}%</LabelOdds>
                        <LabelOdds>Straight: {this.state.preflop_ST}%</LabelOdds>
                        <LabelOdds>Flush: {this.state.preflop_FL}%</LabelOdds>
                        <LabelOdds>Full House: {this.state.preflop_FH}%</LabelOdds>
                        <LabelOdds>Four of a Kind: {this.state.preflop_4K}%</LabelOdds>
                        <LabelOdds>Straight Flush: {this.state.preflop_SF}%</LabelOdds>
                        <Button
                            style = {{width: '80%'}}
                            margin-bottom="40px"
                            height="30%"
                            onClick={() => {
                                this.getOddsPreFlop();

                            }}
                        >
                            Get Odds
                        </Button>
                    </HandCardContainer> : null}

                    {this.state.gameRound === 'Flop' ? <HandCardContainer
                        style={{"flex-direction": "column"}}>
                        <Label>Winning Probability Flop for average Hand: {this.state.flop_prob}</Label>
                        <Button
                            style = {{width: '80%'}}
                            margin-bottom="40px"
                            height="30%"
                            onClick={() => {
                                this.getOddsFlop();

                            }}
                        >
                            Get Odds
                        </Button>
                    </HandCardContainer> : null}

                    {this.state.gameRound === 'TurnCard' ? <HandCardContainer
                        style={{"flex-direction": "column"}}>
                        <Label>Winning Probability Turn for average Hand : {this.state.turn_prob}</Label>
                        <Button
                            style = {{width: '80%'}}
                            margin-bottom="40px"
                            height="30%"
                            onClick={() => {
                                this.getOddsTurn();

                            }}
                        >
                            Get Odds
                        </Button>
                    </HandCardContainer> : null}

                    {this.state.gameRound === 'RiverCard' ? <HandCardContainer
                        style={{"flex-direction": "column"}}>
                        <Label>Winning Probability: {this.state.river_prob}</Label>
                        <Button
                            style = {{width: '80%'}}
                            margin-bottom="40px"
                            height="30%"
                            onClick={() => {
                                this.getOddsRiver();

                            }}
                        >
                            Get Odds
                        </Button>
                    </HandCardContainer> : null}
                    </ContainerRow>
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
                        localStorage.removeItem("Spectator")
                    }}
                >
                    Leave Game
                </Button>
            </BaseContainer>
            </StyledBody>
        );

    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameScreenSpectator);