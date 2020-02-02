import React from 'react';
const _ = require('underscore'); 

class EnemySource extends React.Component {  
  constructor(props) {
    super(props);

    const maxEnemyCount = 10;
    this.state = {
      enemies: []
    };
  }

  componentDidMount() {
    this.creatorTimerId = setInterval(this.createEnemy.bind(this), 2000);
    this.stepTimerId = setInterval(this.step.bind(this), 200);
  }

  createEnemy() {
    if (!this.maxEnemyCount || this.state.enemies.length < this.maxEnemyCount) {
      let top = Math.floor(Math.random() * 10) * 10;
      
      this.setState(prevState => ({
        enemies: [
          ...prevState.enemies, 
          {top: top, left: 0}
        ]
      }));
    }
  }

  step() {    
    this.setState(prevState => {
      const enemies = _.map(
        _.filter(
          prevState.enemies, 
          (enemy) => (enemy.left < 100)
        ), 
        (enemy) => {
          enemy.left += 1;
          return enemy;
        });

      return {enemies: enemies};
    });
  }

  componentWillUnmount() {
    clearInterval(this.creatorTimerId);
    clearInterval(this.stepTimerId);
  }

  render() {
    return this.state.enemies.map(
      (enemy, index) => <Enemy top={enemy.top} left={enemy.left} key={index} />
    );
  }
}

function Enemy(props) {
  const enemyStyle = {
    top: props.top+"%",
    left: props.left+"%"
  };
  return (
    <div className="enemy" style={enemyStyle}></div>
  );
  
}


export default EnemySource;