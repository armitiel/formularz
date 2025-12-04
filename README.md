# Formularz Generator - Interactive Diasen Collaboration Proposal Tool

An interactive form generator that creates collaboration proposals based on customer responses for Diasen brand partnerships.

## Features

- **Two-page Experience**: 
  - Introduction page with brand storytelling
  - Interactive form with custom styling
- **Dynamic Form**: 4-section form with real-time data collection
- **Quote Generation**: Automated proposal generation based on form responses
- **File Download**: Automatic `.txt` file download with the generated proposal
- **Custom Design**: Beautiful UI with background images and glassmorphism effects

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Custom styling with backdrop blur effects
- **Vercel** - Deployment platform

## Project Structure

```
├── app/
│   ├── api/agent/route.ts    # API endpoint for proposal generation
│   ├── globals.css           # Global styles with Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with intro and form
├── public/
│   ├── living5.png          # Background for intro page
│   ├── tlo.png             # Background for form page
│   └── outside4.png        # Additional background asset
├── package.json
├── tailwind.config.js       # Tailwind configuration with custom colors
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/armitiel/formularz.git
   cd formularz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Form Sections

1. **Basic Information** - Name, company, email, role
2. **Two-Leg Work Model** - Activity distribution and time allocation
3. **Financial Model & Security** - Budget ranges and safety mechanisms
4. **Collaboration Goals** - Objectives, markets, and additional context

## API Endpoints

- `POST /api/agent` - Generates collaboration proposal based on form data

## Deployment

The application is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Deploy automatically with each push to master
3. Environment variables can be configured in Vercel dashboard

## Custom Styling

The project uses a custom color palette:
- `customStone`: #677661
- `customZinc`: #F3F3F3
- Backdrop blur effects for glassmorphism
- Background images with overlay styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push to your fork
5. Create a pull request

## License

This project is proprietary to Diasen brand collaboration initiatives.