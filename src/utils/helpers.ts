import { Player } from "./constants";
import { nanoid } from "nanoid";

export function createPlayer(name: string, lives: number): Player {
  return {
    id: nanoid(),
    name,
    lives
  };
}
