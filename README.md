# Fixit Play Learn

Build a mobile-first web app called "Revise" — a gamified phone repair academy inspired by Duolingo's visual aesthetic and micro-interactions.

Visual Style:

- Duolingo-inspired playful 3D buttons (chunky bottom borders that depress on click).

- High-contrast energetic palette: Emerald green (#58cc02), vibrant blue, safety orange, dark slate background elements.

- Top status bar: Streak flame (🔥), Gears/Coins (⚙️), Hearts (❤️, max 5), and a toggleable 'Pro Member' badge.

Core Pages & Structure:

1. Learn Path (Skill Tree):

   - Vertical zigzagging path with circular lesson nodes.

   - Active pulsating node for current lesson, lock icons for upcoming lessons.

   - Clicking a node opens a slide-over/modal with the lesson overview and "Start Lesson" button.

2. Lesson Experience (Two-Step Flow):

   - Stage 1: Rich Explainer / Theory card. Crisp visual step breakdowns, required tools (e.g., P2 Pentalobe, Tri-Point Y000, 75°C heat mat), and critical warnings (e.g., battery puncture hazards, flex cables).

   - Stage 2: Interactive Quiz / Practice. Multiple-choice questions, "Identify the tool", and "Order the disassembly steps". Wrong answers lose a heart with screen shake and error sound; passing triggers confetti and XP gain.

3. Pro Workbench (Interactive Repair Simulator):

   - Selector for device (iPhone 13, iPhone 14 Pro, Samsung S23) and repair type (Battery replacement, Screen replacement).

   - Visual step-by-step disassembly sequence with layered components (Frame, Screen lifting at 90°, EMI shield, Battery with pull-tabs).

   - Step progress indicator, screw mat tracker, and big hands-free 'Next Step' / 'Previous Step' buttons.

   - Blur/lock this screen with an upgrade prompt if 'Pro Member' is toggled off.

Use React, Tailwind CSS, Lucide icons, and Framer Motion for smooth bouncy animations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/19d2bcec-f80c-4bf8-a188-6a524cded1ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
