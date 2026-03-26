# Lancaster Brief Analyser

A web app built for Lancaster University students that turns dense assignment briefs into clear, actionable insight instantly.

## What it does

Reading a project brief can be overwhelming. Students often spend valuable time re-reading documents just to figure out what's actually being asked. The Lancaster Brief Analyser solves this by letting you paste in text or upload a PDF brief, and within seconds delivers a structured breakdown covering key themes, potential risks, deliverables, and suggested next steps — all presented in a clean dashboard view.

## How it uses AI

The app sends the brief content to the **Groq API**, which runs large language models at high speed. Groq's inference speed means analysis feels near-instant rather than like waiting for a slow API call. The AI reads the full brief and returns structured output identifying what the project is asking for, what could go wrong, and how to prioritise getting started.

## How it benefits the student journey

- **Reduces cognitive load** at the start of a new assignment, so students can focus on doing rather than deciphering
- **Surfaces risks early**  misunderstood requirements, unclear scope, or missed constraints — before they become late-stage problems
- **Gives students a starting framework** for planning their work, especially useful for first-year students still learning how to break down academic briefs
- **Supports PDF uploads**, so briefs downloaded from Moodle can be analysed directly without copy-pasting

## Running locally

**Prerequisites:** Node.js 18+, a [Groq API key](https://console.groq.com)

1. Clone the repo
```bash
git clone https://github.com/carinadesouza/lancaster-brief-analyser.git
cd lancaster-brief-analyser
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env.local file in the project root:
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local
```

4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


# Testing with Sample Assignments
For convenience, a folder called test-assignments is included in the repo. It contains several sample assignment briefs that can be used to quickly test the app without needing to upload your own PDFs.

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Groq SDK** for AI inference
- **PDF.js** for client-side PDF text extraction