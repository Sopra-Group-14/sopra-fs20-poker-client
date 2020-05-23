import React from 'react';
import styled from 'styled-components';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';




const FormContainer = styled.div`
  margin-top: 9.5%;
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
  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #000000;
  padding-left: 37px;
  padding-right: 37px;
  padding-bottom: 37px;
  border-radius: 19px;


`;


const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: 'center';
  margin-top: 20px;
  margin-bottom: 20 px;
`;

class Play extends React.Component {
    constructor() {
        super();
        this.state = {

            username: User.username
        };
    }

    componentDidMount() {}

    render() {
        return (
            <FormContainer>
                <Form>
                    <ButtonContainer>
                        <Button
                            height="30%"
                            onClick={() => {
                                this.props.history.push(`/createagame`);
                            }}
                        >
                            Create a game
                        </Button>

                        <Button

                            onClick={() => {
                                this.props.history.push(`/joingame`);
                            }}
                        >
                            Join a game
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
export default withRouter(Play);
