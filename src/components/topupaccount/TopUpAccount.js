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
class TopUpAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            amount: null,
            fontWeight100Credits: "normal",
            fontWeight500Credits: "normal",
            fontWeight1000Credits: "normal"
        };
    }

    async topUpAccount(){
        try {
            const requestBody = JSON.stringify({
                amount: this.state.amount,
            });
            await api.put('/users/' + localStorage.getItem("id") + '/balance', requestBody,{headers:{ Authorization: localStorage.getItem("token")}});
            /*  const user = new User(response.data);
              alert(user.id)*/
            this.props.history.push(`/account`);

        } catch (error) {
            alert(`Something went wrong when trying to top up the account: \n${handleError(error)}`);
        }

    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <Label>Click on the Amount you want to load to your Account:</Label>
                    <ButtonContainer>
                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeight100Credits}}
                            height="30%"
                            onClick={() => {
                                this.setState({amount: 100});
                                this.setState({fontWeight100Credits: "bold"});
                                this.setState({fontWeight500Credits: "normal"});
                                this.setState({fontWeight1000Credits: "normal"});
                            }}
                        >
                            100 Credits
                        </ButtonGreen>

                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeight500Credits}}
                            onClick={() => {
                                this.setState({amount: 500});
                                this.setState({fontWeight100Credits: "normal"});
                                this.setState({fontWeight500Credits: "bold"});
                                this.setState({fontWeight1000Credits: "normal"});
                            }}
                        >
                            500 Credits
                        </ButtonGreen>


                        <ButtonGreen
                            style={{"font-weight": this.state.fontWeight1000Credits}}
                            onClick={() => {
                                this.setState({amount: 1000});
                                this.setState({fontWeight100Credits: "normal"});
                                this.setState({fontWeight500Credits: "normal"});
                                this.setState({fontWeight1000Credits: "bold"});
                            }}
                        >
                            1000 Credits
                        </ButtonGreen>
                    </ButtonContainer>
                    <Button
                        disabled={this.state.amount === null}
                        onClick={() => {
                            this.topUpAccount();
                        }}
                    >
                        Top Up
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.history.push(`/account`);
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
export default withRouter(TopUpAccount);
