import React from 'react';
const _ = require('underscore'); 

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipPosition: 50,
      bullets: []
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleDown.bind(this));
    this.bulletsTimerId = setInterval(this.bulletsMoving.bind(this), 200);
  }

  componentWillUnmount() {
    clearInterval(this.bulletsTimerId);
  }

  handleDown(e) {
    // ship
    if (e.keyCode === 38 && this.state.shipPosition > 2) { // top arrow
      this.setState(prevState => ({
        shipPosition: prevState.shipPosition - 2
      }));
    }

    if (e.keyCode === 40 && this.state.shipPosition < 98) { // down arrow
      this.setState(prevState => ({
        shipPosition: prevState.shipPosition + 2
      }));
    }

    // bullet
    if (
        e.keyCode === 37 || // left arrow
        e.keyCode === 90    // z
      ) {
        const bullet = {
          leftToRight: false,
          left: 48,
          top: this.state.shipPosition
        }
        this.setState(prevState => ({
          bullets: [...prevState.bullets, bullet]
        }));
    }

    if (
      e.keyCode === 39 || // right arrow
      e.keyCode === 88    // x
    ) {
      const bullet = {
        leftToRight: true,
        left: 52,
        top: this.state.shipPosition
      }
      this.setState(prevState => ({
        bullets: [...prevState.bullets, bullet]
      }));
    }
  }

  bulletsMoving() {
    this.setState(prevState => {
      const bullets = _.map(
        _.filter(
          prevState.bullets, 
          (bullet) => (0 <= bullet.left && bullet.left <= 100)
        ),
        (bullet) => {
          bullet.left += bullet.leftToRight ? 1 : -1;
          return bullet;
        }
      )
      return bullets
    });

  }

  render() {
    const bullets = this.state.bullets.map((bullet) => (
      <Bullet top={bullet.top} left={bullet.left} />
    ))
    return (
      <React.Fragment>
        <Ship top={this.state.shipPosition} />
        {bullets}
      </React.Fragment>
    );
  }
}

function Ship(props) {
  return (
    <div className="player" style={{top: props.top + '%'}}></div>
  )
}

function Bullet(props) {
  const bulletStyle = {
    top: props.top + '%', 
    left: props.left + '%'
  }
  return (
    <div className="bullet" style={bulletStyle}></div>
  )
}


export default Player;