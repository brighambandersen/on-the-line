import React from "react";
import "./styles.css";
import PreGame from "./PreGame";
import InGame from "./InGame";
import { DEFAULT_STARTING_LIVES, Player } from "./utils/constants";

function App() {
  const [gameHasStarted, setGameHasStarted] = React.useState(false);
  const [gameLives, setGameLives] = React.useState(DEFAULT_STARTING_LIVES);
  const [players, setPlayers] = React.useState<Player[]>([]);

  function addPlayer(newPlayer: Player) {
    setPlayers([...players, newPlayer]);
  }

  function takeLives(victimId: string, numLives: number) {
    const playerIdx = players.findIndex((player) => player.id === victimId);
    const victim = players[playerIdx];
    victim.lives -= numLives;
    if (victim.lives < 0) victim.lives = 0;
    // Update array
    const temp = [...players];
    temp[playerIdx] = victim;
    setPlayers(temp);
  }

  function restartGame() {
    setGameHasStarted(false);

    setPlayers([]);
  }

  return (
    <div className="App">
      <h1>{gameLives || "?"} On the Line</h1>
      <hr />
      <br />
      {!gameHasStarted ? (
        <PreGame
          gameLives={gameLives}
          setGameLives={setGameLives}
          players={players}
          addPlayer={addPlayer}
          startGame={() => setGameHasStarted(true)}
        />
      ) : (
        <InGame
          players={players}
          takeLives={takeLives}
          restartGame={restartGame}
        />
      )}
    </div>
  );
}

export default App;
