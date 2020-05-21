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
  height: 360px; 
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: black;
  padding-left: 37px;
  padding-right: 37px;
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
  justify-content: center;
  margin-top: 0px;
  align-items: center;
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
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username : null,
        password: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      const response = await api.put('/login', requestBody);


      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token and id into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id', user.id);

      this.props.history.push(`/dashboard`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:

    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
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
                    if(!(!this.state.username || !this.state.password )){
                      this.login();
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
                    if(!(!this.state.username || !this.state.password)){
                      this.login();
                    }
                  }
                }}
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            {<Label style={{"font-weight": '500', 'text-transform': 'none'}}
                > Please type in your username and password to log in </Label>}

            <ButtonContainer>
              <Button
                  //style={{"background": 'rgba(253, 167, 24)'}}
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.login();
                  }
                }}
              >
                Login
              </Button>

              <Button
                  //style={{"background": 'rgb(253, 167, 24)'}}

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
export default withRouter(Login);
