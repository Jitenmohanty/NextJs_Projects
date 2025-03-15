# AI Money Manager

An AI-powered financial management application that helps users track multiple accounts, manage transactions, and optimize budgets using AI-driven insights.

## 🚀 Features

- **Multi-Account Management** – Track and manage multiple financial accounts in one place.
- **AI-Powered Budgeting** – Get intelligent budget suggestions and expense insights using the Gemini API.
- **Automated Reports** – Scheduled financial reports via cron jobs.
- **Email Notifications** – Receive budget updates and alerts using Archjet.
- **Secure Authentication** – User authentication powered by Clerk.

## 🛠 Tech Stack

- **Frontend:** Next.js for a fast, scalable UI.
- **Backend:** Node.js & Express for API development.
- **Database:** Supabase PostgreSQL with Prisma ORM.
- **Authentication:** Clerk for secure user authentication.
- **AI Integration:** Gemini API for budget optimization.

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ai-money-manager.git
   cd ai-money-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   CLERK_FRONTEND_API=your_clerk_api_key
   GEMINI_API_KEY=your_gemini_api_key
   RESEND_API_KEY=your_key
   ARCJET_KEY=your_key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## 🚀 Deployment

You can deploy the app on **Vercel**, **Netlify**, or any cloud provider that supports Next.js.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For inquiries, reach out at **your-email@example.com** or visit the [GitHub Repository](https://github.com/your-username/ai-money-manager).

