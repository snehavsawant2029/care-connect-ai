# CareConnect AI - Frontend

A Next.js web application that helps people find essential support services like food assistance, healthcare, shelter, and community resources near their location using AI-powered recommendations.

## 🔗 Related Repositories

**Backend API**: https://github.com/snehavsawant2029/server

The frontend communicates with the FastAPI backend for all data operations including location services, AI chat responses, and service discovery.

## 📋 What This Application Does

CareConnect AI Frontend provides:

- **Interactive AI Chat**: Get personalized guidance through a conversational AI assistant that understands your needs
- **Service Discovery**: Find nearby support services filtered by category (food, medical, shelter, education, etc.)
- **Location-Based Search**: Automatically detect your location or manually search for any city
- **Age-Appropriate Content**: Tailored recommendations based on age groups (0-3, 4-9, 10-12, 13-17, 18+)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible Interface**: Easy-to-use design built with accessibility in mind

## 🛠️ Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Icon library

## 📦 Prerequisites

### For macOS:

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js (v18 or higher)**:
   ```bash
   brew install node
   ```

3. **Verify installation**:
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 9.x.x or higher
   ```

### For Windows:

1. **Download and install Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version (18.x or higher)
   - Run the installer and follow the prompts
   - Make sure to check "Add to PATH" during installation

2. **Verify installation** (in Command Prompt or PowerShell):
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 9.x.x or higher
   ```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd careconnect-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js and React
- TypeScript dependencies
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- All other project dependencies

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# For macOS/Linux:
touch .env.local

# For Windows (Command Prompt):
type nul > .env.local

# For Windows (PowerShell):
New-Item .env.local
```

Add the following environment variable to `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Note: Update this URL when deploying to production
# Production example: NEXT_PUBLIC_API_BASE_URL=https://api.careconnectai.com
```

**Important Notes:**
- The `NEXT_PUBLIC_` prefix is required for environment variables accessible in the browser
- Make sure your backend server is running on the specified URL
- Never commit `.env.local` to version control (it's in `.gitignore` by default)

### 4. Run the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to the URL to see the application running.

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot-reload

# Production Build
npm run build        # Create optimized production build
npm start            # Run production build locally

# Code Quality
npm run lint         # Run ESLint to check code quality
npm run type-check   # Run TypeScript type checking (if configured)
```

## 🔧 Configuration Files Explained

### `next.config.js`
Contains Next.js framework configuration including:
- Image optimization settings
- Build output configuration
- API route settings

### `tailwind.config.ts`
Defines Tailwind CSS customization:
- Color themes
- Custom spacing
- Typography settings
- Component variants

### `tsconfig.json`
TypeScript compiler configuration:
- Module resolution
- Path aliases
- Strict type checking rules

## 🌐 Connecting to Backend

The frontend expects the backend API to be running and accessible at the URL specified in `NEXT_PUBLIC_API_BASE_URL`.

**API Endpoints Used:**
- `POST /api/chat` - AI chat responses
- `POST /api/discover` - Service discovery
- `POST /api/reverse_geocode` - Location information
- `POST /api/contact` - Contact form submissions

Make sure your backend server is running before using these features.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already occupied:
```bash
# Kill the process (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Backend Connection Issues
- Verify backend server is running
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check browser console for CORS errors
- Ensure backend CORS settings allow frontend origin

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_API_BASE_URL=<your-backend-url>`
4. Deploy

### Other Platforms
- **Netlify**: Similar to Vercel
- **AWS Amplify**: Configure build settings
- **Docker**: Use the included Dockerfile (if available)

## 📝 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | Yes | `http://localhost:8000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

[Your License Here]

## 💬 Support

For issues and questions:
- Open an issue on GitHub
- Contact: contact@careconnectai.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)