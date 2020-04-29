import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';




const FormContainer = styled.div`
  margin-top: 10%;
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
  padding-bottom: 37px;
  background: #C4C4C4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 19px;


`;


const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: 'center';
  margin-top: 20px;
  margin-bottom: 20 px;
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
class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            balance: null

        };
    }

    async getUser() {
        try {
            //localStorage.setItem("playerId", "4");
           // const response = await api.get('https://aab96a46-4df2-44e5-abf3-1fc6f1042b6c.mock.pstmn.io/users/' + localStorage.getItem("playerId"));
            const response = await api.get('/users/' + localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});
            const user = new User(response.data);
            this.handleInputChange('username', user.username);
            this.handleInputChange('balance', user.balance);

        } catch (error) {
            alert(`Something went wrong when trying to get the User: \n${handleError(error)}`);
        }

    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <FormContainer>

                <Form>
                    <h4>Logged in as: {this.state.username}
                    <div>User Balance: {this.state.balance}</div></h4>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            style = {{marginTop: -40}}
                            onClick={() => {
                                this.props.history.push(`/topupaccount`);
                            }}
                        >
                            Top Up Account
                        </Button>

                        <Button

                            onClick={() => {
                                this.props.history.push(`/dashboard`);
                            }}
                        >
                            Go Back
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Account);
