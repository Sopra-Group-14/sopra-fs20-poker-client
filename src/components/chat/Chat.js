
/* explanations: https://github.com/detaysoft/react-chat-elements#messagelist-component */
import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
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


export class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            messageList: [],
        };
    }

    componentWillMount() {
        // setInterval(this.addMessage.bind(this), 3000);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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


        return (
            <div className='container' >
                <div
                    className='chat-list'>
                    <SideBar

                        center={
                           <ChatList
                              dataSource={chatSource} />
                        }
                        bottom={
                            <span>
                            </span>
                        } />
                </div>
                <div
                    className='right-panel'>
                    <MessageList
                        className='message-list'
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList} />

                    <Input
                        margin-top= "100vh"
                        placeholder="Write your message here."
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
                                onClick={this.addMessage.bind(this)} />
                        } />
                </div>
            </div>
        );
    }
}

export default withRouter(Chat);
