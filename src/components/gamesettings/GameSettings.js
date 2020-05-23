import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameModel from "../shared/models/GameModel";
import {Input} from "react-chat-elements";

const ButtonGreen = styled.div`
    &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    background: rgba(237,94,2,1);
    
  }
  line-height: 17px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 15px;
  text-align: center;
  padding: 10px;

    margin-top: 15px;
    color: rgba(0,0,0,1);
    margin-left: 15%
    margin-right: 15%
    width: 70%;
    height: 35px;
    border: none;
    border-radius: 5px;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
    transition: all 0.3s ease;
    background: rgba(237,94,2,0.85);
    
`;

const FormContainer = styled.div`
  margin-top: -3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;
const Form = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  padding-left: 37px;
  padding-right: 37px;
  padding-bottom: 15px;
  padding-top: 15px;
  background: rgba(0, 0, 0,0.9);
  border-radius: 20px;
`;


const InputField = styled.input`
  &::placeholder {
    font-family: 'Roboto', sans-serif;
    color: rgba(237,94,2,0.3);
    font-size: 19px;
    opacity: 0.6;
  }
  font-family: 'Roboto', sans-serif;
  font-size: 19px;
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  background: rgba(237,94,2, 0.4);
  color: black;
`;
const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: 900;
  font-size: 17px;
  color: rgb(237,94,2);
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: 'center';
  margin-top: 5px;
  margin-bottom: 20 px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
`;

class GameSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            gamename: null,
            limit: null,
            fontWeightNoLimit: "700",
            fontWeightPotLimit: "700",
            fontWeightSplitLimit: "700",
            fontWeightFixedLimit: "700"
        };
    }

    async createGame() {
        try {
            const requestBody = JSON.stringify({
                gameName: this.state.gamename,
                gameHostID: localStorage.getItem("id"),
                potType: this.state.limit,
            });
            const response = await api.post('/games', requestBody);

            const game = new GameModel(response.data);

            localStorage.setItem("gameId", game.gameId);

        } catch (error) {
            alert(`Something went wrong when trying to create a game: \n${handleError(error)}`);
        }

    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <Label>Choose a Game Name:</Label>
                    <InputField
                        onKeyPress={(e) => {
                            if(!(this.state.limit === null || this.state.gamename === null || this.state.gamename === "")){
                            if (e.key === "Enter") {
                                this.createGame();
                                this.props.history.push(`/lobby`);

                            }}
                        }}
                        placeholder="Enter here.."
                        onChange={e => {
                            this.handleInputChange("gamename", e.target.value);
                        }}
                    />
                    <Label>Choose a Limit:</Label>
                    <ButtonContainer>
                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightNoLimit}}
                            height="30%"
                            onClick={() => {
                                this.setState({limit: "no limit"});
                                this.setState({fontWeightNoLimit: "900"});
                                this.setState({fontWeightPotLimit: "700"});
                                this.setState({fontWeightSplitLimit: "700"});
                                this.setState({fontWeightFixedLimit: "700"});
                            }}
                        >
                            No Limit
                        </ButtonGreen>

                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightPotLimit}}
                            onClick={() => {
                                this.setState({limit: "pot limit"});
                                this.setState({fontWeightNoLimit: "700"});
                                this.setState({fontWeightPotLimit: "900"});
                                this.setState({fontWeightSplitLimit: "700"});
                                this.setState({fontWeightFixedLimit: "700"});
                            }}
                        >
                            Pot Limit
                        </ButtonGreen>


                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightSplitLimit}}
                                onClick={() => {
                                this.setState({limit: "split limit"});
                                    this.setState({fontWeightNoLimit: "700"});
                                    this.setState({fontWeightPotLimit: "700"});
                                    this.setState({fontWeightSplitLimit: "900"});
                                    this.setState({fontWeightFixedLimit: "700"});
                            }}
                        >
                            Split Limit
                        </ButtonGreen>
                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightFixedLimit}}
                            onClick={() => {
                                this.setState({limit: "fixed limit"});
                                this.setState({fontWeightNoLimit: "700"});
                                this.setState({fontWeightPotLimit: "700"});
                                this.setState({fontWeightSplitLimit: "700"});
                                this.setState({fontWeightFixedLimit: "900"});
                            }}
                        >
                            Fixed Limit
                        </ButtonGreen>
                    </ButtonContainer>
                    <Button
                        disabled={this.state.limit === null || this.state.gamename === null || this.state.gamename === ""}
                        onClick={() => {
                            this.createGame();
                            this.props.history.push(`/lobby`);
                        }}
                    >
                        Create Game
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.history.push(`/play`);
                        }}
                    >
                        Go Back
                    </Button>
                </Form>
            </FormContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameSettings);
