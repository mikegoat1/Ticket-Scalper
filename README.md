# Ticket Scalper

Ticket Scalper is a full-stack event discovery app that helps users search live ticket inventory, save events to a personal watchlist, and track target prices from a profile dashboard.

## Highlights

- Advanced event search with keyword, city, category, date range, max price, and sort filters.
- Server-side API proxy for SeatGeek and Ticketmaster so API keys stay out of client JavaScript.
- Session-based authentication with password hashing.
- Saved-events dashboard scoped to the logged-in user.
- Price-watch mock that lets users set a target price and see whether the saved event is below or above that target.
- Responsive event cards, empty states, loading states, and profile/detail views.
- Automated lint, syntax, and API route tests with GitHub Actions CI.

## Tech Stack

- Node.js
- Express
- Handlebars
- Sequelize
- MySQL
- express-session with Sequelize-backed session storage
- bcrypt
- Jest and Supertest
- GitHub Actions

## Demo Flow

1. Search for an event by artist, city, category, or date.
2. Sign up or log in.
3. Save an event from the homepage results.
4. Open the saved-events dashboard.
5. Add a target price to track the event.
6. Open the saved event detail page or remove it from the dashboard.

## Local Setup

Clone the repository and install dependencies:

```bash
npm install
```

Create a local MySQL database:

```bash
mysql -u root -p < db/schema.sql
```

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Set these values:

```bash
DB_NAME=event_db
DB_USER=root
DB_PASSWORD=your_mysql_password
SESSION_SECRET=generate_a_random_64_char_hex_string
SEATGEEK_CLIENT_ID=your_seatgeek_client_id
TICKETMASTER_API_KEY=your_ticketmaster_api_key
PORT=3001
NODE_ENV=development
```

Start the app:

```bash
npm start
```

Open:

```text
http://localhost:3001
```

## Testing

Run all checks:

```bash
npm test
```

This runs:

- ESLint
- JavaScript syntax checks
- Jest/Supertest API route tests

## Deployment Notes

This is an Express/MySQL application, so GitHub Pages cannot host the live backend. GitHub is used for source control, review, and CI. For a live demo, deploy the app to a Node-capable host such as Render, Railway, Fly.io, Heroku, or a VPS, then configure the same environment variables listed above.

Recommended production setup:

- Use a managed MySQL database.
- Set `NODE_ENV=production`.
- Set a strong `SESSION_SECRET`.
- Configure provider API keys as server-side environment variables.
- Run `npm test` in CI before deployment.

## Project Structure

```text
config/        Database and environment configuration
controllers/   Page routes and API routes
models/        Sequelize models
public/        Client JavaScript, CSS, and images
tests/         Jest/Supertest route tests
views/         Handlebars templates
server.js      Express app entry point
```

## Current Roadmap

- Add production deployment to a Node host.
- Add saved-event notes and statuses.
- Add server-backed target price storage.
- Add pagination for Ticketmaster results.
- Add end-to-end browser tests for the full save/delete flow.
