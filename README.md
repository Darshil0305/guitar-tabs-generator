# Guitar Tabs Generator

A web application that generates guitar tabs from YouTube videos with customizable options for capo position and playing style.

## Features

- Input any YouTube URL to generate guitar tabs
- Toggle between using a capo or standard position
- Choose between fingerstyle or strumming patterns
- Responsive design works on mobile and desktop
- Clean, modern UI focused on readability

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/guitar-tabs-generator.git
   cd guitar-tabs-generator
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it Works

This application simulates a guitar tab generation service. In a real-world scenario, this would connect to APIs that analyze music and generate tablature. For demonstration purposes, we've included pre-defined tabs for a few popular songs and generate mock tabs for other videos.

Key songs with custom tabs:
- "Never Gonna Give You Up" - Rick Astley
- "Hotel California" - Eagles
- "Free Fallin" - Tom Petty
- "Nothing Else Matters" - Metallica
- "Purple Haze" - Jimi Hendrix

## Technologies Used

- Next.js - React framework for building the UI
- TypeScript - For type-safe code
- Tailwind CSS - For styling
- React Hooks - For state management

## Project Structure

- `/app` - Next.js app router directory
- `/app/components` - React components
- `/app/utils` - Utility functions
- `/public` - Static assets

## Note

This is a demonstration project. There is no actual audio analysis happening - the tabs are predefined for demo purposes. In a production environment, this would connect to music analysis APIs and generate real tablature from the audio.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
