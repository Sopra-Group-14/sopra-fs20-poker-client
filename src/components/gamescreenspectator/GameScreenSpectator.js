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


const PlayersContainer = styled.div`
  margin: auto;
  display: flex;
  width: 810px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;
const PlayerContainer = styled.div`
     background: #417D44; 
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
     background: #417D44;
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
  background: #417D44; 
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
  background: #C14E4E;
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
  margin-top: 60px;
  width: 600px; 
  height: 250px;
  display: flex;
  flex-direction: row;
  background: #417D44;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: space-between;
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
            tablecards: null,
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


        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }

    }

    getImageOfCard(card){
        let cardname = card.suit + card.rank;
        return graphicsList.find(data => data.name === cardname).src;
    }


    async leave(){
        await api.put( '/games/'+localStorage.getItem("gameId")+'/spectator/'+localStorage.getItem("spectatorId")+'/leave')
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
        this.playRound()
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


    /*
               <ChatContainer>

                    <h1>Player Chat</h1>

                    <InputField
                        placeholder="new message"
                        onChange={e => {
                            this.handleInputChange('message', e.target.value);
                        }}
                    />



                </ChatContainer>
     */
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
                        <label>This are the winning stats of this player: xy</label>
                    </HandCardContainer>




                </ControlContainer>

                <Button
                    margin-bottom="40px"
                    height="30%"
                    onClick={() => {
                        this.leave();
                        this.props.history.push(`/welcomepage`);
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