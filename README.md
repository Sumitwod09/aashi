# PulseQuest 🚀 — Modern Gamified Mobile Q&A App

A modern, mobile-first, gamified Q&A web application built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Lucide React icons**, and **Web3Forms API**.

---

## 🔑 Adding your Web3Forms Access Key

1. Get a **free Access Key** from [Web3Forms](https://web3forms.com).
2. Create a `.env.local` file in the root directory (or edit `.env.local`).
3. Add your key as shown below:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
```

> **Note:** If no key is set, the application will use a fallback demo key for testing form submissions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🎨 Features & Architecture

- **Card-Stack Aesthetic**: Centered card design with layered rotated background cards (`-rotate-2.5deg` and `rotate-2.5deg`) and soft gradients (`from-indigo-50 via-slate-50 to-pink-50`).
- **Gamified Header Bar**: Live XP progress counter, streak flame indicator, Web Audio API sound toggle, notification bell popover, and community chat drawer.
- **Segmented Progress Bar**: Dash segments representing question progress with animated gradient fills (`from-orange-400 to-pink-500`).
- **Framer Motion Animations**: Direction-aware slide and fade card transitions and tap scale feedback (`whileTap={{ scale: 0.95 }}`).
- **Web3Forms API Integration**: Asynchronous POST submission (`https://api.web3forms.com/submit`) with loading states and celebratory completion screen with `canvas-confetti`.
