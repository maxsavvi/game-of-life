import React from 'react';
import './Square.css';


class Square extends React.Component {

  render() {
    let className = 'square';
    if (this.props.alive) {
      className += ' alive';
    }
    return (
      <button
        disabled={this.props.isLocked}
        className={className}
        onClick={() => this.props.onClick()}
        >
      </button>
    );
  }
  
}

export default Square;
