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
    title: "What’s your absolute ideal weekend vibe?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Vibe Explorer",
    options: [
      {
        id: "opt-1a",
        label: "Exploring hidden coffee shops & city spots",
        emoji: "☕",
        description: "Matcha lattes, cute cafes, and lofi beats."
      },
      {
        id: "opt-1b",
        label: "Cozy movie marathon & ordering comfort food",
        emoji: "🍿",
        description: "Blanket nest, popcorn, and binge-watching."
      },
      {
        id: "opt-1c",
        label: "Spontaneous road trip or outdoor adventure",
        emoji: "🚗",
        description: "Scenic drives, fresh air, and new places."
      },
      {
        id: "opt-1d",
        label: "Chill night with a few close friends",
        emoji: "✨",
        description: "Good food, laughs, and deep conversations."
      }
    ]
  },
  {
    id: 2,
    subtitle: "Q.02",
    title: "What’s one food you could eat every single week without ever getting tired of it? 🍕",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Tacos, Tonkotsu Ramen, Pepperoni Pizza, Sushi...",
    xpPoints: 50,
    badge: "Foodie Guru"
  },
  {
    id: 3,
    subtitle: "Q.03",
    title: "What’s a movie, TV show, or album that you consider an absolute 10/10? 🎬🎵",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Interstellar, Severance, Frank Ocean - Blonde...",
    xpPoints: 60,
    badge: "Taste Maker"
  },
  {
    id: 4,
    subtitle: "Q.04",
    title: "What kind of music is almost guaranteed to instantly put you in a good mood?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Audio Buff",
    options: [
      {
        id: "opt-4a",
        label: "Chill Indie / Acoustic / Lo-fi",
        emoji: "🎧",
        description: "Warm guitars and mellow melodies."
      },
      {
        id: "opt-4b",
        label: "High-energy Pop / Upbeat hits",
        emoji: "⚡",
        description: "Pure energetic hype vibes."
      },
      {
        id: "opt-4c",
        label: "Retro / 80s / Synthwave & Rock",
        emoji: "🎸",
        description: "Nostalgic synth lines and riffs."
      },
      {
        id: "opt-4d",
        label: "R&B / Smooth rhythms",
        emoji: "🎷",
        description: "Groovy basslines and soul vocals."
      }
    ]
  },
  {
    id: 5,
    subtitle: "Q.05",
    title: "Which of these is the biggest social pet peeve for you?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Real One",
    options: [
      {
        id: "opt-5a",
        label: "People being late without letting anyone know",
        emoji: "⏳",
        description: "Respecting time is key!"
      },
      {
        id: "opt-5b",
        label: "Loud chewing or bad table manners",
        emoji: "🥣",
        description: "Instant misophonia trigger."
      },
      {
        id: "opt-5c",
        label: "People constantly on their phones during dinner",
        emoji: "📱",
        description: "Be present in the moment!"
      },
      {
        id: "opt-5d",
        label: "Talking over others in conversations",
        emoji: "🗣️",
        description: "Active listening matters."
      }
    ]
  },
  {
    id: 6,
    subtitle: "Q.06",
    title: "What is a popular trend that you just never understood? 🤔",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. TikTok viral dances, chunky sneakers, mukbangs...",
    xpPoints: 60,
    badge: "Trend Critic"
  },
  {
    id: 7,
    subtitle: "Q.07",
    title: "What’s an 'unpopular opinion' you hold that you’re willing to defend? 🌶️",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Pineapple belongs on pizza, mornings are overrated...",
    xpPoints: 75,
    badge: "Bold Thinker"
  },
  {
    id: 8,
    subtitle: "Q.08",
    title: "If you could design your dream living space, where would it be?",
    type: "single-choice",
    instructions: "SELECT YOUR DREAM SPOT 🏡",
    xpPoints: 50,
    badge: "Architect",
    options: [
      {
        id: "opt-8a",
        label: "A modern penthouse in the heart of a bustling city",
        emoji: "🏙️",
        description: "Skyline views and city lights."
      },
      {
        id: "opt-8b",
        label: "A cozy cottage near the mountains & forest",
        emoji: "🌲",
        description: "Fireplace, trees, and quiet nature."
      },
      {
        id: "opt-8c",
        label: "A serene beachfront house with ocean views",
        emoji: "🌊",
        description: "Sound of waves and golden hour sunsets."
      },
      {
        id: "opt-8d",
        label: "A quiet suburban home with a huge garden",
        emoji: "🏡",
        description: "Spacious backyard, greenery, and peace."
      }
    ]
  },
  {
    id: 9,
    subtitle: "Q.09",
    title: "If time & money weren't an issue, what’s one passion project you’d pursue tomorrow? 💡",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Opening a cozy bookstore cafe, building an animal sanctuary...",
    xpPoints: 75,
    badge: "Dreamer"
  },
  {
    id: 10,
    subtitle: "Q.10",
    title: "If you won an all-expenses-paid trip tomorrow, where are we going? ✈️",
    type: "single-choice",
    instructions: "PICK YOUR DESTINATION 🗺️",
    xpPoints: 50,
    badge: "Wanderlust",
    options: [
      {
        id: "opt-10a",
        label: "Historic cities & museum tours in Europe",
        emoji: "🏛️",
        description: "Cobblestone streets, art, and architecture."
      },
      {
        id: "opt-10b",
        label: "Tropical island relaxation & beach resorts",
        emoji: "🏝️",
        description: "Clear turquoise waters and palm trees."
      },
      {
        id: "opt-10c",
        label: "Wandering street markets & trying food in Asia",
        emoji: "🍜",
        description: "Night markets, street food, and vibrant neon."
      },
      {
        id: "opt-10d",
        label: "Mountain hiking & scenic nature retreats",
        emoji: "🏔️",
        description: "Crisp air, lakes, and epic mountain views."
      }
    ]
  },
  {
    id: 11,
    subtitle: "Q.11",
    title: "What’s your default reaction when plans suddenly get canceled?",
    type: "single-choice",
    instructions: "BE HONEST 😉",
    xpPoints: 50,
    badge: "Vibe Check",
    options: [
      {
        id: "opt-11a",
        label: "Relief! Secretly happy to stay home in sweatpants",
        emoji: "🛋️",
        description: "Introvert win!"
      },
      {
        id: "opt-11b",
        label: "Slightly disappointed, but I'll pivot fast",
        emoji: "🤙",
        description: "Easygoing and adaptable."
      },
      {
        id: "opt-11c",
        label: "Annoyed, I like sticking to the plan!",
        emoji: "📋",
        description: "Organization matters."
      },
      {
        id: "opt-11d",
        label: "Immediate search for a back-up fun plan",
        emoji: "🚀",
        description: "Never let a weekend go to waste."
      }
    ]
  },
  {
    id: 12,
    subtitle: "Q.12",
    title: "What is your biggest green flag in another person? 💚",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 60,
    badge: "Pure Heart",
    options: [
      {
        id: "opt-12a",
        label: "A great sense of humor & witty banter",
        emoji: "😂",
        description: "Making each other laugh non-stop."
      },
      {
        id: "opt-12b",
        label: "Being a genuinely good listener & empathetic",
        emoji: "👂",
        description: "Remembers tiny details and listens closely."
      },
      {
        id: "opt-12c",
        label: "Ambitious and passionate about their goals",
        emoji: "🔥",
        description: "Driven, hardworking, and inspiring."
      },
      {
        id: "opt-12d",
        label: "Thoughtful with small, spontaneous gestures",
        emoji: "💐",
        description: "Surprise snacks, cute texts, and care."
      }
    ]
  },
  {
    id: 13,
    subtitle: "Q.13",
    title: "What’s a random rabbit hole or niche topic you've spent hours researching online? 🔍",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Deep ocean creatures, space anomalies, true crime mysteries...",
    xpPoints: 75,
    badge: "Curious Mind"
  },
  {
    id: 14,
    subtitle: "Q.14",
    title: "Are you more of an early bird or a night owl?",
    type: "single-choice",
    instructions: "SELECT ONE ⏰",
    xpPoints: 50,
    badge: "Chronotype",
    options: [
      {
        id: "opt-14a",
        label: "Early bird—sunrise & productive mornings",
        emoji: "🌅",
        description: "Best energy before 9 AM."
      },
      {
        id: "opt-14b",
        label: "Night owl—my brain turns on after midnight",
        emoji: "🌙",
        description: "Midnight bursts of creativity."
      },
      {
        id: "opt-14c",
        label: "A mix of both depending on the day",
        emoji: "🔄",
        description: "Fluid sleep schedule."
      },
      {
        id: "opt-14d",
        label: "Permanently exhausted, time is an illusion",
        emoji: "💤",
        description: "Needs coffee immediately."
      }
    ]
  },
  {
    id: 15,
    subtitle: "Q.15",
    title: "What’s a skill or hobby you’ve always wanted to learn? 🎨",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Playing piano, pottery, surfing, coding AI agents...",
    xpPoints: 60,
    badge: "Future Master"
  },
  {
    id: 16,
    subtitle: "Q.16",
    title: "How do you recharge after a long, exhausting week?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Battery Full",
    options: [
      {
        id: "opt-16a",
        label: "Complete solitude—no social interaction",
        emoji: "🎧",
        description: "Quiet time in my room."
      },
      {
        id: "opt-16b",
        label: "Hanging out with my favorite person / small group",
        emoji: "👯",
        description: "Quality time with loved ones."
      },
      {
        id: "opt-16c",
        label: "Doing something active or getting outdoors",
        emoji: "🚴",
        description: "Gym, walk, or outdoor exercise."
      },
      {
        id: "opt-16d",
        label: "Sleeping in and pampering myself",
        emoji: "🛌",
        description: "10 hours of sleep + skincare."
      }
    ]
  },
  {
    id: 17,
    subtitle: "Q.17",
    title: "What’s one simple thing that guaranteed puts a smile on your face no matter what? 😊",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Cute dog videos, fresh coffee, a warm hug, funny memes...",
    xpPoints: 75,
    badge: "Sunshine"
  },
  {
    id: 18,
    subtitle: "Q.18",
    title: "Be honest... Do you hate me? 😅",
    type: "single-choice",
    instructions: "PENULTIMATE QUESTION 🙈",
    xpPoints: 100,
    badge: "Truth Seeker",
    options: [
      {
        id: "opt-18a",
        label: "Not at all! Why would I? 😊",
        emoji: "✨",
        description: "You're awesome!"
      },
      {
        id: "opt-18b",
        label: "Only when you ask silly questions 😉",
        emoji: "😜",
        description: "Just kidding!"
      },
      {
        id: "opt-18c",
        label: "Never in a million years! 💖",
        emoji: "🌟",
        description: "100% wholesome vibes."
      },
      {
        id: "opt-18d",
        label: "Depends... are you going to buy me food? 🍕",
        emoji: "🌮",
        description: "Bribery accepted!"
      }
    ]
  },
  {
    id: 19,
    subtitle: "Q.19",
    title: "Last question: Do you like me? 💫",
    type: "single-choice",
    instructions: "THE FINAL MOMENT 💌",
    xpPoints: 150,
    badge: "Heart Locked",
    options: [
      {
        id: "opt-19a",
        label: "Yes, a lot! 🥰",
        emoji: "💖",
        description: "Full heart!"
      },
      {
        id: "opt-19b",
        label: "More than I probably admit... 🙈",
        emoji: "🌹",
        description: "Secretly crushing!"
      },
      {
        id: "opt-19c",
        label: "You're growing on me every day ✨",
        emoji: "🌱",
        description: "Daily level up!"
      },
      {
        id: "opt-19d",
        label: "Obviously! Why else would I complete this quiz? 👑",
        emoji: "💌",
        description: "100% proof right here!"
      }
    ]
  }
];
