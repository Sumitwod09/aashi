export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export type QuestionType = 'single-choice' | 'text-input';

export interface Question {
  id: number;
  subtitle: string;
  title: string;
  type: QuestionType;
  instructions: string;
  placeholder?: string;
  options?: QuestionOption[];
  xpPoints: number;
  badge?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    subtitle: "Q.01",
    title: "What's your ideal weekend vibe?",
    type: "single-choice",
    instructions: "SELECT ONLY 1",
    xpPoints: 50,
    badge: "Vibe Master",
    options: [
      {
        id: "opt-1a",
        label: "Outdoor Adventure & Trail Trekking",
        emoji: "🌿",
        description: "Fresh mountain air, hiking trails, and sunshine."
      },
      {
        id: "opt-1b",
        label: "Cozy Movie Marathon & Blanket Nest",
        emoji: "🍿",
        description: "Binge-watching sci-fi, popcorn, and absolute chill."
      },
      {
        id: "opt-1c",
        label: "Cafe Hopping, Reading & Vinyl",
        emoji: "☕",
        description: "A warm matcha latte, good books, and lofi beats."
      },
      {
        id: "opt-1d",
        label: "Night Out, Live Music & Dancing",
        emoji: "⚡",
        description: "Electric energy, lights, and late night eats."
      }
    ]
  },
  {
    id: 2,
    subtitle: "Q.02",
    title: "Pick your ultimate midnight comfort food 🍕",
    type: "single-choice",
    instructions: "SELECT ONLY 1",
    xpPoints: 50,
    badge: "Foodie Guru",
    options: [
      {
        id: "opt-2a",
        label: "Steaming Hot Tonkotsu Ramen",
        emoji: "🍜",
        description: "Rich broth, soft boiled egg, and savory pork slices."
      },
      {
        id: "opt-2b",
        label: "Loaded Street Tacos & Guacamole",
        emoji: "🌮",
        description: "Double tortilla, extra cilantro, and spicy salsa verde."
      },
      {
        id: "opt-2c",
        label: "Wood-fired Artisanal Pepperoni Pizza",
        emoji: "🍕",
        description: "Crispy crust, melted mozzarella, and fresh basil."
      },
      {
        id: "opt-2d",
        label: "Fresh Salmon Nigiri & Spicy Tuna Roll",
        emoji: "🍱",
        description: "Wasabi splash, pickled ginger, and soy dip."
      }
    ]
  },
  {
    id: 3,
    subtitle: "Q.03",
    title: "What is your #1 Green Flag in a friend or partner? 💚",
    type: "text-input",
    instructions: "TYPE YOUR RESPONSE BELOW",
    placeholder: "e.g. Active listening, remembers tiny details, or sends funny memes...",
    xpPoints: 75,
    badge: "Heart of Gold"
  },
  {
    id: 4,
    subtitle: "Q.04",
    title: "How do you prefer to recharge your battery?",
    type: "single-choice",
    instructions: "SELECT ONLY 1",
    xpPoints: 50,
    badge: "Zen Master",
    options: [
      {
        id: "opt-4a",
        label: "Solo Quiet Time & Noise Cancelling HQ",
        emoji: "🎧",
        description: "Zero notifications, total solitude, inner peace."
      },
      {
        id: "opt-4b",
        label: "Deep Talks with Best Friends",
        emoji: "👯",
        description: "Heart-to-heart convos, laughs, and mutual support."
      },
      {
        id: "opt-4c",
        label: "Sweat Session, Gym or Cycling",
        emoji: "🚴",
        description: "Endorphins pumping, intense workout, pure focus."
      },
      {
        id: "opt-4d",
        label: "Rabbit-hole Learning & New Hobbies",
        emoji: "🧠",
        description: "Diving into new tech, tutorials, or Wikipedia deep dives."
      }
    ]
  },
  {
    id: 5,
    subtitle: "Q.05",
    title: "Which super skill would you choose for 24 hours?",
    type: "single-choice",
    instructions: "SELECT ONLY 1",
    xpPoints: 50,
    badge: "Superhero",
    options: [
      {
        id: "opt-5a",
        label: "Instant Teleportation Anywhere",
        emoji: "🚀",
        description: "Skip commuting forever. Breakfast in Tokyo, dinner in Rome."
      },
      {
        id: "opt-5b",
        label: "Time Travel (Past & Future)",
        emoji: "⏳",
        description: "Peek into 2126 or experience historical milestones."
      },
      {
        id: "opt-5c",
        label: "Fluent in Every Human & Animal Language",
        emoji: "🔮",
        description: "Understand your cat's exact thoughts and all world dialects."
      },
      {
        id: "opt-5d",
        label: "Master of Every Musical Instrument",
        emoji: "🎸",
        description: "Compose symphonies and shred guitar solos effortlessly."
      }
    ]
  },
  {
    id: 6,
    subtitle: "Q.06",
    title: "If you could instantly master any skill today, what would it be?",
    type: "text-input",
    instructions: "TYPE YOUR RESPONSE BELOW",
    placeholder: "e.g. Building AI agents, playing piano, mastering 3D animation...",
    xpPoints: 75,
    badge: "Visionary"
  },
  {
    id: 7,
    subtitle: "Q.07",
    title: "What's your current energy rating for this week?",
    type: "single-choice",
    instructions: "SELECT ONLY 1",
    xpPoints: 50,
    badge: "Energy Champion",
    options: [
      {
        id: "opt-7a",
        label: "100% Fully Charged & Unstoppable",
        emoji: "⚡",
        description: "Crushing goals, maximum focus, hype mood."
      },
      {
        id: "opt-7b",
        label: "75% Cruising Smoothly",
        emoji: "🔋",
        description: "Solid steady pace, healthy balance."
      },
      {
        id: "opt-7c",
        label: "25% Powered by Espresso & Hope",
        emoji: "🪫",
        description: "Countdown to the weekend is officially active."
      },
      {
        id: "opt-7d",
        label: "0% Hibernation Mode Requested",
        emoji: "💤",
        description: "Do not disturb. Sleeping for 48 hours straight."
      }
    ]
  }
];
