#!/usr/bin/env node
/**
 * Session Start Hook
 * Loads context and reminds Claude of key constraints
 */

const fs = require('fs');
const path = require('path');

// Load project memory
const memoryPath = path.join(__dirname, '..', '.memory.json');
let memory = {};

if (fs.existsSync(memoryPath)) {
  try {
    memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
  } catch (e) {
    console.warn('⚠️  Could not load .memory.json');
  }
}

// Session context
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 SCHNUCKS OMNICHANNEL — SESSION START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase 1 Banners: Festival Foods 🎪 + Hometown Grocers 🏡
                 (Schnucks deferred to future phase)

WWT Owns:        Frontend (React/RN) + CMS (Sanity)
Schnucks Owns:   Backend, Loyalty API, DevOps

High-Risk Paths: src/theme/ · src/rewards/ · sanity-studio/

Last Session:    ${memory.lastSession || 'No previous session'}
Open Tasks:      ${(memory.openTasks || []).join(', ') || 'None tracked'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
