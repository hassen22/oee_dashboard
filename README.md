# OEE Dashboard

A monitoring dashboard that visualizes **Overall Equipment Effectiveness (OEE)** — including **availability**, **performance**, and **quality** across production shifts.

---

## Tech Stack

- **React + Vite** — fast and modern setup  
- **Tailwind CSS** — for responsive styling  
- **Dashboard Template** — used a prebuilt UI template for charts and layout  

---

## Assumptions

- **OEE** = Availability × Performance × Quality  
- **Availability** = Operating Time / Planned Production Time  
- **Performance** = (Ideal Cycle Time × Total Output) / Operating Time  
- **Quality** = Good Units / Total Units  

---

## Setup

```bash
npm install
npm run dev
