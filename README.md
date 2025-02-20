# Quiz-EZ Simple Quiz App

Welcome to **Quiz-EZ** – a modern, responsive quiz application built with vite+React! This app features a timer-based quiz experience, instant notifications via react-toastify, and a detailed breakdown of your performance after you complete a quiz. the app is available on s[https://quiz-mern-snowy.vercel.app/]

## Features

- **Dynamic Quiz Interface:**
  - Timed questions with a progress bar that auto-skips if time runs out.
  - Supports both multiple-choice and integer-answer questions.
- **Detailed Results Breakdown:**

  - View each question with your answer alongside the correct answer.
  - Visual feedback (✓ for correct, ✕ for wrong) for every question.

- **Instant Notifications:**
  - React-toastify alerts you immediately if your answer is correct or wrong.
- **Modern User Interface:**

  - Built using Tailwind CSS for a clean, responsive design.
  - Intuitive and engaging layout for an enjoyable user experience.

- **Local Storage:**
  - Your quiz attempts are stored locally using IndexedDB (via Dexie) so you can review your history at any time.

## Installation & Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/quiz-ez.git
cd quiz-ez/frontend
```

### 2. Install Dependencies

Install the required packages:

```bash
npm install
```

### 3. Start the Application

Run the development server:

```bash
npm run dev
```
