import React from 'react';
import Player from './Player';
import EnemySource from './Enemies';

function Board() {
  return (
    <div className="board">
      <Player />
      <EnemySource />
    </div>
  );
}

export default Board;
