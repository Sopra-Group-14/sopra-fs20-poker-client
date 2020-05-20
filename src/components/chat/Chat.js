
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
  width: 230px;
  bottom: 20px;
  max-height: 20px; 

`;

const RightSide = styled.div`
    position: absolute;
    flex-direction: Column;
    width: 230px;
    height: 750px;

`
const ScrollBox = styled.div`
  
  position: top;
  width: 230px;
  height: flex;
  flex-shrink: 0;
  max-height: 600px; 
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
  color: #FFFFFF;
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
        this.playerOrSpectator();

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }

    playerOrSpectator(){
        if(localStorage.Spectator === "true"){
            this.state.spectator = true;
            this.setState({'write': true});
            this.setState({'PlayerChat': false});
            this.state.user ='spectators';
        }
        else{
            this.state.spectator = false;
            this.setState({'PlayerChat': true});

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

        }else  if(this.state.PlayerChat === false) {
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
            userId: localStorage.getItem("id"),
            chatMode: 'players',
            message: this.state.message,
        });
        await api.put('/games/'+localStorage.getItem('gameId')+'/chats/players', requestBody, {headers:{ Authorization: localStorage.getItem("token")}});
        //IN SPECTATORCHAT
        }else  if(this.state.PlayerChat === false) {
            const requestBody = JSON.stringify({
                userId: localStorage.getItem("spectatorId"),
                chatMode: 'spectators',
                message: this.state.message,
            });
            await api.put('/games/'+localStorage.getItem('gameId')+'/chats/spectators', requestBody, {headers:{ Authorization: localStorage.getItem("token")}});
        }

    }


    onChange(e) {
        if (this.props.maxlength && (e.target.value || '').length > this.props.maxlength) {
            if (this.props.onMaxLengthExceed instanceof Function)
                this.props.onMaxLengthExceed();
            return;
        }

        this.setState({
            value: e.target.value
        });
        if (this.props.onChange instanceof Function)
            this.props.onChange(e);

        if (this.props.multiline === true) {
            if (this.props.autoHeight === true) {
                e.target.style.height = this.props.minHeight + 'px';

                if (e.target.scrollHeight <= this.props.maxHeight)
                    e.target.style.height = e.target.scrollHeight + 'px';
                else
                    e.target.style.height = this.props.maxHeight + 'px';
            }
        }
    }

    clear() {
        var event = {
            FAKE_EVENT: true,
            target: this.input,
        };
        this.input.value = '';
        this.onChange(event);
    }

    render(){
        const arr = [];
        for (let i = 0; i < 5; i++)
            arr.push(i);
         const chatSource = arr.map(x => "Rössli")

        return (
            <RightSide>
                <h2 style={ {'color':'#FFFFFF'}}>Chat</h2>

                <ScrollBox>
                {this.state.chatEmpty ?(
                        <label>no messages</label>

                    )
                    :
                    (
                        this.state.messageList.map(chat =>{
                            if(localStorage.getItem('id') ===chat.userId) {
                                this.state.position = 'right';
                            }else if(localStorage.getItem('spectatorId') ===chat.userId){
                                this.state.position='right';
                            }else{this.state.position = 'left';}
                            return(
                                <MessageBox
                                    title={chat.username}
                                    position={this.state.position}
                                    type={'text'}
                                    text={chat.message}
                                    dateString={chat.time}
                                />
                            )


                        })

                    )

                }
                    </ScrollBox>

                        <ChatContainer>

                            <Input
                            placeholder="type here"
                            type = 'text'
                            ref='input'
                            onChange={(e) => {
                                this.handleInputChange('message',e.target.value)

                            }}
                            rightButtons={
                                    <Button
                                      text='Send'

                                onClick={
                                    this.addMessage.bind(this)
                                }
                                onKeyPress={event => {
                                    if (event.key === 13) {
                                        this.addMessage.bind(this)
                                    }
                                }}
                            />}
                            />

                 </ChatContainer>


            </RightSide>
        );
    }
}

export default withRouter(Chat);
