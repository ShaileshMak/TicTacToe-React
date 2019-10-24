import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
    constructor(props) {
        super(props)

        this.state = { 
        }
    }

    getClassName = (value, isWinner) => {
        const sqr = 'Square';
        const val = value ? `Square-${value}` : '';
        const win = isWinner ? `Square-winner-${value}` : ''
        return `${sqr} ${val} ${win}`;
    }

    render() {
        return (
            <button 
            className={this.getClassName(this.props.value, this.props.isWinner)}
            onClick={() => this.props.onClick()}
            disabled={this.props.value || this.props.disabled}>
                {this.props.value}
            </button>
        )
    }
}

export default Square
