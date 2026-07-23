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
    title: "What’s one food you could eat every single week without ever getting tired of it?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Tacos, Tonkotsu Ramen, Pepperoni Pizza, Sushi...",
    xpPoints: 50,
    badge: "Foodie Guru"
  },
  {
    id: 3,
    subtitle: "Q.03",
    title: "When picking out an outfit, what’s your primary priority?",
    type: "single-choice",
    instructions: "SELECT ONE 👗",
    xpPoints: 50,
    badge: "Style Icon",
    options: [
      {
        id: "opt-3a",
        label: "Comfort over everything",
        emoji: "🛋️",
        description: "Soft fabrics, relaxed fits, cozy vibes."
      },
      {
        id: "opt-3b",
        label: "Effortlessly stylish and put-together",
        emoji: "✨",
        description: "Clean aesthetic, classic combinations."
      },
      {
        id: "opt-3c",
        label: "Bold, expressive, and unique",
        emoji: "🎨",
        description: "Statement pieces and creative colors."
      },
      {
        id: "opt-3d",
        label: "Whatever fits the weather and mood",
        emoji: "🌤️",
        description: "Practical and adaptable."
      }
    ]
  },
  {
    id: 4,
    subtitle: "Q.04",
    title: "What’s a movie, TV show, or album that you consider an absolute 10/10?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Interstellar, Severance, Frank Ocean - Blonde...",
    xpPoints: 60,
    badge: "Taste Maker"
  },
  {
    id: 5,
    subtitle: "Q.05",
    title: "What kind of music is almost guaranteed to instantly put you in a good mood?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Audio Buff",
    options: [
      {
        id: "opt-5a",
        label: "Chill Indie / Acoustic / Lo-fi",
        emoji: "🎧",
        description: "Warm guitars and mellow melodies."
      },
      {
        id: "opt-5b",
        label: "High-energy Pop / Upbeat hits",
        emoji: "⚡",
        description: "Pure energetic hype vibes."
      },
      {
        id: "opt-5c",
        label: "Retro / 80s / Classic Rock",
        emoji: "🎸",
        description: "Nostalgic synth lines and riffs."
      },
      {
        id: "opt-5d",
        label: "R&B / Smooth rhythms",
        emoji: "🎷",
        description: "Groovy basslines and soul vocals."
      }
    ]
  },
  {
    id: 6,
    subtitle: "Q.06",
    title: "Which of these is the biggest social pet peeve for you?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Real One",
    options: [
      {
        id: "opt-6a",
        label: "People being late without letting anyone know",
        emoji: "⏳",
        description: "Respecting time is key!"
      },
      {
        id: "opt-6b",
        label: "Loud chewing or bad table manners",
        emoji: "🥣",
        description: "Instant misophonia trigger."
      },
      {
        id: "opt-6c",
        label: "People constantly on their phones during dinner",
        emoji: "📱",
        description: "Be present in the moment!"
      },
      {
        id: "opt-6d",
        label: "Talking over others in conversations",
        emoji: "🗣️",
        description: "Active listening matters."
      }
    ]
  },
  {
    id: 7,
    subtitle: "Q.07",
    title: "What is a popular trend (fashion, food, or internet hype) that you just never understood?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. TikTok viral dances, chunky sneakers, mukbangs...",
    xpPoints: 60,
    badge: "Trend Critic"
  },
  {
    id: 8,
    subtitle: "Q.08",
    title: "How do you feel about the rapid advancement of AI in daily life?",
    type: "single-choice",
    instructions: "SELECT YOUR VIBE 🤖",
    xpPoints: 50,
    badge: "Tech Thinker",
    options: [
      {
        id: "opt-8a",
        label: "Fascinating! I love testing new tech tools.",
        emoji: "🚀",
        description: "Early adopter energy."
      },
      {
        id: "opt-8b",
        label: "Cautiously optimistic, but we need boundaries.",
        emoji: "🛡️",
        description: "Balanced and thoughtful."
      },
      {
        id: "opt-8c",
        label: "A bit overwhelming—I prefer low-tech living.",
        emoji: "🌿",
        description: "Analog life lover."
      },
      {
        id: "opt-8d",
        label: "Neutral, as long as it makes life easier.",
        emoji: "☕",
        description: "Practical utility."
      }
    ]
  },
  {
    id: 9,
    subtitle: "Q.09",
    title: "What’s an 'unpopular opinion' you hold that you’re willing to defend?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Pineapple belongs on pizza, mornings are overrated...",
    xpPoints: 75,
    badge: "Bold Thinker"
  },
  {
    id: 10,
    subtitle: "Q.10",
    title: "When making big life decisions, what do you rely on most?",
    type: "single-choice",
    instructions: "SELECT ONE 🧠",
    xpPoints: 50,
    badge: "Decision Maker",
    options: [
      {
        id: "opt-10a",
        label: "Pure logic and carefully weighing pros/cons",
        emoji: "📊",
        description: "Analytical strategy."
      },
      {
        id: "opt-10b",
        label: "Gut feeling and instinct",
        emoji: "🔮",
        description: "Trusting internal radar."
      },
      {
        id: "opt-10c",
        label: "Advice from trusted family or friends",
        emoji: "🤝",
        description: "Collaborative wisdom."
      },
      {
        id: "opt-10d",
        label: "A mix of heart and head equally",
        emoji: "⚖️",
        description: "Balanced perspective."
      }
    ]
  },
  {
    id: 11,
    subtitle: "Q.11",
    title: "If you could design your dream living space, where would it be?",
    type: "single-choice",
    instructions: "PICK YOUR DREAM SPOT 🏡",
    xpPoints: 50,
    badge: "Architect",
    options: [
      {
        id: "opt-11a",
        label: "A modern penthouse in the heart of a bustling city",
        emoji: "🏙️",
        description: "Skyline views and city lights."
      },
      {
        id: "opt-11b",
        label: "A cozy cottage near the mountains/forest",
        emoji: "🌲",
        description: "Fireplace, trees, and quiet nature."
      },
      {
        id: "opt-11c",
        label: "A serene beachfront house with ocean views",
        emoji: "🌊",
        description: "Sound of waves and golden hour sunsets."
      },
      {
        id: "opt-11d",
        label: "A quiet suburban home with a huge garden",
        emoji: "🏡",
        description: "Spacious backyard, greenery, and peace."
      }
    ]
  },
  {
    id: 12,
    subtitle: "Q.12",
    title: "If time and money weren't an issue, what’s one major goal or passion project you’d pursue tomorrow?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Opening a cozy bookstore cafe, building an animal sanctuary...",
    xpPoints: 75,
    badge: "Dreamer"
  },
  {
    id: 13,
    subtitle: "Q.13",
    title: "What does 'true success' look like to you at the end of the day?",
    type: "single-choice",
    instructions: "SELECT ONE 🌟",
    xpPoints: 50,
    badge: "Philosopher",
    options: [
      {
        id: "opt-13a",
        label: "Having complete freedom and peace of mind",
        emoji: "🕊️",
        description: "Autonomy and serenity."
      },
      {
        id: "opt-13b",
        label: "Making a meaningful impact on people",
        emoji: "💖",
        description: "Helping others thrive."
      },
      {
        id: "opt-13c",
        label: "Building deep, lasting relationships",
        emoji: "🤝",
        description: "Connection and love."
      },
      {
        id: "opt-13d",
        label: "Achieving mastery and high status in my passion",
        emoji: "👑",
        description: "Excellence and achievement."
      }
    ]
  },
  {
    id: 14,
    subtitle: "Q.14",
    title: "If you won a free all-expenses-paid trip tomorrow, where are we going?",
    type: "single-choice",
    instructions: "PICK YOUR DESTINATION ✈️",
    xpPoints: 50,
    badge: "Wanderlust",
    options: [
      {
        id: "opt-14a",
        label: "Historic cities & museum tours in Europe",
        emoji: "🏛️",
        description: "Cobblestone streets, art, and architecture."
      },
      {
        id: "opt-14b",
        label: "Tropical island relaxation & beach resorts",
        emoji: "🏝️",
        description: "Clear turquoise waters and palm trees."
      },
      {
        id: "opt-14c",
        label: "Wandering street markets & trying food in Asia",
        emoji: "🍜",
        description: "Night markets, street food, and vibrant neon."
      },
      {
        id: "opt-14d",
        label: "Mountain hiking & scenic nature retreats",
        emoji: "🏔️",
        description: "Crisp air, lakes, and epic mountain views."
      }
    ]
  },
  {
    id: 15,
    subtitle: "Q.15",
    title: "If you could have dinner with any historical figure or celebrity (past or present), who are you choosing?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Leonardo da Vinci, C.S. Lewis, Keanu Reeves...",
    xpPoints: 60,
    badge: "VIP Guest"
  },
  {
    id: 16,
    subtitle: "Q.16",
    title: "What’s your default reaction when plans suddenly get canceled?",
    type: "single-choice",
    instructions: "BE HONEST 😉",
    xpPoints: 50,
    badge: "Vibe Check",
    options: [
      {
        id: "opt-16a",
        label: "Relief! Secretly happy to stay home.",
        emoji: "🛋️",
        description: "Introvert win!"
      },
      {
        id: "opt-16b",
        label: "Slightly disappointed, but I'll pivot fast.",
        emoji: "🤙",
        description: "Easygoing and adaptable."
      },
      {
        id: "opt-16c",
        label: "Annoyed, I like sticking to the plan.",
        emoji: "📋",
        description: "Organization matters."
      },
      {
        id: "opt-16d",
        label: "Immediate search for a back-up plan.",
        emoji: "🚀",
        description: "Never let a weekend go to waste."
      }
    ]
  },
  {
    id: 17,
    subtitle: "Q.17",
    title: "What’s a funny or quirky childhood memory that always makes you laugh when you think back on it?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Trying to build a treehouse out of cardboard...",
    xpPoints: 60,
    badge: "Nostalgia"
  },
  {
    id: 18,
    subtitle: "Q.18",
    title: "What is your biggest green flag in another person?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 60,
    badge: "Pure Heart",
    options: [
      {
        id: "opt-18a",
        label: "A great sense of humor & witty banter",
        emoji: "😂",
        description: "Making each other laugh non-stop."
      },
      {
        id: "opt-18b",
        label: "Being a genuinely good listener & empathetic",
        emoji: "👂",
        description: "Remembers tiny details and listens closely."
      },
      {
        id: "opt-18c",
        label: "Ambitious and passionate about their goals",
        emoji: "🔥",
        description: "Driven, hardworking, and inspiring."
      },
      {
        id: "opt-18d",
        label: "Thoughtful with small, spontaneous gestures",
        emoji: "💐",
        description: "Surprise snacks, cute texts, and care."
      }
    ]
  },
  {
    id: 19,
    subtitle: "Q.19",
    title: "What’s a random rabbit hole or niche topic you've spent hours researching online?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Deep ocean creatures, space anomalies, true crime mysteries...",
    xpPoints: 75,
    badge: "Curious Mind"
  },
  {
    id: 20,
    subtitle: "Q.20",
    title: "Are you more of an early bird or a night owl?",
    type: "single-choice",
    instructions: "SELECT ONE ⏰",
    xpPoints: 50,
    badge: "Chronotype",
    options: [
      {
        id: "opt-20a",
        label: "Early bird—sunrise & productive mornings",
        emoji: "🌅",
        description: "Best energy before 9 AM."
      },
      {
        id: "opt-20b",
        label: "Night owl—my brain turns on after midnight",
        emoji: "🌙",
        description: "Midnight bursts of creativity."
      },
      {
        id: "opt-20c",
        label: "A mix of both depending on the day",
        emoji: "🔄",
        description: "Fluid sleep schedule."
      },
      {
        id: "opt-20d",
        label: "Permanently exhausted, time is an illusion",
        emoji: "💤",
        description: "Needs coffee immediately."
      }
    ]
  },
  {
    id: 21,
    subtitle: "Q.21",
    title: "What’s a skill or hobby you’ve always wanted to learn, but haven’t had the time to start yet?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Playing piano, pottery, surfing, coding AI agents...",
    xpPoints: 60,
    badge: "Future Master"
  },
  {
    id: 22,
    subtitle: "Q.22",
    title: "How do you recharge after a long, exhausting week?",
    type: "multi-choice",
    instructions: "SELECT ALL THAT APPLY 🔲",
    xpPoints: 50,
    badge: "Battery Full",
    options: [
      {
        id: "opt-22a",
        label: "Complete solitude—no social interaction",
        emoji: "🎧",
        description: "Quiet time in my room."
      },
      {
        id: "opt-22b",
        label: "Hanging out with my favorite person / small group",
        emoji: "👯",
        description: "Quality time with loved ones."
      },
      {
        id: "opt-22c",
        label: "Doing something active or getting outdoors",
        emoji: "🚴",
        description: "Gym, walk, or outdoor exercise."
      },
      {
        id: "opt-22d",
        label: "Sleeping in and pampering myself",
        emoji: "🛌",
        description: "10 hours of sleep + skincare."
      }
    ]
  },
  {
    id: 23,
    subtitle: "Q.23",
    title: "What’s a smell or sound that instantly triggers nostalgia for you?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Rain on pavement, fresh coffee beans, vintage vinyl...",
    xpPoints: 60,
    badge: "Sensory Time Machine"
  },
  {
    id: 24,
    subtitle: "Q.24",
    title: "If you could time travel, which direction are you heading first?",
    type: "single-choice",
    instructions: "SELECT ONE ⏳",
    xpPoints: 50,
    badge: "Time Traveler",
    options: [
      {
        id: "opt-24a",
        label: "Past—to witness history firsthand",
        emoji: "🏛️",
        description: "Ancient civilizations and classic eras."
      },
      {
        id: "opt-24b",
        label: "Future—to see futuristic tech and living",
        emoji: "🚀",
        description: "Sci-fi cities and space travel."
      },
      {
        id: "opt-24c",
        label: "Staying right here in the present moment",
        emoji: "✨",
        description: "Present mindfulness."
      },
      {
        id: "opt-24d",
        label: "Skipping back just 10 years to change a few things",
        emoji: "⏪",
        description: "Optimizing the recent path."
      }
    ]
  },
  {
    id: 25,
    subtitle: "Q.25",
    title: "What’s one simple thing that guaranteed puts a smile on your face no matter what kind of day you’re having?",
    type: "short-text",
    instructions: "ONE LINE ANSWER ✍️",
    placeholder: "e.g. Cute dog videos, fresh coffee, a warm hug, funny memes...",
    xpPoints: 75,
    badge: "Sunshine"
  },
  {
    id: 26,
    subtitle: "Q.26",
    title: "Be honest... Do you hate me? 😅",
    type: "single-choice",
    instructions: "PENULTIMATE CARD 🙈",
    xpPoints: 100,
    badge: "Truth Seeker",
    options: [
      {
        id: "opt-26a",
        label: "Not at all! Why would I?",
        emoji: "✨",
        description: "You're awesome!"
      },
      {
        id: "opt-26b",
        label: "Only when you ask silly questions 😉",
        emoji: "😜",
        description: "Just kidding!"
      },
      {
        id: "opt-26c",
        label: "Since I don't know you, so I can't say right now",
        emoji: "🌟",
        description: "100% wholesome vibes."
      },
      {
        id: "opt-26d",
        label: "Depends... are you going to buy me food?",
        emoji: "🌮",
        description: "Bribery accepted!"
      }
    ]
  },
  {
    id: 27,
    subtitle: "Q.27",
    title: "Last question: Do you like me? 💫",
    type: "single-choice",
    instructions: "THE FINAL MOMENT 💌",
    xpPoints: 150,
    badge: "Heart Locked",
    options: [
      {
        id: "opt-27a",
        label: "Yes, a lot!",
        emoji: "💖",
        description: "Full heart!"
      },
      {
        id: "opt-27b",
        label: "More than I probably admit...",
        emoji: "🌹",
        description: "Secretly crushing!"
      },
      {
        id: "opt-27c",
        label: "NO",
        emoji: "❌",
        description: "Let just be friends!"
      },
      {
        id: "opt-27d",
        label: "Obviously! Why else would I complete this quiz?",
        emoji: "💌",
        description: "100% proof right here!"
      }
    ]
  }
];
