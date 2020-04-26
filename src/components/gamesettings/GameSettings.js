import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameModel from "../shared/models/GameModel";

const ButtonGreen = styled.div`
    &:hover {
        transform: translateY(-2px);
    }
    
    font-family: Pontano Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    text-align: center;
    padding: 6px;
    margin-top: 15px;
    color: #000000;
    width: ${props => props.width || null};
    height: 35px;
    border: none;
    border-radius: 5px;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
    transition: all 0.3s ease;
    background: #d2f8d2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const FormContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Form = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #000000;
  padding-left: 37px;
  padding-right: 37px;
  padding-bottom: 15px;
  padding-top: 15px;
  background: #C4C4C4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 19px;
`;

const InputField = styled.input`
  &::placeholder {
    color: dark grey;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
  
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
  background: #FFFFFF;
  border-radius: 10px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class GameSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            gamename: null,
            limit: null,
            fontWeightNoLimit: "normal",
            fontWeightPotLimit: "normal",
            fontWeightSplitLimit: "normal",
            fontWeightFixedLimit: "normal"
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
            //Backend with Postman: const response = const response = await api.post('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/games', requestBody);
          /*  const user = new User(response.data);
            alert(user.id)*/
            const game = new GameModel(response.data);

            localStorage.setItem("gameId", game.gameId);
            alert(localStorage.getItem("gameId"));

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
                                this.setState({limit: "no"});
                                this.setState({fontWeightNoLimit: "bold"});
                                this.setState({fontWeightPotLimit: "normal"});
                                this.setState({fontWeightSplitLimit: "normal"});
                                this.setState({fontWeightFixedLimit: "normal"});
                            }}
                        >
                            No Limit
                        </ButtonGreen>

                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightPotLimit}}
                            onClick={() => {
                                this.setState({limit: "pot"});
                                this.setState({fontWeightNoLimit: "normal"});
                                this.setState({fontWeightPotLimit: "bold"});
                                this.setState({fontWeightSplitLimit: "normal"});
                                this.setState({fontWeightFixedLimit: "normal"});
                            }}
                        >
                            Pot Limit
                        </ButtonGreen>


                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightSplitLimit}}
                                onClick={() => {
                                this.setState({limit: "split"});
                                    this.setState({fontWeightNoLimit: "normal"});
                                    this.setState({fontWeightPotLimit: "normal"});
                                    this.setState({fontWeightSplitLimit: "bold"});
                                    this.setState({fontWeightFixedLimit: "normal"});
                            }}
                        >
                            Split Limit
                        </ButtonGreen>
                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeightFixedLimit}}
                            onClick={() => {
                                this.setState({limit: "fixed"});
                                this.setState({fontWeightNoLimit: "normal"});
                                this.setState({fontWeightPotLimit: "normal"});
                                this.setState({fontWeightSplitLimit: "normal"});
                                this.setState({fontWeightFixedLimit: "bold"});
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
