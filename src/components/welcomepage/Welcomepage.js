import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Background from '../../graphics/poker_redfire.jpg'
//import { ImageBackground, StyleSheet, Text, View } from 'react-native';
/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});




const MainContainer = styled.div`
   flex: 1;
   justifyContent: center;
   alignItems: center;
   width: null;
   height: null;
`;

*/

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
class Welcomepage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            username: null
        };
    }

    componentDidMount() {}
/*
<div  style={{  backgroundImage:`url(${Background})`,
                            backgroundPosition: 'center',
                            backgroundAttachement: 'fixed',
                            height: '100%'

            }}>
            <View style={styles.container}>
                <ImageBackground source={Background} style={styles.image}>
 */
    render() {
        return (

            <FormContainer>
                <Form>
                    <ButtonContainer>
                            <Button
                                height="30%"
                                onClick={() => {
                                    this.props.history.push(`/login`);
                                }}
                            >
                                Login
                            </Button>

                            <Button

                                onClick={() => {
                                    this.props.history.push(`/registration`);
                                }}
                            >
                                Registration
                            </Button>


                            <Button
                                onClick={() => {
                                    this.props.history.push(`/joingamespectator`);
                                }}
                            >
                                Spectator
                            </Button>
                        <div id="container">
                            <button className="learn-more">Learn More</button>
                        </div>
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
export default withRouter(Welcomepage);
