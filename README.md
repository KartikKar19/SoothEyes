# SoothEyes - Chrome Extension    

A thoughtfully designed Chrome extension that automatically adjusts website colors to warmer tones, reducing eye strain for developers who spend long hours coding. Built with React, TypeScript, and Tailwind CSS.

![SoothEyes](https://images.unsplash.com/photo-1461773518188-b3e86f98242f?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🌅 Automatic warm color adjustment for all websites
- 🎚️ Customizable warmth intensity
- 🔄 Persistent settings across browser sessions
- 💻 Optimized for development environments
- 🎨 Special handling for code blocks and syntax highlighting
- 🖼️ Smart image processing that maintains natural colors
- 📱 Responsive popup interface

## Installation

### From Chrome Web Store
*(Coming soon)*

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/KartikKar19/SoothEyes.git
cd SoothEyes
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from your project directory

## Development

Start the development server:
```bash
npm run dev
```

Build the extension:
```bash
npm run build
```

## Technical Details

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint

## How It Works

The extension applies a carefully tuned combination of CSS filters and color adjustments to create a warmer, more comfortable viewing experience:

- Adjusts website colors to warmer tones using CSS filters
- Preserves image and video quality while slightly warming them
- Optimizes code blocks for better contrast
- Customizes scrollbars for improved visibility
- Maintains persistent user preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
