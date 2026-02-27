
export const AMAZING_COMBOS: Record<string, string[]> = {
  "RPG": ["Fantasy", "Mushroom", "Ogre"],
  "Simulation": ["Architecture", "Bookstore", "Cartoon", "Comics", "Cutie", "F1 Racing", "Game Co", "Motorsport", "Movies", "Mushroom", "Pop Star", "Romance", "Soccer", "Town", "Train", "Virtual Pet"],
  "Sim RPG": ["Spy"],
  "Table": ["Mahjong", "Poncho", "War"],
  "Action": ["Basketball", "Historical", "Horror", "Ninja", "Ogre", "Sumo"],
  "Adventure": ["Cartoon", "Cowboy", "Detective", "Mystery"],
  "Shooter": ["Robot", "Horseshoes"],
  "Action RPG": ["Hunting", "Poncho"],
  "Online RPG": ["Medieval"],
  "Online Sim": ["Architecture", "Conv. Store", "Game Co", "Mushroom", "Pop Star", "Stocks", "Swimming", "Virtual Pet"],
  "Trivia": ["Comedy", "Cosplay", "Mini-skirt", "Sumo"],
  "Life": ["Animal", "Comic Artist", "Dating", "F1 Racing", "Game Co", "Mushroom", "Ping Pong", "Pop Star", "Soccer", "Town", "Word", "Wrestling"],
  "Board": ["Chess"],
  "Puzzle": ["Checkers", "Reversi"],
  "Music": ["Dance", "Drums"],
  "Motion": ["Dance", "Drums", "Fitness", "Pinball", "Pop Star", "Skiing", "Slots", "Snowboard", "Volleyball"],
  "Educational": ["Card Game"]
};

export const CREATIVE_COMBOS: Record<string, string[]> = {
  "RPG": ["Architecture", "Art", "Cosplay", "Dance", "F1 Racing", "Golf", "Horror", "Sumo", "Train", "Virtual Pet"],
  "Simulation": ["Mini-skirt", "Sports", "Swimming"],
  "Sim RPG": ["Table", "Fashion", "Martial Arts"],
  "Action": ["Comedy", "Dance", "Dating", "Detective", "Golf", "Lawyer", "Pinball", "Train"],
  "Adventure": ["Comedy", "Cosplay", "Horseshoes", "Martial Arts", "Mini-skirt", "Ninja", "Ping Pong", "Train"],
  "Shooter": ["F1 Racing", "Fantasy", "Historical", "Hunting", "Lawyer", "Mahjong", "Martial Arts", "Mushroom", "Virtual Pet", "Wrestling"],
  "Action RPG": ["Basketball", "Dance", "Volleyball"],
  "Racing": ["Baseball", "Checkers", "Cosplay", "Cowboy", "Cutie", "Dating", "Dungeon", "Fitness", "Game Co", "Mini-skirt", "Monster", "Mushroom", "Ogre", "President", "Samurai", "Train"],
  "Online RPG": ["Exploration", "Swimsuit"],
  "Online Sim": ["Poncho", "Reversi"],
  "Trivia": ["Pirate", "Romance", "Swimsuit"],
  "Life": ["Art", "Fantasy"],
  "Board": ["Horseshoes", "Snowboard"],
  "Puzzle": ["Art", "Egypt", "Fantasy", "Fashion", "Sports"],
  "Music": ["Basketball", "Checkers", "Conv. Store", "Cowboy", "Cutie", "Dating", "Detective", "F1 Racing", "Horseshoes", "Mahjong", "Ping Pong", "Swimsuit", "Wrestling"],
  "Audio Novel": ["Animal", "Baseball", "Martial Arts", "Mini-skirt", "Swimming", "Town"],
  "Motion": ["Architecture", "Bookstore", "Cartoon", "Comedy", "Cosplay", "Cutie", "Dating", "Horseshoes", "Monster", "Mystery", "Ogre", "Romance", "Sports", "Stocks", "Swimsuit", "Virtual Pet", "Word", "Wrestling"],
  "Educational": ["History", "Card Game"]
};

export const HMM_COMBOS: Record<string, string[]> = {
  "Puzzle": ["Marathon"]
};

export const NOT_GOOD_COMBOS: Record<string, string[]> = {
  "Adventure": ["Marathon"],
  "Shooter": ["Marathon"]
};

// Extract unique Genres and Types
const genreSet = new Set<string>();
const typeSet = new Set<string>();

// Add Marathon explicitly to typeSet since it appears in HMM/NOT_GOOD but might not be in others yet
typeSet.add("Marathon");

[AMAZING_COMBOS, CREATIVE_COMBOS, HMM_COMBOS, NOT_GOOD_COMBOS].forEach(comboMap => {
  Object.entries(comboMap).forEach(([genre, types]) => {
    genreSet.add(genre);
    types.forEach(type => typeSet.add(type));
  });
});

export const ALL_GENRES = Array.from(genreSet).sort();
export const ALL_TYPES = Array.from(typeSet).sort();

export type Rating = "Amazing!" | "Creative" | "Not Bad" | "Hmm..." | "Not Good";

export function getComboRating(genre: string, type: string): Rating {
  if (AMAZING_COMBOS[genre]?.includes(type)) return "Amazing!";
  if (CREATIVE_COMBOS[genre]?.includes(type)) return "Creative";
  if (HMM_COMBOS[genre]?.includes(type)) return "Hmm...";
  if (NOT_GOOD_COMBOS[genre]?.includes(type)) return "Not Good";
  return "Not Bad";
}
