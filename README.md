Thought for 2 seconds### Profile Explorer

A full-featured web application that allows users to view a list of profiles and interactively explore their locations on a map. Built with Next.js, React, and Mapbox.


## Features

- **Profile Listing**: Browse through profile cards with photos, names, and descriptions
- **Interactive Map**: View profile locations on an interactive Mapbox map
- **Profile Details**: Click on a profile to see detailed information
- **Admin Dashboard**: Add, edit, and delete profiles
- **Search & Filter**: Find profiles by name, description, or location
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Real-time Updates**: Map updates instantly when selecting profiles


## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Development](#development)
- [Deployment](#deployment)


## Installation

### Prerequisites

- Node.js 18.x or later
- npm or yarn


### Setup

1. **Clone the repository**


```shellscript
git clone https://github.com/yourusername/profile-explorer.git
cd profile-explorer
```

2. **Install dependencies**


```shellscript
npm install
# or
yarn
```

3. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
```

4. **Open your browser**


Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Configuration

### Mapbox API Token

The application uses Mapbox for map functionality. You need to obtain a Mapbox API token:

1. **Create a Mapbox account**

1. Go to [https://www.mapbox.com/](https://www.mapbox.com/)
2. Sign up for a free account



2. **Get your access token**

1. After signing in, go to your Account page
2. Navigate to "Access tokens"
3. Copy your default public token or create a new one
4. The token will start with `pk.`



3. **Configure the token in the application**

1. Create a `.env.local` file in the root directory
2. Add your Mapbox token:


```plaintext
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```


4. **Restart the development server**

1. The changes will take effect after restarting





### Token Security Notes

- Tokens used in browser applications are public and can be seen by users
- In the Mapbox dashboard, set appropriate restrictions:

- URL restrictions: Limit to your application's domain
- Rate limits: Set appropriate limits to prevent abuse



- Use different tokens for development and production


## Usage

### Main Features

1. **Browse Profiles**

1. View profile cards on the main page
2. Click "Show on Map" to highlight a profile's location
3. Click "View Details" to see more information about a profile



2. **Search and Filter**

1. Use the search box to find profiles by name or description
2. Use the location filter to find profiles in specific areas
3. Clear filters with the "Clear Filters" button



3. **Admin Dashboard**

1. Access the admin dashboard by clicking "Admin Dashboard" in the header
2. Add new profiles using the form on the left
3. Edit or delete existing profiles using the buttons in the list



4. **Profile Details**

1. View detailed information about a profile
2. See a larger map focused on the profile's location
3. View additional information like contact details and interests


Thought for 2 seconds### Profile Explorer

A full-featured web application that allows users to view a list of profiles and interactively explore their locations on a map. Built with Next.js, React, and Mapbox.





## Features

- **Profile Listing**: Browse through profile cards with photos, names, and descriptions
- **Interactive Map**: View profile locations on an interactive Mapbox map
- **Profile Details**: Click on a profile to see detailed information
- **Admin Dashboard**: Add, edit, and delete profiles
- **Search & Filter**: Find profiles by name, description, or location
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Real-time Updates**: Map updates instantly when selecting profiles


## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Development](#development)
- [Deployment](#deployment)


## Installation

### Prerequisites

- Node.js 18.x or later
- npm or yarn


### Setup

1. **Clone the repository**


```shellscript
git clone https://github.com/yourusername/profile-explorer.git
cd profile-explorer
```

2. **Install dependencies**


```shellscript
npm install
# or
yarn
```

3. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
```

4. **Open your browser**


Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Configuration

### Mapbox API Token

The application uses Mapbox for map functionality. You need to obtain a Mapbox API token:

1. **Create a Mapbox account**

1. Go to [https://www.mapbox.com/](https://www.mapbox.com/)
2. Sign up for a free account



2. **Get your access token**

1. After signing in, go to your Account page
2. Navigate to "Access tokens"
3. Copy your default public token or create a new one
4. The token will start with `pk.`



3. **Configure the token in the application**

1. Create a `.env.local` file in the root directory
2. Add your Mapbox token:


```plaintext
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```


4. **Restart the development server**

1. The changes will take effect after restarting





### Token Security Notes

- Tokens used in browser applications are public and can be seen by users
- In the Mapbox dashboard, set appropriate restrictions:

- URL restrictions: Limit to your application's domain
- Rate limits: Set appropriate limits to prevent abuse



- Use different tokens for development and production


## Usage

### Main Features

1. **Browse Profiles**

1. View profile cards on the main page
2. Click "Show on Map" to highlight a profile's location
3. Click "View Details" to see more information about a profile



2. **Search and Filter**

1. Use the search box to find profiles by name or description
2. Use the location filter to find profiles in specific areas
3. Clear filters with the "Clear Filters" button



3. **Admin Dashboard**

1. Access the admin dashboard by clicking "Admin Dashboard" in the header
2. Add new profiles using the form on the left
3. Edit or delete existing profiles using the buttons in the list



4. **Profile Details**

1. View detailed information about a profile
2. See a larger map focused on the profile's location
3. View additional information like contact details and interests



5. **Theme Toggle**

1. Switch between light and dark themes using the theme toggle in the header





## Project Structure

```plaintext
profile-explorer/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard
│   ├── profile/          # Profile details pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── profile-*.tsx     # Profile-related components
│   ├── map-*.tsx         # Map-related components
│   └── ...
├── lib/                  # Utility functions and data
│   ├── actions.ts        # Server actions for data mutations
│   ├── data.ts           # Data fetching functions
│   └── types.ts          # TypeScript type definitions
├── public/               # Static assets
└── ...
```

## Technologies

- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: React Context API
- **Data Fetching**: Next.js Server Components and Server Actions


## Development

### Data Management

In this demo application, data is stored in memory. In a production application, you would:

1. Replace the functions in `lib/data.ts` and `lib/actions.ts` with actual database calls
2. Set up a database like PostgreSQL, MongoDB, or a service like Supabase or Firebase
3. Implement proper authentication and authorization


### Geocoding

The application currently uses mock coordinates. In a real application:

1. Use a geocoding service like Mapbox Geocoding API to convert addresses to coordinates
2. Implement the geocoding in the `createProfile` and `updateProfile` functions
3. Add error handling for invalid addresses


### Custom Components

The UI is built with shadcn/ui components. To add or modify components:

```shellscript
npx shadcn@latest add [component-name]
```


5. **Theme Toggle**

1. Switch between light and dark themes using the theme toggle in the header
