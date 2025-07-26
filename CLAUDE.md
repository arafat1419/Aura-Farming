# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dashboard Pemerintah - A static React dashboard for Indonesian government to monitor parametric agricultural insurance data. This is a hackathon project that showcases satellite and AI-based agricultural insurance innovation.

**Key Context:**
- Target users: Indonesian government officials
- UI Language: Indonesian (Bahasa Indonesia)
- Code Language: English
- Framework: React with static data
- Purpose: Display parametric agricultural insurance metrics and farmer data
- Innovation: Satellite monitoring and AI-based damage assessment

## Project Knowledge

**System Context:**
- INOVASI ASURANSI PARAMETRIK PERTANIAN BERBASIS SATELIT DAN ARTIFICIAL INTELLIGENCE
- Uses satellite data and AI for crop monitoring and damage assessment
- Automated parametric triggers based on weather and satellite data
- Covers farmers with max 2 hectares of land
- Compensation: Rp 6 million per hectare for >75% crop damage
- Registration process involves farmer groups, PPL (extension workers), UPTD, and regional offices

**Dashboard Data Categories:**
1. Registration (Pendaftaran)
2. Insurance Application (Aplikasi Asuransi) 
3. Claimable Insurance (Asuransi yang Dapat Diklaim)
4. Farmer's Daily Diary (Catatan Harian Petani)
5. Satellite Monitoring (Monitoring Satelit)
6. AI Analytics (Analisis AI)

## Technology Stack

- React 18+
- Create React App or Vite
- CSS3/Tailwind CSS for styling
- Chart.js or similar for data visualization
- Indonesian language UI components

## Development Setup

```bash
npm install
npm start
```

## Common Commands

```bash
# Development
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint

# Git conventions
# Use conventional commits: type(scope): description
# Types: feat, fix, docs, style, refactor, test, chore
```

## Architecture

**Component Structure:**
- Dashboard container with sidebar navigation
- Data visualization components for each metric category
- Responsive layout for government office use
- Mock data services for static demonstration

**Key Features:**
- Real-time-looking metrics display
- Indonesian language interface
- Government-appropriate styling and branding
- Responsive design for various screen sizes