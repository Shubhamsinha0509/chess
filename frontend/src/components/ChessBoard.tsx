import { Chess, Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({ board, socket,setBoard,chess }: {
  chess : any
  setBoard :any
    board :({
        square : Square;
        type : PieceSymbol;
        color : Color
    } | null)[][]
    socket : WebSocket
}) => {
  const [from , setFrom] = useState<null | Square>(null)
  

    return (
        <div className="text-black">
          
          {board.map((row, i) => {
            return<div key={i} className="flex">
              {row.map((square, j) => {
                const squareRepresentation = String.fromCharCode(97 + (j % 8))+ ""
                 + (8 - i) as Square

                return<div onClick={()=>{
                  if(!from){
                    setFrom(squareRepresentation)
                  }else{
                  
                    socket.send(JSON.stringify({
                      type : MOVE,
                      payload : {
                        move : {
                          from ,
                          to : squareRepresentation
                        }                       
                      }

                    }))
                    setFrom(null)
                    chess.move({
                      from ,
                      to : squareRepresentation
                    })
                    setBoard(chess.board())
                    console.log({
                      from ,
                      to: squareRepresentation
                    })
                  }
                }}
                  key={j}
                  className="w-16 h-16"
                  style={{
                    backgroundColor: (i + j) % 2 === 0 ? '#81B64C' : '#f9ffe3'
                  }}
                >
                  <div className="h-full justify-center flex flex-col">
                    {square ? <img className="w-4" src = {`/${square?.color === "b" ? 
                      square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null}
                    
                  </div>
                </div>
          })}
            </div>
            })}
        </div>
      );
      
}