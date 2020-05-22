# SoPra FS20 Group 14 Poker - Client

## Introduction

This is the client of a poker game implemented for the SOPRA FS20.
In this game the user can play poker with four different limits as well as watch other games live. He can also chat with other players and spectators. 

## Technologies

We used React npm and node.js
the following Packages were installed: <br/>
react-chat-elements <br/>
reactjs-popup

## High-level components: 

GameScreen: the main game: src/components/gamescreen/GameScreen.js  <br/>
Chat: the Chat feature used in both Game and Spectator Screen  src/components/chat/Chat.js  <br/>
Account: the account of the user, where he can check on his credit src/components/account/Account.js


## Launch and Deployment.
to launch this project install: <br/>
install npm <br/>
npm install reactjs-popup --save<br/>
npm install react-chat-elements --save<br/>

To Launch the project use: <br/>
npm run dev <br/>

## Illustrations
To play poker the user needs to register or log in. Then he can create or join a pokergame. The user has an account where he can top up his credit once every 24h. As a not logged in (as well as a logged in) user it is possible to join a game as a spectator and see the hand cards of the different Players as well as some winning odds. 


## Roadmap
We could imagine adding sound effects, card animations as well as a
friend list or private messages to stay in contact with people you liked to play with. 

## Authors and acknowledgment
Csanad Erdei-Griff, Kevin Kindler, Konstantin Moser, Lara Fried, Andy Aidoo

## License
MIT License

Copyright (c) 2020 Sopra group 14

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

