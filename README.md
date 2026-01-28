# PIRO – Pilates Booking App

PIRO is a modern web-based Pilates booking application that allows users to book sessions by date, time, and court with **real-time slot availability** and **anti double-booking protection**.

Built to simulate a real-world booking system with scalable backend logic and clean UX.

---

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Context API (global state management)

### Backend
- Supabase
  - Authentication (Email & Google OAuth)
  - PostgreSQL Database
  - RPC / Stored Functions
  - Realtime subscriptions

### Deployment
- Vercel

---

## Features

### Authentication
- Email & Password authentication
- Google OAuth login
- User profile with avatar and display name
- Secure session handling via Supabase Auth

### Booking Flow
- Select booking date
- Choose available time slots
- View courts with **real-time remaining slots**
- Private courts automatically limited to 1 booking per slot
- Anti double-booking protection (database-level)

### Payment Simulation
- Booking confirmation page with summary
- Simulated payment processing with loading state
- Success confirmation modal after booking

### Booking History
- View all past and upcoming bookings
- Displays date, time, court, and price
- Real-time updates after successful booking

### Real-Time Updates
- Slot availability updates automatically when bookings occur
- Powered by Supabase Realtime (Postgres changes)

---

## Live Demo

-> https://piro-umber.vercel.app

---

## Future Improvements

- User Settings (edit profile, notifications)
- Persistent shopping cart for multiple bookings
- Real payment gateway integration (Midtrans / Stripe)
- Admin dashboard for court & schedule management
- Booking reschedule & cancellation
- Email / WhatsApp booking reminders
- Analytics dashboard (peak hours, revenue)
- Footer & additional UI enhancements
- Dark mode support

---

## Run Locally

```bash
git clone https://github.com/masanuddin/PIRO.git
cd backend
go mod tidy
go run .
cd ../frontend
npm install
npm run dev
```

## Notes

This project focuses on **real-world booking logic**, not just UI:
- Capacity based availability
- Private vs shared sessions
- Race condition safe booking
- Scalable backend first design

---

## Author

Developed by **Marcellino Asanuddin**  
Computer Science - Intelligent Systems  
BINUS University

---

## License

This project is for educational and assessment purposes.
