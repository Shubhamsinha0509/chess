import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board : Chess
    private startTime : Date;
    private moveCount = 0

    constructor( player1: WebSocket,  player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "black"
            }
        }))
    }

    makeMove(socket:WebSocket, move: {
        from : string,
        to : string
    }) {
        console.log(move)
        // validate the type of move using zod
        // console.log(this.board.moves.length)
        // console.log(this.board.board())
        if(this.moveCount % 2 === 0 && socket !== this.player1){
            console.log("early return1")
            return;
        }
        if(this.moveCount % 2 === 1 && socket !== this.player2){
            console.log("early return2")
            return;
        }
        console.log("Did nor early return")

        try{
            this.board.move(move);
         
        }catch(e){
            console.log(e)
            return
        }
        console.log("move succeeded")

        if(this.board.isGameOver()){
            // send the game over message to both the players
            this.player1.emit(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white",
                }
            }))
            this.player2.emit(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white",
                }
            }))
            return
        }

        console.log(this.moveCount % 2)
        if(this.moveCount % 2 === 0){
            console.log("sent 1")
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }else{
            console.log("sent 2")
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }

        // send the updated board to both players
        this.moveCount++
    }
}