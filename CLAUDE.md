# EIDS Demo - Claude Code Instructions

## Project Overview

**EIDS (Enterprise Integrated Data System)** - AI-powered VA Healthcare Grant Applications platform for Defense Health Agency programs.

---

## Production URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://va-eids-demo.vercel.app |
| **GitHub** | https://github.com/aldrinstellus/eids-demo |
| **Branch** | `theme-3-enterprise-blend` |
| **Local Dev** | http://localhost:3022 |

---

## Quick Start

```bash
# Navigate to project
cd /Users/admin/Documents/claudecode/justice-league-missions/missions/JL-012-trinova-veteran-affairs/eids-demo

# Start local dev server
PORT=3022 npm run dev

# Deploy to production
git push && vercel --prod

# View production
open https://va-eids-demo.vercel.app
```

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **Theme**: Enterprise Blend (dark mode, emerald/cyan accents)
- **Deployment**: Vercel

---

## App Capabilities

| Feature | Description |
|---------|-------------|
| **AI Draft Generation** | Auto-generates grant application drafts with confidence scoring |
| **Split-View Layout** | Simultaneous ticket review and AI assistance panels |
| **Rich Text Editor** | Full editing capabilities with file uploads |
| **Version History** | Track all changes and revisions |
| **Role-Based Access** | Filtered views per persona/role |

**Compliance**: HIPAA, SOC 2, FedRAMP High Authority, NIST 800-53

---

## Demo Personas (5 Total)

| # | Name | Role | Color | Access Level |
|---|------|------|-------|--------------|
| 1 | Dr. Sarah Chen | Principal Investigator | Emerald | Research applications, funding |
| 2 | James Rodriguez | Grants Administrator | Cyan | Workflow management, approvals |
| 3 | Dr. Emily Carter | Clinician | Amber | Clinical program requests |
| 4 | Maria Thompson | Financial Analyst | Violet | Budget review, compliance |
| 5 | David Kim | System Administrator | Rose | Platform config, user access |

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/login` | Demo Access personas at TOP, then email/password form |
| `/` | Dashboard with stats, AI insights, quick actions |
| `/applications` | Role-filtered applications list |
| `/applications/[id]` | Application detail with AI recommendations |

---

## Design Status

**DESIGN IS FROZEN** - No UI changes allowed without explicit approval.

See `SAVEPOINT-2025-12-12-design-freeze.md` for frozen components.

---

## PRD Phase 1 Features (All Complete)

- [x] 1.1 AI Draft Generation with confidence scoring
- [x] 1.2 Dashboard & Ticket View (split-view layout)
- [x] 1.3 Draft Review & Editing (rich text editor)

---

## Important Notes

1. **Domain Change**: Original `eids-demo.vercel.app` was globally taken. Using `va-eids-demo.vercel.app` instead.

2. **Next.js Dev Indicators**: Disabled via `next.config.ts` and CSS in `globals.css`

3. **Supabase**: Environment variables configured in Vercel for production

---

## Savepoints

| File | Description |
|------|-------------|
| `SAVEPOINT-2025-12-12-final-verified.md` | Latest - production verified |
| `SAVEPOINT-2025-12-12-design-freeze.md` | Design freeze declaration |
| `SAVEPOINT-2025-12-12-test-progress.md` | Test results for personas |
| `SAVEPOINT-2025-12-12-login-reorder.md` | Login page layout change |

---

## Commands Reference

```bash
# Development
PORT=3022 npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Deploy
vercel --prod

# Check Vercel deployments
vercel ls
```

---

**Last Updated**: 2025-12-12
**Status**: Production Verified
**Design**: FROZEN
