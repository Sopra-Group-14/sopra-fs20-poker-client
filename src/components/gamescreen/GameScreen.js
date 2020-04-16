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






class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: 'lara',
            tablecards: null,
            handcards: null,

            currentUser: 'lara4',
            players:[ {id:4, username: 'lara4', credit:50 }, {id:1, username: 'lara', credit:15 },  {id:2, username: 'lara2', credit:30 },  {id:3, username: 'lara3', credit:50 }],
            posh1: null,
            posh2:null,

            tablecard1:null,
            tablecard2:null,
            tablecard3:null,
            tablecard4:null,
            tablecard5:null,

            raiseamount: null,
            inputfieldvisible: false,
            raisebuttonvisible: true,
            raise_cancel_buttonvisible: false,
            checkvisible: true

        };
    }

    getImageOfCard(card){
        let cardname = card.mySuit + card.myRank;
        return graphicsList.find(data => data.name === cardname).src;
    }


    async displayHandCards() {
           try {
           /*
           Backend with Postman:
           localStorage.setItem("gameId", "2");
           localStorage.setItem("playerId", "1");
           const response =  await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));
            */
           const response =  await api.get('/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId"));
           const player = response.data;
           this.state.handcards = player.hand;

           this.setState({ ["posh1"]: this.getImageOfCard(this.state.handcards[0])});
           this.setState({ ["posh2"]: this.getImageOfCard(this.state.handcards[1])});


        } catch (error) {
            alert(`Something went wrong when trying to load the hand cards: \n${handleError(error)}`);
        }

    }

    async currentPlayer(){
        localStorage.setItem("gameId", "2");
        //   '/games/+'gameId+'/currentPlayer'
        const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
        const gamelog = new GameLog(response.data);
        this.state.currentUser = gamelog.playerName;
    }

    async displayTableCards() {
        try {
            /*
            Backend with Postman:
            4815cd7c29cb7c36a056db26c938e16ab48a74a9
            localStorage.setItem("gameId", "2");
            const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
            */
            const response = await api.get('/games/' + localStorage.getItem("gameId"));
            let gamelog = new GameLog(response.data);
            this.state.tablecards = gamelog.revealedCards;
            this.setState({ ["tablecard1"]: this.getImageOfCard(this.state.tablecards[0])});
            this.setState({ ["tablecard2"]: this.getImageOfCard(this.state.tablecards[1])});
            this.setState({ ["tablecard3"]: this.getImageOfCard(this.state.tablecards[2])});
            this.setState({ ["tablecard4"]: this.getImageOfCard(this.state.tablecards[3])});
            this.setState({ ["tablecard5"]: this.getImageOfCard(this.state.tablecards[4])});


        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }

    }

    async currentPlayer(){
        /*
        Backend with Postman:
        localStorage.setItem("gameId", "2");
        const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
         */
        const response = await api.get('/games/' + localStorage.getItem("gameId"));
        const gamelog = new GameLog(response.data);
        this.state.currentUser = gamelog.playerName;
    }

    async displayCallOrCheck(){
        localStorage.setItem("gameId", "2");
        const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
        const gamelog = new GameLog(response.data);
        if(gamelog.amountToCall === 0){
            this.handleInputChange("checkvisible", true)
        }
        else{
            this.handleInputChange("checkvisible", false)
        }
    }

    async call(){
        localStorage.setItem("playerId", "1");

        const requestBody = JSON.stringify({
            action: "CALL",
            amount: 0,
            token: localStorage.getItem("token") ,

        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId")+'/actions', requestBody )
    }

    async check(){
        localStorage.setItem("playerId", "1");

        const requestBody = JSON.stringify({
            action: "CHECK",
            amount: 0,
            token: localStorage.getItem("token") ,

        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId")+'/actions', requestBody )
    }

    async fold(){
        localStorage.setItem("playerId", "1");

        const requestBody = JSON.stringify({
            action: "FOLD",
            amount: 0,
            token: localStorage.getItem("token") ,

        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId")+'/actions', requestBody )
    }

    async raise(){
        localStorage.setItem("playerId", "1");

        const requestBody = JSON.stringify({
            action: "RAISE",
            amount: this.state.raiseamount,
            token: localStorage.getItem("token") ,

        });
        await api.put( '/games/'+localStorage.getItem("gameId")+'/players/'+localStorage.getItem("playerId")+'/actions', requestBody )
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.displayHandCards();
        this.displayTableCards();
        this.displayCallOrCheck();
    }


/*
{this.state.inputfieldvisible ? <Slider
    color={"#C14E4E"}
    /> : null}
 */
    render() {
        return (
            <BaseContainer>
                <PlayersContainer>
                    {this.state.players.map(user => {
                        if(user.username === this.state.username){
                            return;
                        }
                        else if (user.username === this.state.currentUser){
                            return(
                                <ActivePlayerContainer key={user.id}>
                                    <label>{user.username}</label>
                                    <img width={80}  src={chips} />
                                    <label> {user.credit} </label>
                                </ActivePlayerContainer>
                            )
                        }

                    else {
                            return (
                                <PlayerContainer key={user.id}>
                                    <label>{user.username}</label>
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
                            <label>POT: 3000</label></PotContainer>
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
                    <ButtonContainer>
                        {!this.state.checkvisible ? <Button
                            height="30%"
                            disabled={!(this.state.username === this.state.currentUser)}
                            onClick={() => {
                                this.call();
                            }}
                        >
                            Call
                        </Button> : null}

                        {this.state.checkvisible ? <Button
                            height="30%"
                            disabled={!(this.state.username === this.state.currentUser)}
                            onClick={() => {
                                this.check();
                            }}
                        >
                            Check
                        </Button> : null}


                        {this.state.raisebuttonvisible ? <Button
                            height="30%"
                            //disabled={!(this.state.username === this.state.currentUser)}
                            onClick={() => {
                                this.handleInputChange("inputfieldvisible", true);
                                this.handleInputChange("raise_cancel_buttonvisible", true);
                                this.handleInputChange("raisebuttonvisible", false);
                            }}
                        >
                            Raise
                        </Button> : null}

                        {this.state.raise_cancel_buttonvisible ? <ButtonContainerRow>
                        {this.state.raise_cancel_buttonvisible ? <Button
                            height="30%"
                            width="50%"
                            disabled={this.state.raiseamount === null || this.state.raiseamount === ""}
                            onClick={() => {
                                this.raise();
                                //alert(this.state.raiseamount)
                            }}
                        >
                            Raise
                        </Button> : null}

                        {this.state.raise_cancel_buttonvisible ? <Button
                            height="30%"
                            width="50%"
                            style = {{marginLeft: 5}}
                            //disabled={!(this.state.username === this.state.currentUser)}
                            onClick={() => {
                                this.handleInputChange("raise_cancel_buttonvisible", false);
                                this.handleInputChange("raisebuttonvisible", true);
                                this.handleInputChange("inputfieldvisible", false);


                            }}
                        >
                            Cancel
                        </Button> : null}
                        </ButtonContainerRow> : null}


                        {this.state.inputfieldvisible ? <InputFieldRaise
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('raiseamount', e.target.value);
                            }}
                        /> : null}

                        <Button
                            height="30%"
                            disabled={!(this.state.username === this.state.currentUser)}
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
                        <label>3000</label>
                    </PotContainer>
                </ControlContainer>

                <ChatContainer>

                    <h1>Player Chat</h1>

                    <InputField
                        placeholder="new message"
                        onChange={e => {
                            this.handleInputChange('message', e.target.value);
                        }}
                    />



                </ChatContainer>
                <Button
                    margin-bottom="40px"
                    height="30%"
                    onClick={() => {
                        this.props.history.push(`/dashboard`);
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
export default withRouter(GameScreen);
