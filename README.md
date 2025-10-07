# Digital Wallet Frontend

A **secure, role-based, and user-friendly** digital wallet frontend application built with **React.js**, **Redux Toolkit**, and **RTK Query**.  
Inspired by systems like **bKash** and **Nagad**, this project enables **Users**, **Agents**, and **Admins** to perform financial operations and manage wallets seamlessly.

---

##  Features

###  Public Landing Section

- Responsive **Home Page** with hero banner, navigation, footer, and animations
- **About, Features, Pricing (optional), Contact, and FAQ pages**
- Smooth transitions, skeleton loaders, and polished UX

###  Authentication

- JWT-based **Login & Registration**
- Role selection (**User** / **Agent**)
- Persisted authentication state
- Role-based redirection & Logout

###  User Dashboard

- Wallet overview with balance & recent transactions
- Deposit, Withdraw, and **Send Money**
- Transaction history with filters & pagination
- Profile management (update info & password)

### Agent Dashboard

- Overview with **cash-in/out summary**
- Add/Withdraw money for users
- Transaction & commission history
- Profile management

### Admin Dashboard

- System overview (users, agents, transactions, volume)
- Manage **Users** (block/unblock) & **Agents** (approve/suspend)
- Advanced search & filters on transactions
- Adjustable system fees/limits (optional)
- Profile management

### General Features

- Role-based navigation
- Global error handling & validations
- Data visualization (charts, tables, cards)
- **Toast Notifications** for feedback
- **Guided Tour** (5+ steps with react-joyride/driver.js)
- **Dark/Light mode**
- Fully responsive, accessible, and optimized

---

## Tech Stack

**Frontend:**

- React + React Router
- Redux Toolkit + RTK Query
- TypeScript
- Tailwind CSS

**Backend (for API):**

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt

---

##  Getting Started

### Clone the repository

```bash
git clone https://github.com/azir9200/digital-wallet-transactly
cd digital-wallet-frontend

Install dependencies
npm install
Setup environment variables

Create a .env file in the root directory:

VITE_API_URL=http://localhost:5000/api

4️⃣ Run the app
npm run dev


Frontend will run at:
 http://localhost:5173/

 Project Structure
src/
 ┣ components/     # Reusable UI components
 ┣ features/       # Redux slices & API services
 ┣ pages/          # Route pages (Public + Dashboard)
 ┣ layouts/        # Layouts for roles
 ┣ hooks/          # Custom hooks
 ┣ utils/          # Helpers & constants
 ┣ App.tsx         # App entry with routes
 ┗ main.tsx        # React DOM render

 Deployment

Vercel Live : https://digital-wallet-transactly.vercel.app/

Backend: https://github.com/azir9200/digital-wallet

🎥 Demo Video

 Watch https://youtu.be/f0kzNw6EkUI?si=Oxfdx7ZXljDF-zs-

(Shows login/registration, wallet operations, filtering, and role management.)

 Test Credentials


User
Email: user1@gmail.com
Password: 123456

 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit pull requests.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Your Name
🔗 Portfolio
 | LinkedIn: https://www.linkedin.com/in/azir9200

```
