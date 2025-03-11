# Real Estate Project

A modern real estate platform built with React and Vite, featuring a component library showcased with Storybook.

## Author

**Ruver Dornelas**  
Email: ruverd@gmail.com  
GitHub: [github.com/ruverd](https://github.com/ruverd)  
LinkedIn: [linkedin.com/in/ruver-dornelas](https://linkedin.com/in/ruver-dornelas)

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Storybook** - Component documentation and testing
- **Vitest** - Unit testing
- **MirageJS** - API mocking

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ruverd/real-estate.git
   cd real-estate
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook for deployment

## Storybook

This project uses Storybook to document and showcase UI components. To view the component library:

```bash
npm run storybook
```

Then open your browser and navigate to `http://localhost:6006`

## Project Structure

```
src/
├── assets/           # Static assets
├── pages/            # Application pages
├── server/           # API and server-related code
├── shared/           # Shared utilities and components
│   ├── components/   # Reusable components
│   │   ├── ui/       # UI components with Storybook stories
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
└── main.tsx          # Application entry point
```

## Component Library

The UI components are built with Shadcn UI and TailwindCSS, and are documented in Storybook. Each component has its own story that demonstrates its usage and variants.

## Testing

Tests are written using Vitest and React Testing Library. Run the tests with:

```bash
npm run test
```
## License

[MIT](LICENSE)
