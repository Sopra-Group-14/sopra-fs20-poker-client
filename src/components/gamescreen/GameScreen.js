import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import chips from '../../graphics/chips.png';
import GameLog from "../shared/models/GameLog";
import {graphicsList} from '../../images'
import Card from "../shared/models/Card";
import Slider from "../Slider/Slider";
import User from "../shared/models/User";
import Player from "../../views/Player";
import {Chat} from "../chat/Chat";


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
     box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
     border-radius: 8px;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `;
const ActivePlayerContainer = styled.div`
     border: 2px solid rgba(189,47,12,.85);
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
  height: flex;
  top: 0px;
  right: 0px;
  bottom: 0px
`;
const TableCardContainer = styled.div`

  padding-top: 60px; 
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
  justify-content: top; 
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
  justify-content: top;  
`;

const ButtonContainerRow = styled.div`
  margin: auto;
  flex-direction: row;
  width: 200px;
  display: flex;
  justify-content: center;  
`;
const BoxText = styled.div`
 margin-top: 5px;
 margin-left: 18px;
 width: 600px; 
 text-align: top;
 justify-content: top; 
`;


const ContainerRow = styled.div`
  margin-bottom: 20px;
  width: 600px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
`;
const ControlContainer= styled.div`
  margin: auto;
  border: 1px solid #FFFFFF;
  margin-top: 30px;
  width: 600px; 
  height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: top;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center
`;
class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            //User
            username:null,
            playerCredit:null,

            //Cards
            tablecards: [],
            handcards: null,

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
            lastPlayer: null,
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
            bigBlind : null,
            smallBlind : null,
            userState : null,
            possibleRaiseAndBetAmount: null,

            gameRules : null,
            sliderMin : null,
            sliderStart : null,

            //Conditional Button Rendering
            betraisebuttontext: "Bet",
            input_cancel_visible: false,
            inputfieldvisible: false,
            call_visible: false,
            raise_visible: false,
            check_visible: true,
            bet_visible: true,
            controlContainerBorder: "",
            betorsmallblind: "Bet",
            raiseorbigblind: "Raise",

            raiseAmountInput: 50,

            betSmallBlindDone: false,
            betBigBlindDone: false,

            betBigBlind: false,
            betSmallBlind: false


        };
    }

    async getGamelog(){
        //localStorage.setItem("gameId", "4");
        //Koni const response = await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/'+ localStorage.getItem("gameId"));

        this.handleInputChange("lastPlayer",this.state.activePlayerId);
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
        this.handleInputChange('bigBlind', gamelog.bigBlind);
        this.handleInputChange('smallBlind', gamelog.smallBlind);
        this.handleInputChange('possibleRaiseAndBetAmount', gamelog.possibleRaiseAndBetAmount);
        this.handleInputChange('gameRules', gamelog.gameRules);



        //Make white border on ControlContainer if its your turn
        if(localStorage.getItem("id") === String(this.state.nextPlayerId)){
            this.handleInputChange('controlContainerBorder', "1px solid #FFFFFF");
        }
        else{
            this.handleInputChange('controlContainerBorder', "");
        }

        if(this.state.roundOver === true){
            this.handleInputChange('betSmallBlindDone', false);
            this.handleInputChange('betBigBlindDone', false);
        }

        if(this.state.gameRules === 'fixed limit'){
            this.handleInputChange('raiseAmountInput', this.state.possibleRaiseAndBetAmount);

        }
    }

    async getUser(){

        const response = await api.get('/users/' + localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});

        //localStorage.setItem("id", "4");
        //const response= await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/users/'+localStorage.getItem("id"));
        const user = new User(response.data);

        this.handleInputChange('username', user.username);

        //this.handleInputChange("playerCredit", user.credit);
       //alert(this.state.playerCredit);

        //alert(user.credit);
    }

    async nextRound(){
        const response = await api.get('/games/' + localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});
        let gamelog = new GameLog(response.data);
        if (gamelog.winner != null){
            let name = gamelog.winner.playerName;
            localStorage.setItem("winner", name);
            alert("this is name:" + name);

        }
    }

    async displayHandCards() {
        try {

            //Backend with Postman:
            //localStorage.setItem("gameId", "2");
            //localStorage.setItem("playerId", "1");
            //Lara  const response =  await api.get('https://55ce2f77-077f-4f6d-ad1a-8309f37a15f3.mock.pstmn.io/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));

            //const response =  await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));
            
            const response =  await api.get('/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});
            console.log("response body " + response);
            const player = response.data;
            this.state.handcards = player.hand;


            this.setState({ ["posh1"]: this.getImageOfCard(this.state.handcards[0])});
            this.setState({ ["posh2"]: this.getImageOfCard(this.state.handcards[1])});
            this.handleInputChange("playerCredit", player.credit);


        } catch (error) {
            alert(`Something went wrong when trying to load the hand cards: \n${handleError(error)}`);
        }

    }

    async displayTableCards() {
        try {

            //Backend with Postman:
            //4815cd7c29cb7c36a056db26c938e16ab48a74a9
            //localStorage.setItem("gameId", "2");
            //const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
            const response = await api.get('/games/' + localStorage.getItem("gameId"),/*{headers:{ Authorization: localStorage.getItem("token")}}*/);

            let gamelog = new GameLog(response.data);
            this.state.tablecards = gamelog.revealedCards;

            //testing purposes
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


/*
            if(this.state.tablecards[0] !== undefined) {
                this.setState({["tablecard1"]: this.getImageOfCard(this.state.tablecards[0])});
            }
            if(this.state.tablecards[1] !== undefined) {
                this.setState({["tablecard2"]: this.getImageOfCard(this.state.tablecards[1])})
            }
            if(this.state.tablecards[2] !== undefined) {
                this.setState({["tablecard3"]: this.getImageOfCard(this.state.tablecards[2])});
            }
            if(this.state.tablecards[3] !== undefined) {
                this.setState({["tablecard4"]: this.getImageOfCard(this.state.tablecards[3])});
            }
            if(this.state.tablecards[4] !== undefined) {
                this.setState({["tablecard5"]: this.getImageOfCard(this.state.tablecards[4])});
            }

*/
        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }

    }

    getImageOfCard(card){
        let cardname = card.suit + card.rank;
        return graphicsList.find(data => data.name === cardname).src;
    }



    async whatButtonsToDisplay(){
        //localStorage.setItem("gameId", "2");
        //const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
        const response = await api.get('/games/' + localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});
        const gamelog = new GameLog(response.data);
        if(this.state.input_cancel_visible){
            return;
        }
        if(gamelog.possibleActions.includes("BET")){
            this.handleInputChange("betraisebuttontext", "Bet");
            this.handleInputChange("bet_visible", true)
        }
        else{
            this.handleInputChange("bet_visible", false)
        }

        if(gamelog.possibleActions.includes("RAISE")){
            this.handleInputChange("betraisebuttontext", "Raise");
            this.handleInputChange("raise_visible", true)
        }
        else{
            this.handleInputChange("raise_visible", false)
        }

        if(gamelog.possibleActions.includes("CHECK")){
            this.handleInputChange("check_visible", true)
        }
        else{
            this.handleInputChange("check_visible", false)
        }

        if(gamelog.possibleActions.includes("CALL")){
            this.handleInputChange("call_visible", true)
        }
        else{
            this.handleInputChange("call_visible", false)
        }

        if(gamelog.possibleActions.includes("BET")){
            this.handleInputChange("betraisebuttontext", "Bet");
            this.handleInputChange("bet_visible", true)
        }
        else{
            this.handleInputChange("bet_visible", false)
        }

    }

    async call(){

        const requestBody = JSON.stringify({
            action: "CALL",
            amount: 0,
            //token: localStorage.getItem("token") ,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async check(){
        const requestBody = JSON.stringify({
            action: "CHECK",
            amount: 0,
            //token: localStorage.getItem("token") ,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async fold(){
        const requestBody = JSON.stringify({
            action: "FOLD",
            amount: 0,
            //token: localStorage.getItem("token") ,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async raise(){
        const requestBody = JSON.stringify({
            action: "RAISE",
            amount: this.state.raiseAmountInput,
            //token: localStorage.getItem("token") ,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async bet(){
        const requestBody = JSON.stringify({
            action: "BET",
            amount: this.state.raiseAmountInput,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async betSmallBlind(){
        this.handleInputChange("betSmallBlindDone", true);
        this.handleInputChange("betSmallBlind", false);
        this.handleInputChange("betorsmallblind", "Bet");
        const requestBody = JSON.stringify({
            action: "BET",
            amount: 5,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async betBigBlind(){
        this.handleInputChange("betBigBlindDone", true);
        this.handleInputChange("betBigBlind", false);
        this.handleInputChange("raiseorbigblind", "Raise");
        const requestBody = JSON.stringify({
            action: "RAISE",
            amount: 5,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async leave(){
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/leave', localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}})
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});$
        this.setState({ [key]: value });
    }


    callbackFunction = (data) => {
        this.setState({raiseAmountInput: data})
    };

    async blind() {

        let player = new User(this.state.bigBlind);
        let player2 = new User(this.state.smallBlind);


        if (localStorage.getItem("id") === String(player.id)) {
            this.state.userState = "you are Big Blind";
            if (this.state.gameRound === "Preflop" && !this.state.betBigBlindDone) {
                this.handleInputChange("betBigBlind", true);
                this.handleInputChange("raiseorbigblind", "BigBlind");
            }

            else {
                //this.handleInputChange("betBigBlind", false);
                //this.handleInputChange("raiseorbigblind", "Raise");
            }
        } else {
            this.state.userState = "";
            //this.handleInputChange("betBigBlind", false);
            //this.handleInputChange("raiseorbigblind", "Raise");
        }




        if (localStorage.getItem("id") === String(player2.id)) {
            this.state.userState = "you are Small Blind";
            if (this.state.gameRound === "Preflop" && !this.state.betSmallBlindDone) {
                this.handleInputChange("betSmallBlind", true);
                this.handleInputChange("betorsmallblind", "SmallBlind");
            }
            else {
                //this.handleInputChange("betSmallBlind", false);
                //this.handleInputChange("betorsmallblind", "Bet");
            }
        } else {
            //this.handleInputChange("betSmallBlind", false);
            //this.handleInputChange("betorsmallblind", "Bet");
        }
    }



        /*else{
            this.state.userState = "";
            this.handleInputChange("betSmallBlind", false);
            this.handleInputChange("betBigBlind", false);
            this.handleInputChange("betorsmallblind", "Bet");
            this.handleInputChange("raiseorbigblind", "Raise");
        }

         */

    playRound(){
        if(this.state.gameOver === false){
            this.getGamelog();
            this.getUser();
            this.blind();
            this.displayHandCards();
            this.displayTableCards();
            this.whatButtonsToDisplay();
        }
        this.nextRound();
        if(this.state.gameOver === true){
            localStorage.setItem("winner", this.state.winner);
            this.props.history.push(`/endscreen`);

        }
    }



    tick() {
        //alert("Everything gets refreshed");
        this.playRound();

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.blind();
        this.getGamelog();
        this.getUser();
        this.displayHandCards();
        this.displayTableCards();
        this.whatButtonsToDisplay();
        this.interval = setInterval(() => this.tick(), 1000);

    }


    /*
    {this.state.inputfieldvisible ? <Slider
        color={"#C14E4E"}
        /> : null}

        {this.state.inputfieldvisible ? <InputFieldRaise
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('raiseAmountInput', e.target.value);
                            }}
                        /> : null}
     */
    render() {
        /*window.onbeforeunload = function() {
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
                        if(user.playerName === this.state.username){
                            return;
                        }

                        else if (user.id === this.state.nextPlayerId){
                            return(
                                <ActivePlayerContainer key={user.id}>
                                    <Label>{user.playerName}</Label>
                                    <img width={80}  src={chips} />
                                    <Label> {user.credit} </Label>
                                </ActivePlayerContainer>
                            );
                        }
                        else if(user.id === this.state.lastPlayer){
                                return(
                                    <PlayerContainer key={user.id}>
                                        <Label>{user.playerName}</Label>
                                        <img width={80}  src={chips} />
                                        <Label> {user.credit} </Label>
                                        <Label>{this.state.action}</Label>
                                    </PlayerContainer>
                                )
                            }
                         else{
                            return (
                                <PlayerContainer key={user.id}>
                                    <Label>{user.playerName}</Label>
                                    <img width={80}  src={chips} />
                                    <Label> {user.credit} </Label>
                                </PlayerContainer>
                            );
                        }

                    }
                        )
                    }

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

                <ControlContainer
                    style={{"border": this.state.controlContainerBorder}}>
                    <BoxText><Label>{this.state.username+ "     " +this.state.userState} </Label></BoxText>

                    <ContainerRow>
                    <ButtonContainer>
                        {this.state.call_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                this.call();
                                this.handleInputChange("inputfieldvisible", false);
                                this.handleInputChange("input_cancel_visible", false);
                            }}
                        >
                            Call
                        </Button> : null}

                        {this.state.check_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                this.check();
                                this.handleInputChange("inputfieldvisible", false);
                                this.handleInputChange("input_cancel_visible", false);
                            }}
                        >
                            Check
                        </Button> : null}

                        {this.state.bet_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if(this.state.betSmallBlind){
                                    this.handleInputChange("nextPlayerId", null);
                                    this.betSmallBlind();
                                    //this.handleInputChange("betorsmallblind", "Bet");
                                }
                                else {
                                    this.handleInputChange("inputfieldvisible", true);
                                    this.handleInputChange("input_cancel_visible", true);
                                    this.handleInputChange("bet_visible", false);
                                    this.handleInputChange("raiseAmountInput", 0);
                                }
                            }}
                        >
                            {this.state.betorsmallblind}
                        </Button> : null}

                        {this.state.raise_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if(this.state.betBigBlind){
                                    this.handleInputChange("nextPlayerId", null);
                                    this.betBigBlind();
                                    //this.handleInputChange("raiseorbigblind", "Raise");
                                }
                                else {
                                    this.handleInputChange("inputfieldvisible", true);
                                    this.handleInputChange("input_cancel_visible", true);
                                    this.handleInputChange("raise_visible", false);
                                    this.handleInputChange("raiseAmountInput", 0);
                                }
                            }}
                        >
                            {this.state.raiseorbigblind}
                        </Button> : null}

                        {this.state.input_cancel_visible ? <ButtonContainerRow>
                            {this.state.input_cancel_visible ? <Button
                                height="30%"
                                width="50%"
                                disabled={this.state.raiseAmountInput === null || this.state.raiseAmountInput === ""}
                                onClick={() => {
                                    if(this.state.betraisebuttontext === "Raise") {
                                        this.handleInputChange("nextPlayerId", null);
                                        this.raise();
                                        //alert("raise" + this.state.raiseAmountInput)
                                    }
                                    if(this.state.betraisebuttontext === "Bet") {
                                        this.handleInputChange("nextPlayerId", null);
                                        this.bet();
                                        //alert("bet" + this.state.raiseAmountInput)
                                    }
                                    if(this.state.betraisebuttontext === "Raise") {
                                        this.handleInputChange("raise_visible", true);
                                    }
                                    if(this.state.betraisebuttontext === "Bet") {
                                        this.handleInputChange("bet_visible", true);
                                    }
                                    this.handleInputChange("input_cancel_visible", false);
                                    this.handleInputChange("inputfieldvisible", false);
                                }}
                            >
                                {this.state.betraisebuttontext}
                            </Button> : null}

                            {this.state.input_cancel_visible ? <Button
                                height="30%"
                                width="50%"
                                style = {{marginLeft: 5}}
                                disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                                onClick={() => {
                                    if(this.state.betraisebuttontext === "Raise") {
                                        this.handleInputChange("raise_visible", true);
                                    }
                                    if(this.state.betraisebuttontext === "Bet") {
                                        this.handleInputChange("bet_visible", true);
                                    }
                                    this.handleInputChange("input_cancel_visible", false);
                                    this.handleInputChange("inputfieldvisible", false);
                                }}
                            >
                                Cancel
                            </Button> : null}
                        </ButtonContainerRow> : null}

                        {(this.state.inputfieldvisible && this.state.gameRules !== 'fixed limit') ?
                            <Slider max={this.state.possibleRaiseAndBetAmount}
                                    handleraiseAmountInput={this.callbackFunction}
                                    key={'raiseAmountInput'}
                                    color={"#c14e4e"}
                            /> : null}

                        {(this.state.inputfieldvisible && this.state.gameRules === 'fixed limit') ?
                            <Label>Fixed Limit to: {this.state.possibleRaiseAndBetAmount}</Label> : null}

                        <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                this.fold();
                            }}
                        >
                            Fold
                        </Button>
                    </ButtonContainer>

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
                    </ContainerRow>
                </ControlContainer>

                <Button
                    style = {{width: '15%'}}
                margin-bottom="40px"
                    height="30%"
                    onClick={() => {
                        this.leave();
                        localStorage.removeItem('gameId');
                        this.props.history.push(`/dashboard`);
                    }}
                >
                    Leave Game
                </Button>
                <ChatContainer>
                    <Chat >
                    </Chat>

                </ChatContainer>

            </BaseContainer>
         </StyledBody>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameScreen);

/*   <h1>Player Chat</h1>

                    <InputField
                        placeholder="new message"
                        onChange={e => {
                            this.handleInputChange('message', e.target.value);
                        }}
                    />

  */