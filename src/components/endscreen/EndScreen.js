import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GameLog from "../shared/models/GameLog";




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
class EndScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,

            winnertext: " Congratulations, you won!!!",
            losertext: "you lost, the winner is: ",
            winner: null,
            credit: null,
            text: null,

        };
    }
    async getuser(){


       const response = await api.get( '/users/' +localStorage.getItem("id"),{headers:{ Authorization: localStorage.getItem("token")}});
       let user = new User(response.data)
       this.setState({ ["username"]: user.username});

    }
    async getWinner(){
        // Winner should be in local storage after game ended !
        localStorage.setItem("winner", "lara3");

      this.setState({ ["winner"]: localStorage.getItem("winner")});

    }
    componentDidMount() {
        this.getuser();
        this.getWinner();
    }


    render() {
        if(this.state.username === this.state.winner){
            this.state.text = this.state.winnertext;
        }
        else{
            this.state.text = this.state.losertext + this.state.winner;
        }
        return (
            <FormContainer>
                <Form>
                    <label>{this.state.text} </label>

                    <ButtonContainer>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.props.history.push(`/Dashboard`);
                            }}
                        >
                            go Back
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
export default withRouter(EndScreen);