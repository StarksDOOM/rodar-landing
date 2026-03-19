# Project Constitution: Rodar.do Landing Site

This document outlines the guiding principles and rules for the development of the Rodar.do landing site.

## 1. Core Principles

- **Spec-Driven Development (SDD)**: All implementation must follow an approved specification.
- **User Code Supremacy**: **When the USER provides a code snippet directly, the ASSISTANT MUST use it 1:1.** No modifications to imports, logic, or styling are permitted unless the USER explicitly requests a change.
- **Incremental Rollout**: Features must be implemented in isolated branches and verified before merging into `develop`.

## 2. Technical Standards

- **Framework**: React 19+ / Vite.
- **Styling**: Tailwind v4 (using OKLCH colors and CSS variables).
- **Animations**: Framer Motion / `motion/react`.
- **Paths**: Use `@/` for all absolute imports from `src/`.

## 3. Communication

- The ASSISTANT must acknowledge and follow specific USER instructions even if they contradict previous patterns, prioritizing current USER context over past decisions.
