
/* explanations: https://github.com/detaysoft/react-chat-elements#messagelist-component */
import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import 'react-chat-elements/dist/main.css';

import {
    MessageBox,
    ChatItem,
    ChatList,
    SystemMessage,
    MessageList,
    Input,
    Button,
    Avatar,
    Navbar,
    SideBar,
    Dropdown,
    Popup,
} from 'react-chat-elements';
import GameLog from "../shared/models/GameLog";
const ChatContainer = styled.div`
  
  position: absolute;
  width: 200px;
  bottom: 10px;
  height: flex;
  
`;
const ChatButton = styled.div`

  &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    background: rgba(237,94,2,1);
    
  }
  line-height: 4px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 10px;
  text-align: center;
  padding: 25px;
  margin-top: 15px; 
  color: #000000;
  margin-left: 10%
  margin-right: 10%
  width: 40%;
  height: 30px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: rgba(237,94,2,0.85);
  font-weight: 100;
  color: $black;
  text-transform: uppercase;
  
  
`;

const ButtonContainerRow = styled.div`
  margin: auto;
  flex-direction: row;
  width: 200px;
  display: flex;
  justify-content: 'center';  
`;

export class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            messageList: [],
            user: null,
            spectator:null,
            SpectatorMessageList: [{username: 'Spectator',position: 'left',text:'message 1'},{username: 'List',position: 'left', text: 'Example text 2'},{username: 'Me',position: 'right', text: 'Example text 3'}],
            PlayerMessageList: [{username: 'Player',position: 'left',text:'message 1'},{username: 'List',position: 'left', text: 'Example text 2'},{username: 'Me',position: 'right', text: 'Example text 3'}],
            PlayerChat: true,
            write: true,
        };
    }
    tick() {
        this.getMessages();
    }

    componentDidMount() {
        // setInterval(this.addMessage.bind(this), 3000);
        this.interval = setInterval(() => this.tick(), 100);
    }
    playerOrSpectator(){
        if(localStorage.spectatorId >0){
            this.state.spectator = true;
        }
        else{
            this.state.spectator = false;
        }
    }
    async getMessages(){
        //Get Messages
        if(this.state.PlayerChat === true) {
            //const response = await api.get('/games/' + localStorage.getItem("gameId") + '/chats/players');
            this.state.messageList =  [{username: 'Player',position: 'left',text:'message 1'},{username: 'List',position: 'left', text: 'Example text 2'},{username: 'Me',position: 'right', text: 'Example text 3'}];

        }else  if(this.state.PlayerChat === false) {

           // const response = await api.get('/games/' + localStorage.getItem("gameId") + '/chats/spectators' );
            this.state.messageList =  [{username: 'Spectator',position: 'left',text:'message 1'},{username: 'List',position: 'left', text: 'Example text 2'},{username: 'Me',position: 'right', text: 'Example text 3'}];
        }
    }


    addMessage() {
        const list = this.state.messageList;
       // list.push(this.random('message'));
        this.setState({
            messageList: list,
        });
    }

    render() {
        const arr = [];
        for (let i = 0; i < 5; i++)
            arr.push(i);
         const chatSource = arr.map(x => "Rössli")
        this.playerOrSpectator();

        return (
            <div className='container' >
                {this.state.spectator ?
                    <ButtonContainerRow>
                    <ChatButton
                        onClick={() => {
                            this.setState({'write': false});
                            this.setState({'PlayerChat': true});

                        }}
                    >
                        Player
                    </ChatButton>
                    <ChatButton

                        onClick={() => {
                            this.setState({'write': true});
                            this.setState({'PlayerChat': false});


                        }}
                    >
                        Spectator
                    </ChatButton>
                </ButtonContainerRow>
                    :
                    <h2>Chat</h2>
                }
                    {this.state.messageList.map(message => {

                        return(
                            <MessageBox

                                title={message.username}
                                position={message.position}
                                type={'text'}
                                text={message.text}
                            />

                           )
                        })
                    }

                <ChatContainer>
                    {this.state.write ?
                        <Input
                            placeholder="type here"
                            defaultValue=""
                            ref='input'
                            multiline={true}
                            // buttonsFloat='left'
                            onKeyPress={(e) => {
                                if (e.shiftKey && e.charCode === 13) {
                                    return true;
                                }
                                if (e.charCode === 13) {
                                    this.refs.input.clear();
                                    this.addMessage();
                                    e.preventDefault();
                                    return false;
                                }
                            }}
                            rightButtons={
                                <Button
                                    text='Send'
                                    onClick={this.addMessage.bind(this)}/>
                            }
                        /> :null
                    }

                    </ChatContainer>
            </div>
        );
    }
}

export default withRouter(Chat);
