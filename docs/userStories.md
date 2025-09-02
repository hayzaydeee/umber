# Umber MVP User Stories

## Authentication & Onboarding

### As a new user, I want to...

**US001: Create an account**
- Register with email and password
- Receive confirmation that my account was created
- Be automatically logged in after registration
- **Acceptance Criteria:** Valid email required, password min 8 chars, unique email validation

**US002: Complete quick onboarding**  
- Create my first Umber in under 30 seconds
- Add my first item via URL paste
- See how my Umber looks as a mind map
- Understand what Umbers are through usage, not explanation
- **Acceptance Criteria:** 3-step flow, no required reading, automatic progression

**US003: Log in and out**
- Log in with email/password
- Stay logged in across browser sessions  
- Log out securely
- **Acceptance Criteria:** JWT tokens, secure session management

---

## Umber Management

### As a user, I want to...

**US004: Create new Umbers**
- Give my Umber a descriptive name ("Tech Dreams", "Home Wishlist")
- See examples during creation to inspire me
- Have an "Unnested" area created automatically for loose items
- **Acceptance Criteria:** Name required (max 100 chars), auto-creates default nest

**US005: View all my Umbers**  
- See a grid/list of all my Umbers on the dashboard
- See key info: name, item count, total value
- Click to open any Umber
- **Acceptance Criteria:** Responsive grid, real-time counts, thumbnail/preview

**US006: Edit Umber details**
- Change the name and description
- Set a budget target (optional)
- Choose visual themes for different moods
- Delete Umbers I no longer need
- **Acceptance Criteria:** Inline editing, confirmation for deletion, theme preview

---

## Item Management  

### As a user, I want to...

**US007: Add items via URL**
- Paste any product URL and get item details automatically
- See scraped info: title, image, price
- Add optional reflection: "Why do I want this?"
- Have the item appear immediately in my Umber
- **Acceptance Criteria:** Works with major sites (Amazon, Shopify), graceful failures

**US008: Manually edit item details**
- Fix scraped titles that are too long/messy
- Add my own images if scraping failed
- Update price if I find it elsewhere
- Add notes about size, color, alternatives
- **Acceptance Criteria:** All fields editable, image upload option, auto-save

**US009: Organize items with priority**
- Mark items as high/medium/low priority  
- See visual indicators of priority in all views
- Filter items by priority level
- **Acceptance Criteria:** Color coding, filter dropdown, persistent across views

**US010: Track spending**
- See total value of items in each Umber
- Set budget targets and see progress
- Get visual warnings when approaching budget
- **Acceptance Criteria:** Real-time calculations, percentage indicators, gentle alerts

---

## Nest Organization

### As a user, I want to...

**US011: Create nests within Umbers**
- Add nests like "Living Room", "Office", "Man Cave" 
- Give each nest a clear name and description
- Choose whether items can be in multiple nests
- **Acceptance Criteria:** Modal creation form, exclusivity toggle, validation

**US012: Move items between nests**
- Drag items from "Unnested" into specific nests
- Move items between nests easily
- See items in multiple nests when exclusivity is off
- Remove items from nests without deleting them
- **Acceptance Criteria:** Drag-and-drop or modal selection, visual feedback

**US013: View items by nest**
- Switch between "All Items", "Unnested", and custom nests
- See item count for each nest
- Filter view to focus on specific nests
- **Acceptance Criteria:** Tab interface, real-time counts, smooth transitions

---

## Mind Map Visualization

### As a user, I want to...

**US014: See my Umbers as mind maps**
- View my entire Umber as a visual network
- See nests as containers and items as nodes
- Understand the organization at a glance
- Switch between mind map and list views
- **Acceptance Criteria:** React Flow implementation, smooth rendering, toggle button

**US015: Interact with the mind map**
- Drag items and nests to reorganize visually
- Zoom in/out and pan around the map
- Click items to see details or edit
- Have my layout automatically saved
- **Acceptance Criteria:** Persistent positioning, intuitive controls, auto-save

**US016: Customize mind map appearance**
- See different themes reflected in the visualization
- Have clean, beautiful default layouts
- Get auto-arrangement when things get messy
- **Acceptance Criteria:** Theme integration, auto-layout algorithm, reset option

---

## Dashboard & Overview

### As a user, I want to...

**US017: See my activity at a glance**
- View total Umbers, items, and spending across all collections
- See my most active/valuable Umbers
- Get a sense of my wishlist trends
- **Acceptance Criteria:** Stats cards, top Umbers list, recent activity

**US018: Quick actions from anywhere**
- Add new items quickly from any page
- Create new Umbers without going through menus
- Access my most recent Umbers fast
- **Acceptance Criteria:** Floating action button, keyboard shortcuts, sidebar recent list

---

## Core User Experience

### As a user, I want to...

**US019: Fast, responsive experience**
- Page loads under 3 seconds
- Smooth animations that feel intentional, not sluggish
- Mobile-friendly interface for on-the-go wishlist management
- **Acceptance Criteria:** Performance budgets, mobile responsive, touch-friendly

**US020: Reliable data handling**
- Never lose items I've added
- Have my changes saved automatically
- Recover gracefully from network issues
- **Acceptance Criteria:** Auto-save, offline indicators, error recovery

**US021: Privacy and control**
- Know that my wishlists are private by default
- Delete my account and data if needed
- Export my data in a useful format
- **Acceptance Criteria:** Private by default, data export, account deletion

---

## Nice-to-Have (Post-MVP)

### As a user, I might want to...

**US022: Reflection and mindfulness**
- Set cooling-off periods before I can purchase
- Get prompted to reflect on why I want things
- Track my decision-making patterns over time
- **Note:** Core brand differentiator, but not required for basic functionality

**US023: Sharing and community**
- Share beautiful galleries of my curated items
- Get inspiration from others' wishlists
- Ask trusted friends for opinions on items
- **Note:** Community features come after solid single-player experience

**US024: Advanced organization**
- Create nested sub-categories
- Tag items with multiple labels
- Set up automatic rules for organization
- **Note:** Power user features after core experience is solid

---

## Definition of Done

For each user story to be considered complete:

- [ ] Functionality works as described in acceptance criteria
- [ ] Responsive design (desktop + mobile)
- [ ] Error states handled gracefully  
- [ ] Loading states implemented
- [ ] Basic accessibility (keyboard navigation, alt text)
- [ ] Tested with at least 2 different browsers
- [ ] No console errors in normal usage
- [ ] Performance acceptable (no obvious lag)

---

## Story Priority for MVP

**Must Have (Week 1-2):** US001-US010
**Should Have (Week 3):** US011-US016  
**Good to Have (Week 4):** US017-US021
**Future:** US022-US024

This prioritization ensures core functionality first, then the key differentiator (mind maps), then polish and user experience improvements.