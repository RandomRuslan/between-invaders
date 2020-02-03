import React from 'react';
const _ = require('underscore'); 

class EnemySource extends React.Component {  
  constructor(props) {
    super(props);

    this.MAX_ENEMY_COUNT = 20;
    this.state = {
      enemies: []
    };
  }

  componentDidMount() {
    this.creatorTimerId = setInterval(this.createEnemy.bind(this), 2000);
    this.stepTimerId = setInterval(this.step.bind(this), 200);
  }

  componentWillUnmount() {
    clearInterval(this.creatorTimerId);
    clearInterval(this.stepTimerId);
  }

  createEnemy() {
    if (!this.MAX_ENEMY_COUNT || this.state.enemies.length < this.MAX_ENEMY_COUNT) {
      const top = Math.floor(Math.random() * 10) * 10;
      const leftToRight = Math.random() < 0.5

      const newEnemy = {
        top: top,
        leftToRight: leftToRight,
        left: leftToRight ? 0 : 100
      }
      
      this.setState(prevState => ({
        enemies: [...prevState.enemies, newEnemy]
      }));
    }
  }

  step() {    
    this.setState(prevState => {
      const enemies = _.map(
        _.filter(
          prevState.enemies, 
          (enemy) => (0 <= enemy.left && enemy.left <= 100)
        ), 
        (enemy) => {
          enemy.left += enemy.leftToRight ? 1 : -1;
          return enemy;
        });

      return {enemies: enemies};
    });
  }

  render() {
    return this.state.enemies.map(
      (enemy, index) => <Enemy top={enemy.top} left={enemy.left} key={index} />
    );
  }
}

function Enemy(props) {
  const enemyStyle = {
    top: props.top + '%',
    left: props.left + '%'
  };
  return (
    <div className="enemy" style={enemyStyle}></div>
  );
  
}


export default EnemySource;