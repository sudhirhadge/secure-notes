# 📝 Secure Notes App

A modern, fast, and secure notes application built with **React 18**, **Vite**, **Tailwind CSS**, and **Zustand**. Create, edit, and manage your notes with a smooth user experience.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1.0-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue?logo=tailwindcss)

---

## 🚀 Features

- ✅ **User Authentication** - Login and signup with persistent sessions
- ✅ **Create, Read, Update, Delete Notes** - Full CRUD functionality
- ✅ **Search Notes** - Quickly find notes by title or content
- ✅ **Real-time Updates** - Optimistic UI updates for instant feedback
- ✅ **Responsive Design** - Works great on desktop and mobile
- ✅ **State Persistence** - Auth and data persist across page refreshes
- ✅ **Error Handling** - Rollback notifications for failed operations
- ✅ **Protected Routes** - Secure pages visible only to authenticated users

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **React Router v6** | Client-side routing |
| **Zustand** | State management |
| **ESLint** | Code quality |

---

## 📦 Project Structure

```
src/
├── App.jsx                 # Routes configuration
├── main.jsx               # Entry point with BrowserRouter
├── index.css              # Tailwind & component styles
│
├── pages/
│   ├── LoginPage.jsx      # Login form
│   ├── SignupPage.jsx     # Signup form
│   ├── NotesPage.jsx      # Main notes view
│   └── ProfilePage.jsx    # User profile
│
├── components/
│   ├── Nav.jsx            # Navigation bar
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   ├── NoteCard.jsx       # Note display card
│   ├── NoteForm.jsx       # Add note form
│   ├── EditModal.jsx      # Edit note modal
│   └── Snackbar.jsx       # Notification component
│
├── hooks/
│   ├── useNotes.js        # Notes management hook
│   └── useForm.js         # Form handling hook
│
├── store/
│   ├── authStore.js       # Auth state (Zustand)
│   └── notesStore.js      # Notes state (Zustand)
│
└── lib/
    └── api.js             # API calls (mockable)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+ or yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vite-react-frontend-app.git
cd vite-react-frontend-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials
- Email: `demo@notes.app`
- Password: `Demo1234!`

Or create a new account — all data is stored in-memory.

---

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

---

## 🔧 Key Features Explained

### Authentication (Zustand)
- User login/signup state managed globally
- Sessions persist via localStorage
- Protected routes redirect unauthenticated users

```javascript
const user = useAuthStore(s => s.user)
const login = useAuthStore(s => s.login)
```

### Optimistic Updates
- Notes update immediately in UI while API request is pending
- If request fails, changes rollback and user is notified
- Smooth user experience without waiting for server

### Protected Routes
- Unauthenticated users redirected to login
- After login, redirects back to originally requested page

---

## 🌐 Deployment

### GitHub Pages
```bash
npm run deploy
```
Automatically builds and publishes to gh-pages branch.

### Vercel
1. Push code to GitHub
2. Connect repo to Vercel dashboard
3. Vercel auto-deploys on every push

[Deploy to Vercel](https://vercel.com/new)

---

## 🔌 Connecting a Real Backend

Replace the mock API in `src/lib/api.js` with your backend:

```javascript
// Example: Supabase
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(URL, KEY)

export const api = {
  getNotes: async () => {
    const { data } = await supabase.from('notes').select()
    return data
  },
  // ... other methods
}
```

Supported backends: Firebase, Supabase, REST API, GraphQL, etc.

---

## 📖 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [React Router v6](https://reactrouter.com/)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📧 Support

Have questions? Open an issue or reach out!

---

**Made with ❤️ by Sudhir**
