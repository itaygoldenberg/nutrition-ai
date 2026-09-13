<h1 align="center">Nutrition AI</h1>

<p align="center"><em>Describe yourself and your goal, and get a meal plan built for it.</em></p>

<p align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---
## What it is

A form collects your details and what you are aiming for. The model returns a meal plan shaped to them, and the app renders it as something you can read rather than a paragraph of text.

## How it is put together

| Piece | What it does |
|---|---|
| `models/user-details.ts` | The typed shape of what the form collects |
| `models/meal-plan-model.ts` | The typed shape the answer has to come back in |
| `services/gpt.ts` | The single place that talks to the model |
| `services/nutrition-service.ts` | Turns the reply into that model |
| react-hook-form | Validation before anything is sent |

Typing the **answer**, and not only the request, is what makes the reply renderable. Without `meal-plan-model` the response is a string, and the interface has nothing to lay out.

```text
src/
|-- components/
|   |-- meal-selection/
|   `-- nutrition-area/
|-- models/
`-- services/
```

## Running it

```bash
npm install
```

```bash
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill in your own values:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

`.env` is ignored by git. Never commit real keys.

> **A note on the key.** A `VITE_` variable is bundled into the client and visible to anyone who opens the browser tools. Acceptable for a local exercise. A deployed version needs a server between the browser and the model.

---

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  <sub>John Bryce Full Stack Development</sub>
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg">GitHub</a> &middot;
  <a href="https://www.linkedin.com/in/itay-goldenberg/">LinkedIn</a>
</p>
