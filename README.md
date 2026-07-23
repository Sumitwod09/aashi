# PulseQuest 🚀 — Interactive Vibe Check Quest

A modern, mobile-first, gamified interactive Q&A web application built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Lucide React icons**, and **SheetDB API**.

---

## 📊 SheetDB API Setup

1. Create a free account at [SheetDB.io](https://sheetdb.io).
2. Create a Google Sheet with column headers: `created_at`, `total_xp`, `q1`, `q2`, `q3`, ..., `q19`.
3. Connect your Google Sheet to SheetDB to generate your **API ID**.
4. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SHEETDB_API_ID=your_actual_sheetdb_api_id_here
```

### SheetDB Payload Format
When completing the final card level, an asynchronous `fetch()` POST request is sent to `https://sheetdb.io/api/v1/YOUR_API_ID`:

```json
{
  "data": [
    {
      "created_at": "2026-07-24T00:00:00.000Z",
      "total_xp": "1250 XP",
      "q1": "Answer 1",
      "q2": "Answer 2",
      "q18": "Answer 18",
      "q19": "Answer 19"
    }
  ]
}
```

---

## 🎮 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game!

---

## 🎨 Visual & Technical Features

- **Card-Stack Aesthetic**: Centered active card with layered, rotated background cards (`-rotate-2.5deg` and `rotate-2.5deg`) and soft gradients (`from-indigo-50 via-slate-50 to-pink-50`).
- **Gamified Header Bar**: Live XP progress counter, streak flame indicator, Web Audio API sound synthesizer, notification bell popover, and community chat drawer.
- **Segmented Progress Bar**: Dash segments representing card progress with animated gradient fills (`from-orange-400 to-pink-500`).
- **Framer Motion Animations**: Direction-aware slide and fade card transitions and tap scale feedback (`whileTap={{ scale: 0.95 }}`).
- **Curated 19 Cards**: Interactive multi-select checkboxes, single-line text inputs, single-choice cards, ending with *"Do you hate me? 😅"* and *"Do you like me? 💫"*.
