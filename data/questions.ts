export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export type QuestionType = 'multi-choice' | 'single-choice' | 'short-text' | 'long-text';

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
    title: "What are your favorite weekend vibes?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Vibe Explorer",
    options: [
      {
        id: "opt-1a",
        label: "Outdoor Adventures & Hiking",
        emoji: "🌿",
        description: "Fresh mountain air, scenic views, and trail walks."
      },
      {
        id: "opt-1b",
        label: "Cozy Movie Marathon & Snacks",
        emoji: "🍿",
        description: "Blanket nest, popcorn, and binge-watching favorite shows."
      },
      {
        id: "opt-1c",
        label: "Cafe Hopping & Good Coffee",
        emoji: "☕",
        description: "A warm matcha or cappuccino with lofi tunes."
      },
      {
        id: "opt-1d",
        label: "Night Out & Live Music",
        emoji: "⚡",
        description: "Electric energy, dancing, and late-night city walks."
      }
    ]
  },
  {
    id: 2,
    subtitle: "Q.02",
    title: "Which midnight snacks are you saying YES to? 🍕",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Foodie Champion",
    options: [
      {
        id: "opt-2a",
        label: "Steaming Hot Ramen",
        emoji: "🍜",
        description: "Rich savory broth with soft boiled egg."
      },
      {
        id: "opt-2b",
        label: "Loaded Tacos & Guac",
        emoji: "🌮",
        description: "Extra salsa, double tortilla, and lime."
      },
      {
        id: "opt-2c",
        label: "Wood-Fired Pizza",
        emoji: "🍕",
        description: "Melted cheese, crispy crust, and fresh basil."
      },
      {
        id: "opt-2d",
        label: "Fresh Sushi Rolls",
        emoji: "🍱",
        description: "Spicy tuna, salmon nigiri, and soy dip."
      },
      {
        id: "opt-2e",
        label: "Warm Brownies & Ice Cream",
        emoji: "🍨",
        description: "Gooey chocolate fudge topped with vanilla."
      }
    ]
  },
  {
    id: 3,
    subtitle: "Q.03",
    title: "What's your go-to comfort song or artist right now? 🎵",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Taylor Swift, Lofi Beats, Coldplay, Frank Ocean...",
    xpPoints: 60,
    badge: "Music Connoisseur"
  },
  {
    id: 4,
    subtitle: "Q.04",
    title: "How do you like to recharge your battery?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Zen Master",
    options: [
      {
        id: "opt-4a",
        label: "Solo Quiet Time & Headphones",
        emoji: "🎧",
        description: "Zero noise, total solitude, and peace."
      },
      {
        id: "opt-4b",
        label: "Deep Talks with Best Friends",
        emoji: "👯",
        description: "Heart-to-heart convos and non-stop giggles."
      },
      {
        id: "opt-4c",
        label: "Sweat Session & Workouts",
        emoji: "🚴",
        description: "Endorphins pumping, gym, or sunset cycling."
      },
      {
        id: "opt-4d",
        label: "Learning Fun Hobbies",
        emoji: "🧠",
        description: "Diving into new DIY, baking, or tech rabbit holes."
      }
    ]
  },
  {
    id: 5,
    subtitle: "Q.05",
    title: "What is your #1 Green Flag in a person? 💚",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Active listener, remembers little details, makes me laugh...",
    xpPoints: 75,
    badge: "Pure Heart"
  },
  {
    id: 6,
    subtitle: "Q.06",
    title: "What's one dream trip destination on your bucket list? ✈️",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Kyoto during cherry blossom, Santorini sunsets, Swiss Alps...",
    xpPoints: 75,
    badge: "Wanderlust"
  },
  {
    id: 7,
    subtitle: "Q.07",
    title: "Do you like me? 💖",
    type: "single-choice",
    instructions: "THE FINAL QUESTION 💌",
    xpPoints: 100,
    badge: "Heart Locked",
    options: [
      {
        id: "opt-7a",
        label: "Yes, absolutely! 🥰",
        emoji: "💖",
        description: "No doubt about it!"
      },
      {
        id: "opt-7b",
        label: "Yes, 1000% without a doubt! ✨",
        emoji: "🌟",
        description: "You're amazing!"
      },
      {
        id: "opt-7c",
        label: "More than words can say! 💌",
        emoji: "🌹",
        description: "Best person ever!"
      },
      {
        id: "opt-7d",
        label: "Yes! (There is no NO option 😉) 💖",
        emoji: "👑",
        description: "Checked and confirmed!"
      }
    ]
  }
];
