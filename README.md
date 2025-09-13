# Pokémon API (Async/Await)

- `getPokemonData(id)` fetches from `/pokemon/:id` and the species URL and returns:
  `{ name, height, weight, types, flavorText, habitat, isLegendary }`
- `assignmentTask()` picks a random id (1–151), calls `getPokemonData`, and logs the result.

## Run
npm start

Requires Node 18+ (global `fetch`). For Node ≤16, install `node-fetch@3` and add the shim in `pokemon.js`.
