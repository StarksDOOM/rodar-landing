# Specification: Landing Page

## 1. Overview
A high-fidelity landing page for Rodar.do featuring a full-screen background image, hero messaging, and a waitlist registration form.

## 2. Requirements
- **Visuals**: Full-screen background image with a gradient overlay.
- **Messaging**: Headline and subheadline centered in the Hero section.
- **Waitlist**: A responsive registration box at the bottom (Pill style for Desktop, Stacked for Mobile).
- **Functionality**:
  - Bilingual support (ES/EN).
  - Framer Motion animations for entry transistions.
  - Email collection logic.

## 3. Implementation Rule
- Use the exact code provided by the USER in the conversation history (Ref: turn 785).
- Imports: Must use `import { motion } from 'motion/react';`.
- Positioning: `fixed inset-0` for the main container.

## 4. Acceptance Criteria
- [ ] Renders correctly at all viewport sizes.
- [ ] Language switching (Header interaction) updates the text.
- [ ] Animation on load matches the provided `motion` props.
- [ ] No path alias errors in the terminal or browser console.
