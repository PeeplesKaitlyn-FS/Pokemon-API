// pokemon.js — Node 18+ (global fetch). If you're on Node ≤16, see the note below.

const API_BASE = 'https://pokeapi.co/api/v2';

/**
 * Fetch details for a given Pokémon ID (1..151) from two endpoints and
 * return a single, clean object:
 * { name, height, weight, types, flavorText, habitat, isLegendary }
 */
async function getPokemonData(id) {
  if (!Number.isInteger(id) || id < 1 || id > 151) {
    throw new Error('id must be an integer between 1 and 151');
  }

  // 1) Base Pokémon data
  const res = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error(`pokemon fetch failed: ${res.status} ${res.statusText}`);
  const pokemon = await res.json();

  const name = pokemon.name;
  const height = pokemon.height; // decimetres
  const weight = pokemon.weight; // hectograms
  const types = pokemon.types.map(t => t.type.name);

  // 2) Species data (flavor text, habitat, legendary flag)
  const speciesRes = await fetch(pokemon.species.url);
  if (!speciesRes.ok) throw new Error(`species fetch failed: ${speciesRes.status} ${speciesRes.statusText}`);
  const species = await speciesRes.json();

  const flavorTextRaw =
    species.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text || '';
  const flavorText = flavorTextRaw.replace(/[\f\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();

  const habitat = species.habitat ? species.habitat.name : null;
  const isLegendary = Boolean(species.is_legendary);

  return { name, height, weight, types, flavorText, habitat, isLegendary };
}

/**
 * Generate a random ID (1..151), call getPokemonData, and log the result.
 */
async function assignmentTask() {
  const id = Math.floor(Math.random() * 151) + 1;
  try {
    const data = await getPokemonData(id);
    console.log(`Pokémon #${id}`, data);
  } catch (err) {
    console.error('Failed to fetch Pokémon:', err.message);
  }
}

// Run when executed directly
if (require.main === module) {
  assignmentTask();
}

// Export for potential tests
module.exports = { getPokemonData, assignmentTask };
