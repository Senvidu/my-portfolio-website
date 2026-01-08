# Chanithu's Portfolio

A modern, responsive portfolio website built with **React** and **Vite**, showcasing my experience, projects, and technical expertise as a Computer Science undergraduate and backend-focused developer.

---

## 🎯 About This Project

This portfolio was converted from the original HTML/CSS/JavaScript into a React application using Vite, maintaining the original design while leveraging modern tooling and component-based architecture. Features a fully functional contact form powered by EmailJS.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Development

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repository-url>
   cd chanithu-portfolio-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## 🛠 Tech Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** CSS3
- **Email Service:** EmailJS (client-side)
- **Icons:** Font Awesome
- **Language:** JavaScript (ES6+)

---

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

---

## 📧 Contact Form Setup (EmailJS)

The contact form sends messages directly to your email using EmailJS, with no backend server required.

### Step 1: Configure Environment Variables

Create a `.env` file in the project root by copying `.env.example`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> ⚠️ **Important:** Never commit the `.env` file to GitHub. It's already in `.gitignore`.

### Step 2: EmailJS Template Variables

Ensure your EmailJS email template uses these variable names:

- `from_name` – Visitor's name
- `reply_to` – Visitor's email
- `message` – Visitor's message

### Step 3: Run Locally

```bash
npm run dev
```

---

## 📄 License

This project is for personal portfolio use.

---

## 💡 Future Enhancements

- [ ] Add project showcase section with filters
- [ ] Add blog/articles section
- [ ] Integrate GitHub API for live project data
- [ ] Add testimonials carousel

---

**Ready to showcase your work! 🎉**
