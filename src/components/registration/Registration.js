import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  height: 435px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
  background: rgba(0,0,0,0.9);
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
  color: rgb(237,94,2) ;
  margin-bottom: 5px;
  text-transform: uppercase;
`;


const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 0px;
  align-items: center;
`;


class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            password: null,
            username: null,
            repeat_password: null
        };
    }

    async registration() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            });

            const response = await api.post('/registration', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token and id into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);

            // Registration successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }



    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    if(!(!this.state.username || !this.state.password || this.state.password !== this.state.repeat_password)){
                                        this.registration();
                                    }
                                }
                            }}
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    if(!(!this.state.username || !this.state.password || this.state.password !== this.state.repeat_password)){
                                        this.registration();
                                    }
                                }
                            }}
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        <Label>Repeat Password</Label>
                        <InputField
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    if(!(!this.state.username || !this.state.password || this.state.password !== this.state.repeat_password)){
                                    this.registration();
                                    }
                                }
                            }
                            }
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('repeat_password', e.target.value);
                            }}
                        />
                        {(this.state.password === this.state.repeat_password || this.state.password === null || this.state.repeat_password === null  || this.state.password === '' || this.state.repeat_password === '')  ? <Label style={{"font-weight": '500', 'text-transform': 'none'}}
                        > Please type in your username and password to register      </Label> : <Label style={{"font-weight": '500', 'text-transform': 'none'}}
                        > Your password and the one you repeated are not equal </Label>}
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password || this.state.password !== this.state.repeat_password}
                                type="button"
                                width="50%"
                                onClick={() => {
                                    this.registration();
                                }

                                }
                            >
                                Register
                            </Button>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.props.history.push("/welcomepage")
                                }}
                            >
                                go back
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

export default withRouter(Registration);
