import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import chips from '../../graphics/chips.png';
import GameLog from "../shared/models/GameLog";
import {graphicsList} from '../../images'
import Card from "../shared/models/Card";
import User from "../shared/models/User";
import {Chat} from "../chat/Chat";
import PreFlopOdds from "../shared/models/OddsPreFlop";
import OddsFlopTurnRiver from "../shared/models/OddsFlopTurnRiver";
import {Spinner} from "../../views/design/Spinner";
import Popup from "reactjs-popup";

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
  font-weight: 900;
  font-size: 14px;
  color:#FFFFFF;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 5px;
  text-align: left;
`;

const Container = styled.div`
  margin-left: 0;
  display: flex;
  justify-content: center;
`;

class GameScreenSpectator extends React.Component {
    constructor() {
        super();
        this.state = {


            //ActivePlayer
            activePlayerId:null,
            activeCredit:null,
            activeUsername: null,
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
            lastPlayerId: null,
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

            showOdds : false,
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

            showHandCardSpinner : true,
            showOddsSpinner : false,

            popup:false,
            winnerName: null,
            winnerComboValue: null,
            winners: null,
            roundWinnerText: null,
        };
    }

    async getGamelog(){
        this.handleInputChange('lastPlayerId',this.state.nextPlayerId);

        const response = await api.get('/games/' + localStorage.getItem("gameId"));
        let gamelog = new GameLog(response.data);

        let oldGameround = this.state.gameRound;

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

        if(oldGameround !== this.state.gameRound){
            this.handleInputChange('showOdds', false);
        }

        if(oldSmallBLindId !== newSmallBLindId){
            //Happens whenever a new round starts
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

            if(this.state.gameOver){
                this.props.history.push(`/welcomepage`);
                alert('The Game you were spectating ended')
            }

        }



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
            const response =  await api.get('/games/'+localStorage.getItem("gameId")+'/players/'+this.state.activePlayerId,{headers:{ Authorization: localStorage.getItem("token")}});
            const player = response.data;
            this.state.handcards = player.hand;
            this.state.apihand = player.apiHand;

            this.setState({ ["posh1"]: this.getImageOfCard(this.state.handcards[0])});
            this.setState({ ["posh2"]: this.getImageOfCard(this.state.handcards[1])});
            this.handleInputChange("playerCredit", player.credit);
            this.handleInputChange("showHandCardSpinner", false);


        } catch (error) {
            alert(`Something went wrong when trying to load the hand cards: \n${handleError(error)}`);
        }
    }

    async getOddsPreFlop(){
        this.handleInputChange("showOddsSpinner", true);
        this.handleInputChange('showOdds', true);
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/pre-flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const preflop = new PreFlopOdds(response.data);
        this.setState({['preflop_HC']: Math.round(preflop.data.hit['HC']*10000)/100});
        this.setState({['preflop_1P']: Math.round(preflop.data.hit['1P']*10000)/100});
        this.setState({['preflop_2P']: Math.round(preflop.data.hit['2P']*10000)/100});
        this.setState({['preflop_3K']: Math.round(preflop.data.hit['3K']*10000)/100});
        this.setState({['preflop_ST']: Math.round(preflop.data.hit['ST']*10000)/100});
        this.setState({['preflop_FL']: Math.round(preflop.data.hit['FL']*10000)/100});
        this.setState({['preflop_FH']: Math.round(preflop.data.hit['FH']*10000)/100});
        this.setState({['preflop_4K']: Math.round(preflop.data.hit['4K']*10000)/100});
        this.setState({['preflop_SF']: Math.round(preflop.data.hit['SF']*10000)/100});
        this.handleInputChange("showOddsSpinner", false);
    }

    async getOddsFlop(){
        this.handleInputChange('showOdds', true);
        this.handleInputChange("showOddsSpinner", true);
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/flop?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['flop_prob']: Math.round(flop.data.winning.average['probability']*10000)/100});
        this.handleInputChange("showOddsSpinner", false);
    }

    async getOddsTurn(){
        this.handleInputChange('showOdds', true);
        this.handleInputChange("showOddsSpinner", true);
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/turn?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['turn_prob']: Math.round(flop.data.winning.average['probability']*10000)/100});
        this.handleInputChange("showOddsSpinner", false);
    }

    async getOddsRiver(){
        this.handleInputChange('showOdds', true);
        this.handleInputChange("showOddsSpinner", true);
        const response = await api.get( "https://sf-api-on-demand-poker-odds-v1.p.rapidapi.com/river?hole=" + this.state.apihand[0] + "%2C" + this.state.apihand[1] + '&board=' + this.state.apitable[0]  + "%2C" + this.state.apitable[1]  + "%2C" + this.state.apitable[2] + "%2C" + this.state.apitable[3]  + "%2C" + this.state.apitable[4],{headers:{ 'x-rapidapi-host': "sf-api-on-demand-poker-odds-v1.p.rapidapi.com", "x-rapidapi-key": "0e8a2198bcmshfdab5782d98fb8fp19cd2djsnaa0933d2edf0"}});
        const flop = new OddsFlopTurnRiver(response.data);
        this.setState({ ['river_prob']: Math.round(flop.data.winning['probability']*10000)/100});
        this.handleInputChange("showOddsSpinner", false);

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
        localStorage.removeItem('Spectator');
        localStorage.removeItem('gameId');

        if (localStorage.getItem('id') === null){
            this.props.history.push(`/welcomepage`);
        }
        else{
            this.props.history.push('/dashboard')
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});$
        this.setState({ [key]: value });
    }


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
        this.playRound();
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
        return (
            <StyledBody>
                <BaseContainer
                    style = {{"margin-top": '10px'}}
                >

                <PlayersContainer>
                    {this.state.players.map(user => {

                     if (user.id === this.state.nextPlayerId){
                                    return(
                                        <ActivePlayerContainer key={user.id} style={{cursor: "pointer"}} key={user.id}  onClick={() => {
                                            this.handleInputChange("showHandCardSpinner", true);
                                            this.handleInputChange("activePlayerId", user.id);
                                            this.handleInputChange('showOdds', false);
                                            this.handleInputChange('activeUsername',user.playerName);
                                        }}  >
                                            <Label>{user.playerName}</Label>
                                            <img width={80}  src={chips} />
                                            <Label> {user.credit} </Label>
                                            <Label>  </Label>
                                        </ActivePlayerContainer>
                                    )
                     } else if(user.id === this.state.lastPlayerId){
                                    return(
                                        <PlayerContainer key={user.id} style={{cursor: "pointer"}} key={user.id}  onClick={() => {
                                            this.handleInputChange("showHandCardSpinner", true);
                                            this.handleInputChange("activePlayerId",user.id);
                                            this.handleInputChange('showOdds', false);
                                            this.handleInputChange('activeUsername',user.playerName);
                                        }}  >
                                            <Label>{user.playerName}</Label>
                                            <img width={80}  src={chips} />
                                            <Label> {user.credit} </Label>
                                            <Label>{this.state.action}</Label>
                                        </PlayerContainer>
                                    )
                                }
                     else {
                         return(
                             <PlayerContainer key={user.id}style={{cursor: "pointer"}} key={user.id}  onClick={() => {
                                 this.handleInputChange("showHandCardSpinner", true);
                                 this.handleInputChange("activePlayerId",user.id);
                                 this.handleInputChange('showOdds', false);
                                 this.handleInputChange('activeUsername',user.playerName);

                             }}  >
                                 <Label>{user.playerName}</Label>
                                 <img width={80}  src={chips} />
                                 <Label> {user.credit} </Label>
                                 <Label></Label>
                             </PlayerContainer>
                         );
                     }
                       if(user.id === this.state.activePlayerId) {
                               this.state.activehandcards = user.handcards;
                               this.state.activeplayerCredit = user.credit;
                               this.state.activeUsername = user.playerName;
                            return (
                                <PlayerContainer  >
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




                    <ControlContainer>
                    <BoxText><Label>{this.state.activeUsername }</Label></BoxText>
                    {!this.state.showHandCardSpinner ?  <ContainerRow>
                        <HandCardContainer>
                        <CardContainer>
                            <img width={95}  src={this.state.posh1} />
                        </CardContainer>

                        <CardContainer>
                            <img width={95}  src={this.state.posh2} />
                        </CardContainer>
                    </HandCardContainer>
                    <PotContainer
                        style={{    "margin-left": "15px"}}>
                        <img width={80}  src={chips} />
                        <label>{this.state.playerCredit}</label>
                    </PotContainer>


                        {this.state.gameRound === 'Preflop'? <HandCardContainer>
                            {!this.state.showOddsSpinner ?  <Container>
                    {this.state.gameRound === 'Preflop' && this.state.showOdds? <HandCardContainer
                        style={{"flex-direction": "column", "margin-left": "15px"}}>
                        <LabelOdds
                            style={{"margin-bottom": "5px", 'text-align': 'left'}}>
                            Chance to get</LabelOdds>
                        <LabelOdds>High Card: {this.state.preflop_HC}%</LabelOdds>
                        <LabelOdds>One Pair: {this.state.preflop_1P}%</LabelOdds>
                        <LabelOdds>Two Pairs: {this.state.preflop_2P}% </LabelOdds>
                        <LabelOdds>Three of a Kind: {this.state.preflop_3K}%</LabelOdds>
                        <LabelOdds>Straight: {this.state.preflop_ST}%</LabelOdds>
                        <LabelOdds>Flush: {this.state.preflop_FL}%</LabelOdds>
                        <LabelOdds>Full House: {this.state.preflop_FH}%</LabelOdds>
                        <LabelOdds>Four of a Kind: {this.state.preflop_4K}%</LabelOdds>
                        <LabelOdds>Straight Flush: {this.state.preflop_SF}%</LabelOdds>
                    </HandCardContainer> : null}
                                </Container> : <div
                                style={{"flex": 1,
                                    'margin-right':'60%',
                                    'margin-left': '40%',
                                    'margin-top':'15%'}}
                            ><Spinner /></div>}

                        {this.state.gameRound === 'Preflop' && !this.state.showOdds? <Button
                            style = {{width: '80%', 'margin-left': '15px', 'margin-right': '15px'}}
                            margin-bottom="40px"
                            height="30%"
                            onClick={() => {
                                this.getOddsPreFlop();

                            }}
                        >
                            Get Odds
                        </Button> : null}
                        </HandCardContainer> : null}


                        {this.state.gameRound === 'Flop'? <HandCardContainer>
                            {!this.state.showOddsSpinner ?  <Container>
                            {this.state.gameRound === 'Flop' && this.state.showOdds? <HandCardContainer
                                style={{"flex-direction": "column", "margin-left": "15px"}}>
                                <LabelOdds>Winning Chance: <div>{this.state.flop_prob}%</div></LabelOdds>
                            </HandCardContainer> : null}
                            </Container> : <div
                                style={{"flex": 1,
                                    'margin-right':'60%',
                                    'margin-left': '40%',
                                    'margin-top':'15%'}}
                            ><Spinner /></div>}

                            {this.state.gameRound === 'Flop' && !this.state.showOdds? <Button
                                style = {{width: '80%', 'margin-left': '15px', 'margin-right': '15px'}}
                                margin-bottom="40px"
                                height="30%"
                                onClick={() => {
                                    this.getOddsFlop();
                                }}
                            >
                                Get Odds
                            </Button> : null}
                        </HandCardContainer> : null}

                        {this.state.gameRound === 'TurnCard'? <HandCardContainer>
                            {!this.state.showOddsSpinner ?  <Container>
                            {this.state.gameRound === 'TurnCard' && this.state.showOdds? <HandCardContainer
                                style={{"flex-direction": "column", "margin-left": "15px"}}>
                                <LabelOdds>Winning Chance: <div>{this.state.turn_prob}%</div></LabelOdds>
                            </HandCardContainer> : null}
                            </Container> : <div
                                style={{"flex": 1,
                                    'margin-right':'60%',
                                    'margin-left': '40%',
                                    'margin-top':'15%'}}
                            ><Spinner /></div>}

                            {this.state.gameRound === 'TurnCard' && !this.state.showOdds? <Button
                                style = {{width: '80%', 'margin-left': '15px', 'margin-right': '15px'}}
                                margin-bottom="40px"
                                height="30%"
                                onClick={() => {
                                    this.getOddsTurn();
                                }}
                            >
                                Get Odds
                            </Button> : null}
                        </HandCardContainer> : null}




                        {this.state.gameRound === 'RiverCard'? <HandCardContainer>
                            {!this.state.showOddsSpinner ?  <Container>
                            {this.state.gameRound === 'RiverCard' && this.state.showOdds? <HandCardContainer
                                style={{"flex-direction": "column", "margin-left": "15px"}}>
                                <LabelOdds>Winning Chance: <div>{this.state.river_prob}%</div></LabelOdds>
                            </HandCardContainer> : null}
                            </Container> : <div
                                style={{"flex": 1,
                                    'margin-right':'60%',
                                    'margin-left': '40%',
                                    'margin-top':'15%'}}
                            ><Spinner /></div>}
                            {this.state.gameRound === 'RiverCard' && !this.state.showOdds? <Button
                                style = {{width: '80%', 'margin-left': '15px', 'margin-right': '15px'}}
                                margin-bottom="40px"
                                height="30%"
                                onClick={() => {
                                    this.getOddsRiver();
                                }}
                            >
                                Get Odds
                            </Button> : null}
                        </HandCardContainer> : null}

                    </ContainerRow> : <div
                            style={{"flex": 1,
                                'margin-right':'57%',
                                'margin-left': '43%',
                                'margin-top':'15%'}}
                        ><Spinner /></div>}

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
                        this.leave();
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