# The Joy of Lending — Project Guidelines

## Project Overview

This is the website for **The Joy of Lending**, a California-based mortgage company specializing exclusively in VA home loan products. The site serves veterans, active-duty service members, and eligible surviving spouses looking to achieve homeownership. The company is led by **Tim**, a recognized VA home loan expert in California.

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Static build (adaptable to Vercel, Netlify, or any static host)

## Design System

### Color Palette — Patriotic / Military-Inspired

| Token            | Hex       | Usage                                  |
|------------------|-----------|----------------------------------------|
| `navy`           | `#0A1628` | Primary background, headers            |
| `navy-mid`       | `#132240` | Card backgrounds, secondary sections   |
| `navy-light`     | `#1B3A5C` | Hover states, borders                  |
| `red`            | `#B22234` | CTAs, accents, alerts                  |
| `red-light`      | `#D4435A` | Hover states for red elements          |
| `gold`           | `#C5A55A` | Stars, highlights, premium accents     |
| `gold-light`     | `#E2CB82` | Subtle gold highlights, icon fills     |
| `cream`          | `#F5F0E8` | Light section backgrounds, body text   |
| `white`          | `#FFFFFF` | Text on dark backgrounds               |
| `text-muted`     | `#8A9BB5` | Secondary text on dark backgrounds     |

### Typography

- **Display / Headings:** Use a strong serif or slab-serif font (e.g., Playfair Display, Libre Baskerville, or similar). Headings should feel authoritative and trustworthy.
- **Body:** Use a clean sans-serif (e.g., Source Sans Pro, DM Sans, or similar). Body text should be highly readable at all sizes.
- **Avoid:** Inter, Roboto, Arial, system fonts — these feel generic and do not match the premium military aesthetic.

### Design Principles

- **Bold & Patriotic:** Use strong navy backgrounds with gold and red accents. Think military honor, not political campaign.
- **Trust-first:** Every design choice should communicate reliability, expertise, and respect for service members.
- **Generous whitespace:** Let content breathe. Avoid cramped layouts.
- **Subtle texture:** Consider subtle background patterns (e.g., faint star patterns, geometric lines, or grain overlays) to add depth without distraction.
- **Responsive:** Mobile-first design. All sections must work well from 320px to 1920px+.

## Site Sections

### 1. Hero
- Strong headline about serving those who served
- Brief tagline about VA home loan specialization in California
- Primary CTA: "Get Started" or "Talk to Tim"
- Background: dark navy with subtle American-themed imagery or pattern

### 2. About Us
- Company mission and founding story
- Emphasis on exclusive VA loan focus
- Key benefits of VA loans: zero down payment, no PMI, competitive rates

### 3. Meet Tim
- Tim's bio and expertise
- Years of experience, thousands of veterans served
- Personal photo placeholder
- Emphasis on California market knowledge

### 4. VA Loan Products
Four product cards with interactive expand/collapse or tabs:
- **VA Purchase Loans** — zero down, no PMI, favorable rates
- **VA IRRRL (Streamline Refinance)** — fast rate reduction, minimal docs
- **VA Cash-Out Refinance** — access home equity for any purpose
- **VA Jumbo Loans** — financing for California's high-cost markets

### 5. Why Choose Us
- Exclusive VA focus
- Deep California market expertise
- Statewide service from San Diego to Sacramento
- Personalized attention on every transaction

### 6. Contact / CTA
- Contact form (name, email, phone, message)
- Phone number and email display
- Serving all of California callout
- Final strong CTA

## Content Tone

- Professional but warm
- Respectful and honoring of military service
- Confident expertise without being salesy
- Clear, jargon-free explanations of VA loan products
- Always position Tim as the knowledgeable, caring expert

## Animations & Interactions

- Staggered fade-in on scroll for section content
- Smooth hover effects on cards and buttons
- Subtle parallax on hero section
- Interactive product cards (expand/collapse or tabbed interface)
- Smooth scroll navigation between sections
- Loading/entrance animations that feel polished, not distracting

## Accessibility

- Minimum AA contrast ratios on all text
- Semantic HTML elements throughout
- Keyboard-navigable interactive elements
- Alt text on all images
- Focus-visible styles on all interactive elements

## File Structure

```
src/
├── components/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── MeetTim.jsx
│   ├── Products.jsx
│   ├── WhyChooseUs.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Key Company Details (for reference)

- **Company Name:** The Joy of Lending
- **Specialization:** VA home loans exclusively
- **Location:** California (serves entire state)
- **Lead Expert:** Tim
- **Products:** VA Purchase, VA IRRRL, VA Cash-Out Refinance, VA Jumbo
- **Target Audience:** Veterans, active-duty service members, eligible surviving spouses
- **Key VA Loan Benefits:** Zero down payment, no private mortgage insurance, competitive interest rates, backed by U.S. Department of Veterans Affairs
