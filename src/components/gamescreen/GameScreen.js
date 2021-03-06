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
import Popup from "reactjs-popup";


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
            lastPlayerId: null,

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
            fold_visible : true,
            controlContainerBorder: "",
            betorsmallblind: "Bet",
            raiseorbigblind: "Raise",

            raiseAmountInput: 50,

            betSmallBlindDone: false,
            betBigBlindDone: false,

            betBigBlind: false,
            betSmallBlind: false,

            showSmallBlindButton: null,
            showBigBlindButton: null,

            popup:false,
            winnerName: null,
            winnerComboValue: null,
            winners: null,
            roundWinnerText: null,
            userBalance: null,

        };
    }

    async getGamelog(){
        this.handleInputChange('lastPlayerId',this.state.nextPlayerId);

        const response = await api.get('/games/' + localStorage.getItem("gameId"));
        let gamelog = new GameLog(response.data);

        let oldSmallBlind = new User(this.state.smallBlind);
        let oldSmallBLindId = oldSmallBlind.id;

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
        this.handleInputChange('winners', gamelog.winners);
        this.handleInputChange('winnerComboValue', gamelog.winnerComboValue);
        this.handleInputChange('wonAmount', gamelog.wonAmount);



        let newSmallBlind = new User(this.state.smallBlind);
        let newSmallBLindId = newSmallBlind.id;

        //Make white border on ControlContainer if its your turn
        if(localStorage.getItem("id") === String(this.state.nextPlayerId)){
            this.handleInputChange('controlContainerBorder', "1px solid #FFFFFF");
        }
        else{
            this.handleInputChange('controlContainerBorder', "");
        }

        if(oldSmallBLindId !== newSmallBLindId){
            //Happens whenever a new round starts
            this.blind();
            if(!(this.state.transactionNr === 0)) {

                if(this.state.winners.length === 1){
                    let winner = new User(this.state.winners[0]);
                    this.handleInputChange('winnerName', winner.playerName);
                    this.handleInputChange('roundWinnerText', ' won the pot of ' + this.state.wonAmount + ' Credits ');
                }

                else {
                    this.handleInputChange('roundWinnerText', ' split the pot of ' + this.state.wonAmount + ' Credits ');
                    let winner = new User(this.state.winners[0]);
                    this.handleInputChange('winnerName', winner.playerName);
                    for (let i = 1; i < this.state.winners.length; i++){
                        let winner = new User(this.state.winners[i]);
                        this.state.winnerName += ' & ' + winner.playerName
                    }
                }
                this.handleInputChange('popup', true);

            }
            setTimeout(() => {
                this.setState({popup: false});
            }, 10000);


            let playerlist = this.state.players;
            for (let i = 0; i < playerlist.length; i++){
                let user = new User(playerlist[i]);
                if(localStorage.getItem("id") === String(user.id) && user.credit < 10){
                    await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/leave',{}, {headers:{ Authorization: localStorage.getItem("token")}})
                    this.props.history.push(`/dashboard`);
                    alert('You got kicked from the round because you dont have any credits left')
                }
            }



        }

        if(this.state.gameRules === 'fixed limit'){
            this.handleInputChange('raiseAmountInput', this.state.possibleRaiseAndBetAmount);

        }
    }

    async getUser(){

        const response = await api.get('/users/' + localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});
        const user = new User(response.data);

        this.handleInputChange('username', user.username);


        if((this.state.transactionNr === 0)) {

            this.handleInputChange('userBalance',user.balance);
            console.log(user.balance);
        }
    }

    async nextRound(){
        const response = await api.get('/games/' + localStorage.getItem("gameId"),{headers:{ Authorization: localStorage.getItem("token")}});
        let gamelog = new GameLog(response.data);
        if (gamelog.winner != null){
            let name = gamelog.winner.playerName;
            localStorage.setItem("winner", name);
        }


    }

    async displayHandCards() {
        try {

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


        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }

    }

    getImageOfCard(card){
        let cardname = card.suit + card.rank;
        return graphicsList.find(data => data.name === cardname).src;
    }



    async whatButtonsToDisplay(){
        this.handleInputChange('lastPlayerId',this.state.nextPlayerId);
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

        if(gamelog.possibleActions.includes("FOLD")){
            this.handleInputChange("fold_visible", true)
        }
        else{
            this.handleInputChange("fold_visible", false)
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
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async fold(){
        const requestBody = JSON.stringify({
            action: "FOLD",
            amount: 0,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async raise(){
        const requestBody = JSON.stringify({
            action: "RAISE",
            amount: this.state.raiseAmountInput,
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
        this.handleInputChange("showSmallBlindButton", false);

        const requestBody = JSON.stringify({
            action: "BET",
            amount: 5,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }

    async betBigBlind(){
        this.handleInputChange("showBigBlindButton", false);
        const requestBody = JSON.stringify({
            action: "RAISE",
            amount: 5,
        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/actions', requestBody, {headers:{ Authorization: localStorage.getItem("token")}})
    }




    async leave(){
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("id")+'/leave',{}, {headers:{ Authorization: localStorage.getItem("token")}})
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
        let sB = new User(this.state.smallBlind);
        let bB = new User(this.state.bigBlind);
        if(this.state.gameRound === 'Preflop'  || this.state.gameRound === null){
            if (localStorage.getItem("id") === String(sB.id)) {
                this.state.userState = "you are the SmallBlind";
                this.handleInputChange('showSmallBlindButton', true);
            }

            if (localStorage.getItem("id") === String(bB.id)) {
                this.state.userState = "you are the BigBlind";
                this.handleInputChange('showBigBlindButton', true);
            }

    }
        if ((localStorage.getItem("id") !== String(sB.id)) && (localStorage.getItem("id") !== String(bB.id))) {
            this.state.userState = "";
        }
    }

    async addToAccount(){
        let win = this.state.playerCredit - this.state.userBalance;
        console.log(win);
        localStorage.setItem('win',win);

     /*   const requestBody = JSON.stringify({
            amount: win,
        });
        await api.put('/users/' + localStorage.getItem("id") + '/balance', requestBody,{headers:{ Authorization: localStorage.getItem("token")}});
        */
    }

    playRound(){
        if(this.state.gameOver === false){
            this.getGamelog();
            this.getUser();
            this.displayHandCards();
            this.displayTableCards();
            this.whatButtonsToDisplay();


        }
        this.nextRound();

        if(this.state.gameOver === true){
            this.addToAccount();
            this.props.history.push(`/endscreen`);

        }
    }

    tick() {
        this.playRound();

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.getGamelog();
        this.getUser();
        this.displayHandCards();
        this.displayTableCards();
        this.whatButtonsToDisplay();
        this.interval = setInterval(() => this.tick(), 1000);

    }


    render() {
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
                                        <Label>  </Label>
                                    </ActivePlayerContainer>
                                )
                            }
                            else if(user.id === this.state.lastPlayerId){
                                return(
                                    <PlayerContainer key={user.id}>
                                        <Label>{user.playerName}</Label>
                                        <img width={80}  src={chips} />
                                        <Label> {user.credit} </Label>
                                        <Label>{this.state.action}</Label>
                                    </PlayerContainer>
                                )
                            }

                            else {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <Label>{user.playerName}</Label>
                                        <img width={80}  src={chips} />
                                        <Label> {user.credit} </Label>
                                        <Label></Label>
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


                    <Popup
                        open={this.state.popup}
                    >
                        {close => (
                            <div className="modal">
                                <a className="close" onClick={close}>
                                    &times;
                                </a>
                                <div className="header"> Round over </div>
                                <div className="content"
                                     style={{"text-align": 'center'}}>
                                    <p>{this.state.winnerName} {this.state.roundWinnerText}</p>
                                    <p>Hand: {this.state.winnerComboValue}</p>
                                </div>
                                <button
                                    className="button"
                                    onClick={() => {
                                        console.log("closed ");
                                        this.handleInputChange('popup',false);
                                        close();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </Popup>




                <ControlContainer
                    style={{"border": this.state.controlContainerBorder}}>
                    <BoxText><Label>{this.state.username+ "     " +this.state.userState} </Label></BoxText>

                    <ContainerRow>

                        <ButtonContainer>
                            {!this.state.showSmallBlindButton && !this.state.showBigBlindButton ? <ButtonContainer>
                        {this.state.call_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if((localStorage.getItem("id") === String(this.state.nextPlayerId))){
                                    this.handleInputChange("nextPlayerId", null);
                                    this.call();
                                    this.handleInputChange("inputfieldvisible", false);
                                    this.handleInputChange("input_cancel_visible", false);
                                }
                            }}
                        >
                            Call
                        </Button> : null}

                        {this.state.check_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                    this.handleInputChange("nextPlayerId", null);
                                    this.check();
                                    this.handleInputChange("inputfieldvisible", false);
                                    this.handleInputChange("input_cancel_visible", false);
                                }
                            }}
                        >
                            Check
                        </Button> : null}

                        {this.state.bet_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                    this.handleInputChange("inputfieldvisible", true);
                                    this.handleInputChange("input_cancel_visible", true);
                                    this.handleInputChange("bet_visible", false);
                                    this.handleInputChange("raiseAmountInput", 0);
                                }
                            }}
                        >
                            Bet
                        </Button> : null}

                        {this.state.raise_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                    this.handleInputChange("inputfieldvisible", true);
                                    this.handleInputChange("input_cancel_visible", true);
                                    this.handleInputChange("raise_visible", false);
                                    this.handleInputChange("raiseAmountInput", 0);
                                }
                            }}
                        >
                            Raise
                        </Button> : null}

                        {this.state.input_cancel_visible ? <ButtonContainerRow>
                            {this.state.input_cancel_visible ? <Button
                                height="30%"
                                width="50%"
                                disabled={this.state.raiseAmountInput === null || this.state.raiseAmountInput === ""}
                                onClick={() => {
                                    if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                        if (this.state.betraisebuttontext === "Raise") {
                                            this.handleInputChange("nextPlayerId", null);
                                            this.raise();
                                            //alert("raise" + this.state.raiseAmountInput)
                                        }
                                        if (this.state.betraisebuttontext === "Bet") {
                                            this.handleInputChange("nextPlayerId", null);
                                            this.bet();
                                            //alert("bet" + this.state.raiseAmountInput)
                                        }
                                        if (this.state.betraisebuttontext === "Raise") {
                                            this.handleInputChange("raise_visible", true);
                                        }
                                        if (this.state.betraisebuttontext === "Bet") {
                                            this.handleInputChange("bet_visible", true);
                                        }
                                        this.handleInputChange("input_cancel_visible", false);
                                        this.handleInputChange("inputfieldvisible", false);
                                    }
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
                                    if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                        if (this.state.betraisebuttontext === "Raise") {
                                            this.handleInputChange("raise_visible", true);
                                        }
                                        if (this.state.betraisebuttontext === "Bet") {
                                            this.handleInputChange("bet_visible", true);
                                        }
                                        this.handleInputChange("input_cancel_visible", false);
                                        this.handleInputChange("inputfieldvisible", false);
                                    }
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

                                {this.state.fold_visible ? <Button
                            height="30%"
                            disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                            onClick={() => {
                                if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                    this.handleInputChange("nextPlayerId", null);
                                    this.handleInputChange("input_cancel_visible", false);
                                    this.handleInputChange("inputfieldvisible", false);
                                    this.fold();
                                }
                            }}
                        >
                            Fold
                        </Button> : null}

                    </ButtonContainer> : null}
                            {this.state.showSmallBlindButton ? <Button
                                height="30%"
                                disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                                onClick={() => {
                                    if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                        this.handleInputChange("nextPlayerId", null);
                                        this.betSmallBlind();
                                    }
                                }}
                            >
                                Small Blind
                            </Button> : null}

                            {this.state.showBigBlindButton ? <Button
                                height="30%"
                                disabled={!(localStorage.getItem("id") === String(this.state.nextPlayerId))}
                                onClick={() => {
                                    if((localStorage.getItem("id") === String(this.state.nextPlayerId))) {
                                        this.handleInputChange("nextPlayerId", null);
                                        this.betBigBlind();
                                    }
                                }}
                            >
                                Big Blind
                            </Button> : null}
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

