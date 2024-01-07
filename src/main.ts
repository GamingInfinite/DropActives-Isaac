import { ButtonAction, ModCallback } from "isaac-typescript-definitions";
import { name } from "../package.json";

let dropCounters: number[] = [];

export function main(): void {
  const mod = RegisterMod(name, 1);

  mod.AddCallback(ModCallback.POST_RENDER, DropChecked);
}

function DropChecked() {
  let players = getPlayers();
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let hold = Input.IsActionPressed(ButtonAction.DROP, player.ControllerIndex);
    if (hold == true) {
      dropCounters[i]++;
      let activeItem = player.GetActiveItem();
      if (activeItem != 0 && dropCounters[i] > 100) {
        //Repentagon Drop Active
      }
    } else {
      dropCounters[i] = 0;
    }
  }
}

function getPlayers(): EntityPlayer[] {
  let game = Game();
  let players: EntityPlayer[] = [];
  let numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (dropCounters[i] === null) {
      dropCounters[i] = 0;
    }
    players.push(player);
  }
  return players;
}
