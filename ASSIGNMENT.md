# Frontend Coding Challenge: Production Line OEE Dashboard

## About ONIQ
ONIQ builds Production Excellence Software for manufacturing. Our platform helps production managers identify inefficiencies and scale operational excellence across their facilities.

## Your Challenge

Build a **React/TypeScript dashboard** that visualizes OEE metrics and helps production managers identify their biggest losses.

### Core Requirements (Must-Have)

#### 1. OEE Calculations
Calculate OEE and its three components for:
- Each individual shift
- The full day (all 3 shifts combined)

Implement the formulas correctly according to Lean Manufacturing standards.

#### 2. Dashboard Visualization
Display the following information clearly:

- **Main OEE Display** with color coding:
  - Green: ≥ 85% (World-Class)
  - Yellow: 65-85% (Acceptable)
  - Red: < 65% (Needs Attention)
- **Component Breakdown**: All three factors shown as percentages
- **Period Comparison**: Delta vs. previous period (improvement/decline)
- **Top 3 Downtime Reasons** with duration

### Extended Features (Nice-to-Have)

- **Shift Filter**: Toggle between individual shift views
- **Trend Indicators**: Show arrows ↑↓ for week-over-week changes
- **Pareto Analysis**: Visual breakdown of which downtime categories cost the most time
- **Mini Chart**: Simple bar or timeline visualization
- **Export Function**: Download calculations as JSON or CSV

## Provided Data

You'll receive `production-data.json` containing:
- 3 shifts (Early, Late, Night shift) 
- 8 downtime events (planned/unplanned)
- Production counts (target, actual, good, defects)
- Prior period comparison data

### Key Data Points:
```
Shift:
- plannedProductionTime: Scheduled production time in minutes
- targetQuantity: Target part count
- actualQuantity: Parts actually produced
- goodQuantity: Good parts (no defects)
- defectQuantity: Rejected parts

Production Line:
- targetCycleTime: Ideal cycle time per part in seconds

Downtime:
- type: "planned" or "unplanned"
- category: Main category (e.g., "Machine Failure")
- durationMinutes: Duration in minutes
```

## Deliverables

Please submit:

1. **Working React/TypeScript Application**
   - Use Vite, Create-React-App, or your preferred setup
   - Include all dependencies in `package.json`

2. **README.md** containing:
   - Setup instructions (install & run)
   - Brief explanation of your architecture decisions
   - Any assumptions you made

3. **Short Analysis (200-300 words)**:
   > "Based on this data: What are the 3 biggest problems with this production line? What would you recommend to the production manager?"

## Time Budget & Scope

⏱️ **Target Time: 2.5 - 3 hours**

**Focus:** Functionality and correct calculations over pixel-perfect design!

Feel free to use UI libraries (Material-UI, Ant Design, Tailwind, etc.) to save time.

## Technical Requirements

**Required:**
- React 18+
- TypeScript (strict mode recommended)
- Functional components & hooks

## Submission

Send us:
- Git repository (GitHub/GitLab) or
- ZIP file with complete project

## Questions?

If requirements are unclear or you have questions about the data, document your assumptions in the README. In actual work at ONIQ, we'd discuss these together.

Good luck! 🚀
