import React from "react";
import { Player } from "./utils/constants";
import { createPlayer } from "./utils/helpers";

interface Props {
  gameLives: number;
  setGameLives(numLives: number): void;
  players: Player[];
  addPlayer(newPlayer: Player): void;
  startGame(): void;
}

function PreGame(props: Props) {
  const { gameLives, setGameLives, players, addPlayer, startGame } = props;
  const [newPlayerName, setNewPlayerName] = React.useState<string>();

  function onAddClick() {
    const newPlayer: Player = createPlayer(newPlayerName!, gameLives);
    addPlayer(newPlayer);
    setNewPlayerName("");
  }

  return (
    <React.Fragment>
      <label style={{ paddingRight: 10 }}>Game Lives</label>
      <select
        value={gameLives}
        onChange={(e) => setGameLives(parseInt(e.target.value, 10))}
      >
        <option value={9}>9</option>
        <option value={7}>7</option>
        <option value={5}>5</option>
        <option value={3}>3</option>
      </select>
      <br />
      <br />
      <label>Players ({players.length}):</label>
      {players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      ) : (
        <p>None yet! Add one below.</p>
      )}
      <div>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <button onClick={onAddClick} disabled={!newPlayerName}>
          Add player
        </button>
      </div>
      <br />
      <br />
      <p>Ready to start?</p>
      <button onClick={startGame} disabled={players.length < 2}>
        Start game
      </button>
    </React.Fragment>
  );
}

export default PreGame;
