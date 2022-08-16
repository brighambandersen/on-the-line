import { Player } from "./constants";
import uuid from "react-uuid";

export function createPlayer(name: string, lives: number): Player {
  return {
    id: uuid(),
    name,
    lives
  };
}
