#!/usr/bin/env node
/**
 * Session End Hook
 * Persists memory + triggers skill self-evaluation
 */

const fs = require('fs');
const path = require('path');

const memoryPath = path.join(__dirname, '..', '.memory.json');

// Load existing memory
let memory = {};
if (fs.existsSync(memoryPath)) {
  try {
    memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
  } catch (e) {}
}

// Update session timestamp
memory.lastSession = new Date().toISOString();

// Persist
fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));

// Self-evaluation prompt
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 SESSION END — SKILL SELF-EVALUATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before closing, consider:

1. Did anything break that isn't covered by a rule?
   → If yes, should a Hard Rule be added to CLAUDE.md?

2. Did you encounter a repetitive pattern that should be automated?
   → If yes, should a new skill be created in .claude/skills/?

3. Did an existing skill fail to catch an issue?
   → If yes, should that skill be updated?

4. Were there any multi-banner issues?
   → If yes, update .claude/skills/verify/SKILL.md

This is how the system grows — through real incidents, not upfront planning.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
