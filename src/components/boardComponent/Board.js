import React, { Component } from 'react';
import './Board.css';
import Square from '../squareComponent/Square';

class Board extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            squares: Array(9).fill(null),
            isX: true,
            gameOver: false,
            winner: null,
            winnerBlocks: Array(9).fill(false)
        }
    }

    getXorO = () => this.state.isX ? 'X' : 'O';
    isMatchDrawn = () => this.state.squares.indexOf(null) === -1;
    getStatus = () => {
        let status = this.state.gameOver ? `Game Over!!! The winner is ${this.state.winner}` : `Next Player: ${this.getXorO()}`;
        status = !this.state.gameOver && this.isMatchDrawn() ? 'Well Played, Match Drawn...' : status;  
        return status;
    };

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          let square = null,
                winnerBlocks;
          for (let i = 0; i < lines.length; i++) {
            winnerBlocks = Array(9).fill(false);
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                square = squares[a];
                winnerBlocks[a] = true;
                winnerBlocks[b] = true;
                winnerBlocks[c] = true;
                break;
            }
          }
          debugger;
          return {square: square, winnerBlocks: winnerBlocks};
    }

    handleClick = (i) => {
        const squares = this.state.squares.slice();
        squares[i] = this.getXorO();
        const winnerData = this.calculateWinner(squares);
        this.setState({squares: squares, 
            isX: !this.state.isX, 
            gameOver: winnerData.square === null ? false : true, 
            winner: winnerData.square,
            winnerBlocks: winnerData.winnerBlocks
        });
    }

    restartGame = () => {
        this.setState(
            {
                squares: Array(9).fill(null),
                isX: true,
                gameOver: false,
                winner: null,
                winnerBlocks: Array(9).fill(false)
            }
        );
    }

    renderSquare = (i) => {
        return (
            <Square 
                value = {this.state.squares[i]} 
                onClick = {() => this.handleClick(i)}
                disabled = {this.state.gameOver}
                isWinner = {this.state.winnerBlocks[i]}
            />
        );
    }

    render() {
        const status = this.getStatus();
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <p className = "status">{status}</p>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                { (this.state.winner || this.isMatchDrawn() ) && (
                    <button 
                        className = "restart-button"
                        onClick={this.restartGame}>Restart Game</button> 
                )}
            </div>
        )
    }
}

export default Board
