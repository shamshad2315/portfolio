# Copilot Instructions for Portfolio Project

## Project Overview
This is a **premium personal portfolio website** for Shamshad Ansari (Full-Stack Developer & UI/UX Designer). It combines a vanilla HTML/CSS/JS frontend with a Node.js backend for email-based contact form handling.

**Tech Stack:** Express.js + Nodemailer (backend), Vanilla JS + CSS3 animations (frontend)

## Architecture & Data Flow

### Frontend Architecture
- **Single-page with multi-section scrolling** (`index.html`): Hero, About, Services, Projects, Timeline, Contact
- **No frontend framework** - pure vanilla JS for lightweight, performant interactions
- **Design System in CSS Variables** (`css/style.css`): Dark theme with cyan/purple/red accent colors
- **Key Features:**
  - Custom animated cursor with lerp interpolation
  - Particle network canvas background (WebGL-equivalent canvas API)
  - Dynamic typing effect in hero section
  - IntersectionObserver-based scroll reveal animations
  - Tabbed "About Me" section (Skills/Education/Tools)
  - Contact form with dual submission (localStorage + backend API)
  - Mobile-responsive hamburger navigation

### Backend Architecture
- **Express.js server** (`server.js`) - port 3000 by default
- **Single endpoint:** `POST /send-message` 
- **Dependencies:** `express`, `cors`, `nodemailer`, `dotenv`
- **Message flow:**
  1. Frontend sends form data as JSON
  2. Backend validates required fields
  3. Uses nodemailer to send email to configured SMTP server
  4. Returns success/error response to client

### Data Persistence
- **Frontend:** Messages stored in `localStorage['portfolioMessages']` (array of max 200 messages)
- **Admin view:** "Messages" button displays all saved submissions with timestamp
- **Backend:** No database - sends emails directly via SMTP, logs to console

## Development Workflow

### Running Locally
```bash
# Start backend server
npm start                    # Runs `node server.js` on port 3000

# Alternative: Use provided helper script (Python HTTP server)
./run.sh                     # Finds available port (8080+), opens browser automatically
```

**Environment Variables** (`.env` file required for backend email):
```
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@portfolio.com
FROM_NAME=Portfolio
DEST_EMAIL=shamshadansari43984@gmail.com
```

### Key File Responsibilities
| File | Purpose |
|------|---------|
| `index.html` | Semantic HTML structure with 6 major sections; all interactive elements reference JS/CSS |
| `css/style.css` | 1687 lines; CSS variables, glassmorphic cards, dark theme, responsive breakpoints at 768px |
| `js/main.js` | 482 lines; 9 major feature modules (cursor, particles, typing, scroll nav, mobile menu, tabs, scroll-reveal, contact form, messages admin) |
| `server.js` | Express endpoint for email delivery via Nodemailer |
| `package.json` | Minimal dependencies: express, cors, nodemailer, dotenv |

## Code Patterns & Conventions

### JavaScript Patterns
- **Section-based organization** in `main.js` - numbered comment blocks (1-9) for features
  - Each feature is self-contained with clear event listeners
  - Uses standard DOM APIs, no framework abstractions
  
- **IntersectionObserver for animations** - `.scroll-reveal` class triggers animations when visible
  ```javascript
  // Pattern: Single-trigger animation on scroll
  const observer = new IntersectionObserver((entries) => {
      if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once only
      }
  }, { threshold: 0.15 });
  ```

- **Lerp (Linear Interpolation) for smooth animations** - custom cursor uses easing factor:
  ```javascript
  const easing = 0.15;
  cursorX += (mouseX - cursorX) * easing; // Smooth follow effect
  ```

- **localStorage for client-side persistence** - saves all contact form submissions
  ```javascript
  JSON.parse(localStorage.getItem('portfolioMessages') || '[]')
  ```

### CSS Patterns
- **CSS Variables for theming** - all colors/spacing defined in `:root`
- **Glassmorphic design** - `.glass-card` class with `rgba(255,255,255,0.03)` background + backdrop-filter
- **Smooth transitions** - uses `--transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- **Mobile-first responsive** - breakpoint at `768px` for tablet/mobile adjustments
- **Custom scrollbar** - styled to match accent colors

### Form Handling Pattern
The contact form has **dual submission**:
1. **LocalStorage** - always saves for owner admin view (no network dependency)
2. **Backend API** - sends to `/send-message` for email delivery (graceful fail if offline)
```javascript
// Pattern: Fire & forget backend + local storage fallback
fetch('/send-message', { method: 'POST', body: JSON.stringify(msgObj) })
    .catch(err => console.error('Backend failed, but local save succeeded'));
```

## Critical Integration Points

### Frontend ↔ Backend
- **Endpoint:** `POST /send-message` (assumes same origin, CORS enabled)
- **Request format:** `{ name, email, subject, message, timestamp }`
- **Response:** `{ success: true }` or `{ error: 'message' }`
- **Note:** Backend MUST be running for email delivery; frontend gracefully degrades

### External Dependencies
- **Google Fonts:** Inter (body), Outfit (headings) - preconnect links in HTML head
- **FontAwesome 6.4.0 CDN:** Icons for social media, skills, tools
- **No npm dependencies in frontend** - all CSS/JS is vanilla

## Common Modification Patterns

### Adding New Sections
1. Add `<section id="section-id" class="section-name scroll-reveal">` to HTML
2. Add CSS with `.section-name` class (use existing CSS variables)
3. Add JS feature block in `main.js` with numbered comment
4. Update navigation in navbar HTML
5. Ensure scroll-reveal IntersectionObserver picks it up (class="scroll-reveal")

### Modifying Animations
- **Particle network:** Edit `maxParticles`, `connectionDistance` in main.js line ~155
- **Typing effect:** Edit `phrases` array in main.js line ~270
- **Scroll reveal threshold:** Adjust `threshold: 0.15` in main.js line ~440
- **Cursor easing:** Modify `easing = 0.15` in main.js line ~27 for faster/slower follow

### Styling Cards
- Use `.glass-card` class for consistent glassmorphic styling
- Apply glow effects with `--glow-cyan`, `--glow-purple`, `--glow-red` CSS variables
- Hover states automatically handled by CSS transitions (--transition-smooth)

## Testing & Validation

### Manual Testing Checklist
- [ ] **Mobile responsiveness** - test at 375px, 768px, 1024px widths
- [ ] **Particle canvas** - verify particles show and reduce on mobile (<768px)
- [ ] **Contact form** - submit with backend ON and OFF; verify localStorage
- [ ] **Scroll animations** - ensure sections fade in at correct thresholds
- [ ] **Navigation** - test active link highlighting on scroll
- [ ] **Typing effect** - ensure phrases cycle smoothly with proper timing

### Email Testing
- Use valid SMTP credentials in `.env`
- Frontend will show success UI even if backend fails (check console for errors)
- Check localStorage ("Messages" button) for persistent record of submissions

## Common Pitfalls to Avoid

1. **Forgetting environment variables** - backend will crash if SMTP_HOST etc. missing
2. **CORS issues** - if backend on different port, ensure CORS middleware is active
3. **Particle performance** - don't increase `maxParticles` above 100 on desktop
4. **localStorage quota** - portfolio keeps last 200 messages; older ones discarded
5. **Scroll reveal timing** - don't use `threshold: 1.0` (too late), prefer 0.15-0.3
6. **Mobile menu state** - ensure hamburger icon transforms are reset when menu closes

## Performance Optimization Notes

- **Canvas particle animation** uses `requestAnimationFrame` for 60fps smoothness
- **Custom cursor** also uses `requestAnimationFrame` - disable if performance issues
- **Lazy loading** - consider adding for project images (currently not lazy-loaded)
- **CSS animations** use `transform` and `opacity` (GPU-accelerated) rather than position changes
- **Intersection Observer** is more efficient than scroll event listeners for reveal animations
