import React from "react";
import { Player } from "./utils/constants";

const styles = {
  dead: {
    textDecoration: "line-through",
    color: "gray"
  },
  active: {
    color: "#228ce3"
  }
};

interface Props {
  players: Player[];
  takeLives(victimId: string, numLives: number): void;
  restartGame(): void;
}

function InGame(props: Props) {
  const { players, takeLives, restartGame } = props;

  const [livesOnLine, setLivesOnLine] = React.useState(0);
  const [currIdx, setCurrIdx] = React.useState(0);
  const [madeShot, setMadeShot] = React.useState(null);

  function advanceShooter() {
    let newIdx: number = (currIdx + 1) % players.length;
    // Keep incrementing index while on dead players
    while (players[newIdx].lives === 0) {
      newIdx = (newIdx + 1) % players.length;
    }
    // Set up for next player
    setCurrIdx(newIdx);
    setMadeShot(null);
  }

  function handleShot(madeShot: boolean) {
    // If made, add life to line
    if (madeShot) {
      setLivesOnLine(livesOnLine + 1);
    } else {
      // If missed, subtract amount of lives from current shooter
      takeLives(players[currIdx].id, livesOnLine);
      setLivesOnLine(0); // Reset num of lives
    }

    // Move to next shooter
    advanceShooter();
  }

  function isPlayersTurn(player: Player): boolean {
    return players[currIdx].id === player.id;
  }

  function getOnLineColor(player: Player) {
    if (livesOnLine === 0) {
      return "green";
    }
    if (livesOnLine >= 1 && livesOnLine < player.lives) {
      return "yellow";
    }
    return "red";
  }

  function getPlayerStyle(player: Player) {
    if (player.lives === 0) {
      return styles.dead;
    }

    if (isPlayersTurn(player)) {
      return styles.active;
    }

    return {};
  }

  const remainingPlayers = players.filter((player) => player.lives > 0);

  return (
    <React.Fragment>
      <div>
        <table>
          <tr>
            {players.map((player) => (
              <th style={{ color: getOnLineColor(player) }}>
                {isPlayersTurn(player) && livesOnLine}
              </th>
            ))}
          </tr>
          <tr>
            {players.map((player) => (
              <th style={getPlayerStyle(player)}>{player.name}</th>
            ))}
          </tr>
          <tr>
            {players.map((player) => (
              <td style={getPlayerStyle(player)}>{player.lives}</td>
            ))}
          </tr>
        </table>
      </div>
      <br />
      <br />
      {remainingPlayers.length === 1 ? (
        <div>
          <h1>And the winner is... {remainingPlayers[0].name}</h1>
          <br />
          <button onClick={restartGame}>Start new game</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleShot(true)}>Made ✅</button>
          <button onClick={() => handleShot(false)}>Missed ❌</button>
        </div>
      )}
    </React.Fragment>
  );
}

export default InGame;
