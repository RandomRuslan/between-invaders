import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 50
    };
    document.addEventListener('keydown', this.handleDown.bind(this));
  }

  handleDown(e) {
    if (e.keyCode === 38 && this.state.top > 2) {
      this.setState(prevState => ({
        top: prevState.top - 2
      }));
    }

    if (e.keyCode == 40 && this.state.top < 98) {
      this.setState(prevState => ({
        top: prevState.top + 2
      }));
    }
  }

  render() {
    return (
      <div className="player" style={{top: this.state.top+"%"}}></div>
    );
  }
}


export default Player;