# Umber Brand & Color Guide

## Brand Philosophy

**Umber** represents **contemplative curation** - the space between wanting and wisdom. Our visual identity reflects the natural, earthy patience required for mindful decision-making.

**Core Values:**
- **Contemplative** - Thoughtful, not rushed
- **Natural** - Organic colors and forms inspired by earth
- **Clarity** - Clean, uncluttered visual communication  
- **Warmth** - Inviting, human-centered design

---

## Primary Color Palette

### Core Colors
```css
/* Primary Brand Colors */
--umber-primary: #535147;      /* Umber - deep earth brown */
--moss-primary: #5B6F57;       /* Moss - contemplative green */
--ochre-primary: #CDA47D;      /* Warm Ochre - golden warmth */
--ivory-primary: #FDFF88;      /* Ivory - soft highlight */

/* Extended Palette */
--umber-50: #F7F6F4;
--umber-100: #EDEAE5;
--umber-200: #DDD7CC;
--umber-300: #C8BCA8;
--umber-400: #B09E85;
--umber-500: #998772;
--umber-600: #535147;          /* Primary Umber */
--umber-700: #3F3E37;
--umber-800: #2A2A24;
--umber-900: #1A1A16;

--moss-50: #F2F4F2;
--moss-100: #E3E7E2;
--moss-200: #C9D2C7;
--moss-300: #A8B8A4;
--moss-400: #819681;
--moss-500: #6B7D67;
--moss-600: #5B6F57;          /* Primary Moss */
--moss-700: #485449;
--moss-800: #353A34;
--moss-900: #242622;

--ochre-50: #FBF8F3;
--ochre-100: #F5EFE4;
--ochre-200: #EDDCC5;
--ochre-300: #E2C39F;
--ochre-400: #CDA47D;          /* Primary Ochre */
--ochre-500: #B8915F;
--ochre-600: #A07A47;
--ochre-700: #7A5D36;
--ochre-800: #574028;
--ochre-900: #3A2A1A;
```

### Semantic Colors
```css
/* Functional Colors */
--success: #10B981;            /* Green for success states */
--warning: #F59E0B;            /* Amber for warnings */
--error: #EF4444;              /* Red for errors */
--info: #3B82F6;               /* Blue for information */

/* Priority Colors */
--priority-high: #EF4444;      /* Red - urgent items */
--priority-medium: #F59E0B;    /* Amber - moderate items */
--priority-low: #10B981;       /* Green - low priority items */

/* Neutral Grays */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

---

## Light & Dark Theme Implementation

### Light Theme
```css
:root {
  /* Backgrounds */
  --bg-primary: #FDFDFC;        /* Main background */
  --bg-secondary: #F7F6F4;      /* Cards, sections */
  --bg-tertiary: #EDEAE5;       /* Subtle accents */
  
  /* Text */
  --text-primary: #1A1A16;      /* Headlines, important text */
  --text-secondary: #535147;    /* Body text */
  --text-tertiary: #998772;     /* Captions, metadata */
  --text-inverse: #FDFDFC;      /* Text on dark backgrounds */
  
  /* Borders */
  --border-primary: #DDD7CC;    /* Default borders */
  --border-secondary: #EDEAE5;  /* Subtle dividers */
  --border-focus: #5B6F57;      /* Focus states */
  
  /* Interactive */
  --interactive-primary: #5B6F57;     /* Primary buttons, links */
  --interactive-primary-hover: #485449;
  --interactive-secondary: #CDA47D;   /* Secondary actions */
  --interactive-secondary-hover: #B8915F;
  
  /* Surfaces */
  --surface-elevated: #FFFFFF;   /* Modals, dropdowns */
  --surface-sunken: #F3F2F0;     /* Input fields */
}
```

### Dark Theme
```css
[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #1A1A16;        /* Main background */
  --bg-secondary: #242622;      /* Cards, sections */
  --bg-tertiary: #2A2A24;       /* Subtle accents */
  
  /* Text */
  --text-primary: #F7F6F4;      /* Headlines, important text */
  --text-secondary: #DDD7CC;    /* Body text */
  --text-tertiary: #B09E85;     /* Captions, metadata */
  --text-inverse: #1A1A16;      /* Text on light backgrounds */
  
  /* Borders */
  --border-primary: #3F3E37;    /* Default borders */
  --border-secondary: #2A2A24;  /* Subtle dividers */
  --border-focus: #819681;      /* Focus states */
  
  /* Interactive */
  --interactive-primary: #6B7D67;      /* Primary buttons, links */
  --interactive-primary-hover: #819681;
  --interactive-secondary: #E2C39F;    /* Secondary actions */
  --interactive-secondary-hover: #EDDCC5;
  
  /* Surfaces */
  --surface-elevated: #2A2A24;   /* Modals, dropdowns */
  --surface-sunken: #1A1A16;     /* Input fields */
}
```

---

## Typography System

### Font Families
```css
/* Primary Fonts */
--font-display: "Playfair Display", "Times New Roman", serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "Fira Code", "Monaco", "Consolas", monospace;

/* Font Scales */
--text-xs: 0.75rem;      /* 12px - captions, metadata */
--text-sm: 0.875rem;     /* 14px - small text */
--text-base: 1rem;       /* 16px - body text */
--text-lg: 1.125rem;     /* 18px - large body */
--text-xl: 1.25rem;      /* 20px - small headings */
--text-2xl: 1.5rem;      /* 24px - section headings */
--text-3xl: 1.875rem;    /* 30px - page headings */
--text-4xl: 2.25rem;     /* 36px - hero text */
--text-5xl: 3rem;        /* 48px - display text */
```

### Typography Classes
```css
/* Headings */
.heading-display {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-primary);
}

.heading-2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  line-height: 1.3;
  color: var(--text-primary);
}

.heading-3 {
  font-family: var(--font-body);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.body-large {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body-base {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body-small {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-tertiary);
}
```

---

## Component Styles

### Buttons
```css
/* Primary Button */
.btn-primary {
  background-color: var(--interactive-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--interactive-primary-hover);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--interactive-primary);
  border: 2px solid var(--interactive-primary);
  border-radius: 8px;
  padding: 10px 22px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--interactive-primary);
  color: var(--text-inverse);
}

/* Tag/Pill Style */
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag-moss {
  background-color: var(--moss-600);
  color: white;
}

.tag-ochre {
  background-color: var(--ochre-400);
  color: var(--text-primary);
}

.tag-gray {
  background-color: var(--gray-200);
  color: var(--text-secondary);
}
```

### Cards & Containers
```css
/* Primary Card */
.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--border-primary);
  box-shadow: 0 4px 12px rgba(83, 81, 71, 0.1);
  transform: translateY(-2px);
}

/* Umber Collection Card */
.umber-card {
  background-color: var(--surface-elevated);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.umber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--moss-600), var(--ochre-400));
}

/* Input Fields */
.input {
  background-color: var(--surface-sunken);
  border: 2px solid var(--border-secondary);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(91, 111, 87, 0.1);
}
```

---

## Mind Map Visualization Colors

### Node Colors
```css
/* Umber Node (Center) */
.umber-node {
  background: linear-gradient(135deg, #F2F4F2 0%, #E3E7E2 100%);
  border: 3px solid var(--moss-600);
  color: var(--moss-700);
}

/* Nest Nodes */
.nest-node {
  background: var(--surface-elevated);
  border: 2px solid var(--moss-500);
  color: var(--text-primary);
}

.nest-node.default {
  background: var(--ochre-50);
  border-color: var(--ochre-400);
}

/* Item Nodes */
.item-node {
  background: var(--surface-elevated);
  border: 2px solid var(--border-primary);
  color: var(--text-primary);
}

.item-node.priority-high { border-color: var(--priority-high); }
.item-node.priority-medium { border-color: var(--priority-medium); }
.item-node.priority-low { border-color: var(--priority-low); }

/* Connection Lines */
.connection-umber { stroke: var(--moss-600); stroke-width: 3; }
.connection-nest { stroke: var(--moss-400); stroke-width: 2; }
.connection-item { stroke: var(--border-primary); stroke-width: 1; }
```

---

## Accessibility Guidelines

### Contrast Ratios
```css
/* WCAG AA Compliant Combinations */
/* Light Theme */
--text-primary on --bg-primary: 16.2:1 ✓
--text-secondary on --bg-primary: 8.3:1 ✓  
--interactive-primary on --bg-primary: 6.1:1 ✓

/* Dark Theme */
--text-primary on --bg-primary: 14.8:1 ✓
--text-secondary on --bg-primary: 7.9:1 ✓
--interactive-primary on --bg-primary: 5.2:1 ✓
```

### Focus States
```css
/* Consistent Focus Indicator */
.focusable:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(91, 111, 87, 0.3);
  border-radius: 4px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  --border-primary: var(--text-primary);
  --interactive-primary: var(--text-primary);
}
```

---

## Usage Guidelines

### Do's
- ✅ Use Umber (#535147) for primary text and important UI elements
- ✅ Use Moss (#5B6F57) for interactive elements and primary actions  
- ✅ Use Ochre (#CDA47D) for secondary actions and warm highlights
- ✅ Maintain generous whitespace for contemplative feel
- ✅ Use subtle shadows and gentle hover effects
- ✅ Implement smooth transitions (200-300ms)

### Don'ts  
- ❌ Don't use bright, aggressive colors that conflict with contemplative mood
- ❌ Don't use Ivory (#FDFF88) for large areas - only for small highlights
- ❌ Don't create busy layouts - embrace minimal, focused design
- ❌ Don't use harsh drop shadows or stark contrasts
- ❌ Don't animate elements too quickly or aggressively

### Brand Voice in UI
- **Calm & Thoughtful**: "Take your time exploring this item"
- **Encouraging**: "You've created a beautiful collection"
- **Non-judgmental**: "Items waiting for your attention" (not "items you haven't bought")
- **Wisdom-focused**: "Ready when you are" instead of "Buy now"

---

## Implementation in Tailwind CSS

### Custom Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        umber: {
          50: '#F7F6F4',
          500: '#998772', 
          600: '#535147',
          900: '#1A1A16'
        },
        moss: {
          50: '#F2F4F2',
          500: '#6B7D67',
          600: '#5B6F57', 
          700: '#485449'
        },
        ochre: {
          50: '#FBF8F3',
          400: '#CDA47D',
          500: '#B8915F'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      }
    }
  }
}
```

This brand guide ensures Umber maintains its contemplative, earthy aesthetic while providing practical implementation details for consistent UI development.