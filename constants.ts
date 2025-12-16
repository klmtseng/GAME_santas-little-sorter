
import { Scenario } from './types';

// Helper to generate IDs
let idCounter = 0;
const create = (text: string, verdict: 'Nice' | 'Naughty', reason: string, illustration: string): Scenario => ({
  id: ++idCounter,
  text,
  verdict,
  reason,
  illustration
});

export const TOTAL_ROUNDS = 10;

export const SCENARIOS: Scenario[] = [
  // --- CHILDHOOD CLASSICS ---
  create("Shared their favorite toy with a crying sibling", "Nice", "Sharing is caring!", "🧸"),
  create("Ate all the cookies before dinner", "Naughty", "Ruined their appetite and stole from the cookie jar.", "🍪"),
  create("Drew a 'mural' on the living room wall with permanent marker", "Naughty", "Artistic expression, but property damage.", "🖍️"),
  create("Helped Grandma cross the icy street", "Nice", "Classic good deed.", "👵"),
  create("Put a frog in their sister's bed", "Naughty", "Terrifying for the sister, funny for the frog.", "🐸"),
  create("Cleaned their room without being asked", "Nice", "A rare miracle.", "🧹"),
  create("Fed the dog their broccoli under the table", "Naughty", "Deceptive vegetable disposal.", "🥦"),
  create("Made a handmade card for Mother's Day", "Nice", "Thoughtful and creative.", "💌"),
  create("Tied the teacher's shoelaces together", "Naughty", "A tripping hazard.", "👟"),
  create("Saved allowance to buy a gift for a friend", "Nice", "Fiscal responsibility and generosity.", "💰"),
  create("Threw a tantrum in the grocery store because of candy", "Naughty", "Eardrum damage for everyone.", "📢"),
  create("Helped a lost kitten find its way home", "Nice", "Animal rescue hero.", "🐱"),
  create("Refused to take a bath for a week", "Naughty", "Stinky behavior.", "🛁"),
  create("Planted a tree in the backyard", "Nice", "Helping the environment.", "🌳"),
  create("Cut their own hair with safety scissors", "Naughty", "Now they look like a patchy lawn.", "✂️"),
  create("Donated old toys to charity", "Nice", "Spread the joy.", "🎁"),
  create("Burped the alphabet at the dinner table", "Naughty", "Impressive, but rude.", "💨"),
  create("Watered the neighbor's plants while they were away", "Nice", "Good neighbor etiquette.", "🪴"),
  create("Hid Brussel sprouts in the milk carton", "Naughty", "Ruined the milk and the dinner.", "🥛"),
  create("Read a bedtime story to a younger cousin", "Nice", "Literacy promotion.", "📖"),
  
  // --- FUNNY / WEIRD ---
  create("Tried to flush a goldfish to 'freedom' (the ocean)", "Naughty", "Good intentions, bad plumbing execution.", "🐠"),
  create("Built a nuclear reactor in the basement", "Naughty", "Too dangerous for a 9-year-old.", "☢️"),
  create("Taught the parrot to say curse words", "Naughty", "Polly shouldn't say that.", "🦜"),
  create("Replaced the Oreo cream with toothpaste", "Naughty", "A minty fresh betrayal.", "🦷"),
  create("Attempted to mail themselves to the North Pole", "Nice", "They just really wanted to see us!", "📮"),
  create("Wrapped the cat in toilet paper to make a 'mummy'", "Naughty", "The cat did not consent.", "🐈"),
  create("Baked a cake using salt instead of sugar", "Naughty", "An unintentional prank.", "🧂"),
  create("Tried to vacuum the lawn", "Nice", "They were trying to help clean up nature?", "🚜"),
  create("Wrote a letter to Santa asking for peace on earth", "Nice", "Aww, big picture thinking.", "📜"),
  create("Put googly eyes on every item in the fridge", "Nice", "Comedy gold.", "👀"),
  create("Filled the dad's boots with shaving cream", "Naughty", "Squelchy feet.", "👢"),
  create("Created a slip-n-slide in the hallway with cooking oil", "Naughty", "Safety hazard!", "🌊"),
  create("Organized a protest against bedtime", "Naughty", "Civil disobedience.", "🪧"),
  create("Gave their lunch to a hungry friend", "Nice", "Selfless act.", "🥪"),
  create("Tried to pay for candy with Monopoly money", "Naughty", "Counterfeit currency.", "💵"),
  create("Washed the car with a rock", "Naughty", "Scratched the paint job.", "🪨"),
  create("Adopted a pet rock and took good care of it", "Nice", "Responsible pet ownership.", "🗿"),
  create("Glued a coin to the sidewalk to trick people", "Naughty", "Prankster behavior.", "🪙"),
  create("Made a friendship bracelet for the mailman", "Nice", "Community building.", "🧶"),
  create("Used the curtains as a superhero cape", "Naughty", "Drapery damage.", "🦸"),

  // --- MODERN PROBLEMS ---
  create("Deleted Dad's save file on the video game", "Naughty", "Unforgivable digital crime.", "💾"),
  create("Liked all of Mom's photos on Instagram", "Nice", "Boosting confidence.", "📱"),
  create("Spent $500 on in-app purchases without asking", "Naughty", "Unauthorized spending.", "💳"),
  create("Taught Grandpa how to use emojis", "Nice", "Bridging the generational gap.", "👴"),
  create("Changed the Netflix password and forgot it", "Naughty", "Locked everyone out.", "📺"),
  create("Used ChatGPT to write their thank you notes", "Naughty", "Impersonal gratitude.", "🤖"),
  create("Created a viral dance video", "Nice", "Spreading entertainment.", "💃"),
  create("Prank called the pizza place", "Naughty", "Wasted pepperoni time.", "🍕"),
  create("Helped fix the Wi-Fi router", "Nice", "Tech support hero.", "📶"),
  create("Spoiled the ending of a movie for everyone", "Naughty", "Spoiler alert: that's mean.", "🎬"),
];

// Shuffle helper
export const getShuffledScenarios = () => {
  return [...SCENARIOS].sort(() => Math.random() - 0.5);
};

// Level 2 Gifts
export const GOOD_GIFTS = [
    { text: "Super Action Hero", icon: "🦸‍♂️" },
    { text: "Shiny Red Bicycle", icon: "🚲" },
    { text: "Video Game Console", icon: "🎮" },
    { text: "Giant Teddy Bear", icon: "🧸" },
    { text: "Chemistry Set", icon: "🧪" },
    { text: "Electric Guitar", icon: "🎸" },
    { text: "Soccer Ball", icon: "⚽" },
    { text: "Art Supplies", icon: "🎨" },
    { text: "Rocket Ship Model", icon: "🚀" },
    { text: "Train Set", icon: "🚂" }
];

export const BAD_GIFTS = [
    { text: "Lump of Coal", icon: "🌑" },
    { text: "Leftover Broccoli", icon: "🥦" },
    { text: "Old Sock", icon: "🧦" },
    { text: "Spider in a Box", icon: "🕷️" },
    { text: "Empty Cardboard Box", icon: "📦" },
    { text: "Broken Pencil", icon: "✏️" },
    { text: "Rotten Egg", icon: "🥚" },
    { text: "Tangled Wires", icon: "🔌" },
    { text: "Bag of Trash", icon: "🗑️" },
    { text: "Homework Assignment", icon: "📝" }
];
