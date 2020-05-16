
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
const ScrollBox = styled.div`
  
  position: top;
  width: 230px;
  height: 650px;
  overflow-y: scroll; 
`;
const ChatButton = styled.div`
 
  line-height: 4px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 15px;
  text-align: center;
  padding: 10px;
  margin-top: 15px; 
  color: #000000;
  margin-left: 5%
  margin-right: 5%
  width: 30%;
  height: 30px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  color: $black;
  text-transform: uppercase;
  
  
`;

const ButtonContainerRow = styled.div`
  flex-direction: row;
  width: 180px;
  display: flex;
  justify-content: 'center';  
`;

export class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            messageList:[],
            user: null,
            username: null,
            spectator:null,
            SpectatorMessageList: [{username: 'Spectator',position: 'left',text:'message 1'},{username: 'List',position: 'left', text: 'Example text 2'},{username: 'Me',position: 'right', text: 'Example text 3'}],
            PlayerMessageList: {  data: [] },
            PlayerChat: true,
            switchSpecChat: null,
            write: true,
            message: null,
            fontWeightspectator: "200",
            fontWeightplayer: "200",
            chatEmpty: true,
            position: 'left',
        };
    }
    tick() {
        this.getMessages();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }
    playerOrSpectator(){
        if(localStorage.spectatorId >0){
            this.state.spectator = true;
            this.state.user ='spectators';
        }
        else{
            this.state.spectator = false;
            this.state.user = 'players';
        }
    }
    async getMessages(){
        //Get Messages
        if(this.state.messageList !== []){
            this.handleInputChange('chatEmpty',false);
        }
        if(this.state.PlayerChat === true ) {
            const response = await api.get('/games/' + localStorage.getItem("gameId") + '/chats/players',{headers:{ Authorization: localStorage.getItem("token")}});
            this.state.messageList = response.data;

        }else  if(this.state.switchSpecChat === true) {
            const response = await api.get('/games/' + localStorage.getItem("gameId") + '/chats/spectators' ,{headers:{ Authorization: localStorage.getItem("token")}});
            this.state.messageList =  response.data;

        }
    }
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:

        this.setState({ [key]: value });
    }

    async addMessage() {
        //IN PLAYERCHAT
        if(this.state.PlayerChat === true) {
            const requestBody = JSON.stringify({
            username: localStorage.getItem("id"),
            chatMode: 'players',
            message: this.state.message,
        });
        await api.put('/games/'+localStorage.getItem('gameId')+'/chats/players', requestBody, {headers:{ Authorization: localStorage.getItem("token")}});
        //IN SPECTATORCHAT
        }else  if(this.state.PlayerChat === false) {
            if (!localStorage.getItem("id")) {
                this.setState({"username": 'spectator' + localStorage.spectatorId});
            } else {
                this.setState({"username": localStorage.id});
            }
            const requestBody = JSON.stringify({
                username: localStorage.getItem("username"),
                chatMode: 'spectators',
                message: this.state.message,
            });
            await api.put('/games/'+localStorage.getItem('gameId')+'/chats/spectators', requestBody, {headers:{ Authorization: localStorage.getItem("token")}});
        }
    }

    render(){
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
                        style={{"font-weight": this.state.fontWeightplayer}}
                        onClick={() => {
                            this.setState({'write': false});
                            this.setState({'switchSpecChat': false});
                            this.setState({'PlayerChat': true});
                            this.setState({'fontWeightspectator': "200"});
                            this.setState({'fontWeightplayer': "600"});

                        }}
                    >
                        Player
                    </ChatButton>
                    <ChatButton
                        style={{"font-weight": this.state.fontWeightspectator}}

                        onClick={() => {
                            this.setState({'write': true});
                            this.setState({'switchSpecChat': true});
                            this.setState({'PlayerChat': false});
                            this.setState({'fontWeightspectator': "600"});
                            this.setState({'fontWeightplayer': "200"});

                        }}
                    >
                        Spectator
                    </ChatButton>
                </ButtonContainerRow>
                    :
                    <h2>Chat</h2>
                }

                <ScrollBox>
                {this.state.chatEmpty ?(
                        <label>no messages</label>

                    )
                    :
                    (
                        this.state.messageList.map(chat =>{
                            if(localStorage.getItem('id')===chat.username){
                                this.state.position = 'right';
                            }else{this.state.position = 'left';}
                            return(

                                <MessageBox
                                    title={chat.username}
                                    position={this.state.position}
                                    type={'text'}
                                    text={chat.message}
                                />
                            )


                        })

                    )

                }
                    </ScrollBox>

                    <ChatContainer>
                    {this.state.write ?
                        <Input
                            placeholder="type here"
                            defaultValue=""
                            ref='input'
                            multiline={true}
                            // buttonsFloat='left'
                            onKeyPress={(e) => {
                                this.handleInputChange('message', e.target.value);
                            }}
                            rightButtons={
                                <Button
                                    text='Send'
                                    onClick={
                                        this.addMessage.bind(this)
                                    }
                                />
                            }
                        /> :null
                    }

                    </ChatContainer>
            </div>
        );
    }
}

export default withRouter(Chat);
