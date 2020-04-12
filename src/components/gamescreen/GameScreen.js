import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import chips from '../../graphics/chips.png';
import herz_A from '../../graphics/herz_A.jpg';

import {graphicsList} from '../../images'


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
            username: null,


        };
    }



    async displayHandCards() {
        try {
            const requestBody = JSON.stringify({
                token: localStorage.getItem("token")
            });
           const cardlist =  await api.get('/games/{gamesID}/players/{playerID}/hand');
           return cardlist;

        } catch (error) {
            alert(`Something went wrong when trying to logout: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <BaseContainer>

                <PlayersContainer>
                     <PlayerContainer>
                         <label>Player1</label>
                         <img width={80}  src={chips} />
                         <label> 300 </label>
                     </PlayerContainer>
                     <PlayerContainer>
                         <label>Player2</label>
                         <img width={80}  src={chips} />
                         <label> 300 </label>
                     </PlayerContainer>
                    <PlayerContainer>
                        <label>Player3</label>
                        <img width={80}  src={chips}/>
                        <label> 300 </label>
                    </PlayerContainer>

                </PlayersContainer>


                    <TableCardContainer>
                        <PotContainer>  <img width={80}  src={chips} />
                            <label>POT: 3000</label></PotContainer>
                        <CardContainer>
                        <img width={95}  src={graphicsList['hk']} />
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
                        <img width={95}  src={graphicsList[7]} />
                    </CardContainer>

                        </TableCardContainer>




                <ControlContainer>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.props.history.push(`/play`);
                            }}
                        >
                            Call
                        </Button>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.props.history.push(`/play`);
                            }}
                        >
                            Raise
                        </Button>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.props.history.push(`/play`);
                            }}
                        >
                            Fold
                        </Button>
                    </ButtonContainer>

                    <HandCardContainer>
                        <CardContainer>
                            <img width={95}  src={graphicsList[2]} />
                        </CardContainer>
                        <CardContainer>
                            <img width={95}  src={graphicsList[20]}/>
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
