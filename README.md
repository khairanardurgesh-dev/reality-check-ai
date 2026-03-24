# Reality Check AI

A brutally honest AI-powered life analysis SaaS web application.

## Features

- **AI-Powered Analysis**: Uses OpenAI GPT to provide brutally honest life assessments
- **Modern UI**: Dark theme with gradient backgrounds and smooth animations
- **Freemium Model**: 1 free analysis, then ₹99 for unlimited access
- **Share Results**: Download analysis results as shareable images
- **Mobile-First**: Fully responsive design for all devices
- **Loading States**: Beautiful loading animations during analysis

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Image Export**: html2canvas
- **Storage**: LocalStorage for MVP (easily upgradeable to Supabase)

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── analyze/       # OpenAI analysis endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── questions/         # Questions form page
│   ├── results/           # Results display page
│   └── paywall/           # Premium upgrade page
├── components/
│   └── ui/                # Reusable UI components
│       ├── Button.tsx     # Custom button component
│       └── Slider.tsx     # Custom slider component
└── utils/
    ├── openai.ts          # OpenAI API integration
    └── storage.ts         # Local storage management
```

## How It Works

1. **Home Page**: Landing page with app introduction
2. **Questions Page**: Users answer 6-7 questions about their habits
3. **Analysis**: Answers are sent to OpenAI API with a structured prompt
4. **Results Page**: Displays AI analysis in a beautiful card format
5. **Freemium Logic**: First analysis is free, subsequent analyses require payment
6. **Share Feature**: Users can download their results as an image

## API Integration

The app uses OpenAI's GPT-3.5-turbo model with a carefully crafted prompt that ensures:

- Brutally honest responses
- Structured JSON output
- Consistent formatting
- Harsh but constructive tone

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your OpenAI API key as an environment variable in Vercel
4. Deploy!

### Environment Variables for Production

- `NEXT_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key

## Future Enhancements

- [ ] Supabase integration for real database
- [ ] User authentication with email/password
- [ ] Progress tracking over time
- [ ] More detailed analysis categories
- [ ] Social sharing integration
- [ ] Mobile app (React Native)

## License

MIT License - feel free to use this project for your own purposes!
