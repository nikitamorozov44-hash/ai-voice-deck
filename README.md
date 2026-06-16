Markdown
# AI Voice Deck 🎙️

A sleek, lightweight, and modern Text-to-Speech (TTS) web application built with **React**, **TypeScript**, and **Vite**. The application integrates directly with the **ElevenLabs Neural Engine API** to deliver high-quality, real-time voice generation.

## 🚀 Live Demo
👉 **[View Deploy on Vercel](https://ai-voice-deck.vercel.app/)**

---

## ✨ Features
* **Real-time Neural TTS:** Direct client-side integration with ElevenLabs REST API using the advanced `eleven_multilingual_v2` model.
* **Production-Safe Security:** Built using Vite environment variables to ensure API keys are injected securely at build time and never exposed in the source control.
* **Modern UI/UX:** A responsive, clean dark-themed control deck built with custom CSS, optimized for layout balance and clarity.
* **Keyboard Enhancements:** Form-aware event handling that allows triggers like `Enter` for instant generation, bypassing empty or ongoing requests.

---

## 🛠️ Tech Stack
* **Frontend Core:** React 18 (Functional Components, Hooks)
* **Type Safety:** TypeScript
* **Build Tool & Bundler:** Vite (Fast Refresh & optimized production builds)
* **API Integration:** Native Browser Fetch API (Streaming audio blobs directly into native HTML5 Audio context)
* **Deployment:** Vercel Global Edge Network

---

## Local Setup & Installation

Follow these steps to run the project locally on your machine:

1. Clone the Repository:
git clone https://github.com/YOUR_GITHUB_USERNAME/AI-Voice-Deck.git
cd AI-Voice-Deck

2. Install Dependencies:
npm install

3. Configure Environment Variables:
Create a .env file in the root directory of the project and add your key:
VITE_ELEVENLABS_KEY=your_actual_elevenlabs_api_key_here

4. Run Development Server:
npm run dev