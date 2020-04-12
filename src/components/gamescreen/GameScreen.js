import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import chips from '../../graphics/chips.png';
import GameLog from "../shared/models/GameLog";
import {graphicsList} from '../../images'
import Player from "../../views/Player";


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

  height: 70px;
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
            handcard1: null,
            handcard2: null,
            currentUser: 'lara3',
            players:[ {id:4, username: 'lara4', credit:50 }, {id:1, username: 'lara', credit:15 },  {id:2, username: 'lara2', credit:30 },  {id:3, username: 'lara3', credit:50 }],

        };
    }



    async displayHandCards() {
        try {
           const cardlist =  await api.get('/games/{gamesID}/players/{playerID}/hand');

           this.state.handcard1 = cardlist[0];
           this.state.handcard2 = cardlist[1];

        } catch (error) {
            alert(`Something went wrong when trying to logout: \n${handleError(error)}`);
        }

    }

    async currentPlayer(){
        localStorage.setItem("gameId", "2");
        const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
        const gamelog = new GameLog(response.data);
        this.state.currentUser = gamelog.playerName;

    }
    async displayTableCards() {
        try {
            localStorage.setItem("gameId", "2");
            const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games/' + localStorage.getItem("gameId"));
            const gamelog = new GameLog(response.data);
            this.state.tablecards = gamelog.revealedCards;
            alert(this.state.tablecards)


        } catch (error) {
            alert(`Something went wrong when trying to get the tablecards: \n${handleError(error)}`);
        }

    }

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
                                </PlayerContainer>
                            );
                        }
                    })}



                </PlayersContainer>


                    <TableCardContainer>
                        <PotContainer>  <img width={80}  src={chips} />
                            <label>POT: 3000</label></PotContainer>
                        <CardContainer>
                        <img width={95}  src={graphicsList[46]} />
                        </CardContainer>
                    <CardContainer>
                        <img width={95}  src={graphicsList[5]} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={graphicsList[0]} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={graphicsList[3]} />
                    </CardContainer>
                    <CardContainer>
                        <img width={95}  src={graphicsList[52]} />
                    </CardContainer>

                        </TableCardContainer>




                <ControlContainer>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            disabled={!(this.state.username == this.state.currentUser)}
                            onClick={() => {
                                //this.displayTableCards();
                                this.props.history.push(`/play`);
                            }}
                        >
                            Call
                        </Button>
                        <Button
                            height="30%"
                            disabled={!(this.state.username == this.state.currentUser)}
                            onClick={() => {
                                this.props.history.push(`/play`);
                            }}
                        >
                            Raise
                        </Button>
                        <Button
                            height="30%"
                            disabled={!(this.state.username == this.state.currentUser)}
                            onClick={() => {
                                this.props.history.push(`/play`);
                            }}
                        >
                            Fold
                        </Button>
                    </ButtonContainer>

                    <HandCardContainer>
                        <CardContainer>
                            <img width={95}  src={graphicsList[43]} />
                        </CardContainer>
                        <CardContainer>
                            <img width={95}  src={graphicsList[40] } />
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
