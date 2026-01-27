# Live Transcription HTML Frontend

Pure HTML/CSS/JavaScript frontend for [Deepgram's Speech-to-Text API](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio).

## Features

- 🎙️ Real-time speech-to-text transcription
- 🔴 Live audio streaming with visual feedback
- 📝 Live transcript display with auto-scroll
- 🎛️ Configurable transcription models and settings
- 📊 Connection and usage statistics
- 🎨 Built with [Deepgram Design System](https://github.com/deepgram/design-system)
- 🚀 No framework dependencies - pure vanilla JavaScript

## Prerequisites

- Node.js 14.0.0+
- pnpm 10.0.0+
- A backend server that implements the Live Transcription WebSocket endpoint

## Backend Requirements

This frontend requires a backend server that provides:

1. **WebSocket endpoint** at `/listen` that:
   - Accepts WebSocket connections
   - Streams audio to Deepgram's Speech-to-Text API
   - Returns transcription results in real-time

2. **HTTP endpoint** at `/metadata` (optional) that returns:
   ```json
   {
     "title": "Your App Title",
     "description": "Your app description",
     "repository": "https://github.com/your-org/your-repo"
   }
   ```

See the [Node.js Live Transcription starter](https://github.com/deepgram-starters/node-live-transcription) for a complete backend implementation example.

## Quickstart

### Install Dependencies

```bash
pnpm install
```

### Development Mode

**Option 1: With Backend (Recommended)**

When using with a backend like [node-live-transcription](https://github.com/deepgram-starters/node-live-transcription):

- **Access the app at:** `http://localhost:8080` (backend port)
- The backend proxies to Vite on port 5173 for HMR
- Users should NEVER access `http://localhost:5173` directly

The frontend's `vite.config.js` has `strictPort: true`, so Vite will fail if port 5173 is in use rather than switching to an alternative port (which would break the backend proxy).

**Option 2: Standalone (Development Only)**

To run the frontend standalone for UI development:

```bash
pnpm dev
```

This runs on `http://localhost:5173` and proxies `/listen` and `/metadata` requests to `http://localhost:8080`.

To change the backend URL, edit `vite.config.js`:

```javascript
proxy: {
  '/listen': {
    target: 'http://localhost:YOUR_BACKEND_PORT',
    ws: true,
  },
}
```

### Build for Production

```bash
pnpm build
```

Outputs to `dist/` directory. Serve these static files from your backend.

### Preview Production Build

```bash
pnpm preview
```

## Integration Patterns

### Pattern 1: Backend Proxies to Frontend (Development)

**Best for:** Active development with HMR (used by node-live-transcription)

- Backend: `http://localhost:8080` ← **Users access this URL only**
- Frontend (Vite): `http://localhost:5173` (internal, proxied by backend)
- Backend proxies all requests to Vite for HMR
- Vite proxies API routes (`/listen`, `/metadata`) back to backend

### Pattern 2: Backend Serves Frontend (Production)

**Best for:** Production deployment

1. Build frontend: `pnpm build`
2. Copy `dist/*` to backend's static files directory
3. Backend serves both static files and API endpoints

Example with Express:

```javascript
import express from 'express';
import path from 'path';

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/metadata', (req, res) => { /* ... */ });

// WebSocket endpoint at /listen
// ... WebSocket server setup
```

### Pattern 3: CDN + Backend API (Advanced)

**Best for:** Global scale, edge deployment

1. Build frontend: `pnpm build`
2. Deploy `dist/*` to CDN (Cloudflare, Vercel, etc.)
3. Update API endpoints in `main.js` to point to backend
4. Configure CORS on backend

## Configuration

### Transcription Settings

Located in the left sidebar:

- **Model**: Select STT model (nova-2, base, enhanced, etc.)
- **Language**: Set language code (en-US, es, fr, etc.)
- **Smart Format**: Enable smart formatting
- **Punctuate**: Enable automatic punctuation
- **Interim Results**: Show interim transcription results
- **Endpointing**: Configure silence detection

Settings can be changed before starting transcription.

### Environment Variables

Set `VITE_PORT` to change dev server port:

```bash
VITE_PORT=3000 pnpm dev
```

## Architecture

```
live-transcription-html/
├── index.html          # Main HTML structure
├── main.js            # All JavaScript logic
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies

main.js modules:
├── State Management   # WebSocket, audio, config state
├── DOM Initialization # Element references, event listeners
├── Metadata Loading   # Fetch /metadata endpoint
├── WebSocket Layer    # Connection, message handling
├── Audio Processing   # Microphone capture and streaming
├── Transcript Display # Live transcript rendering
└── UI Updates         # Status indicators, stats
```

## API Reference

### WebSocket Messages (Client → Server)

**Start** - Begin transcription with settings
```javascript
{
  type: 'start',
  model: 'nova-2',
  language: 'en-US',
  smart_format: true,
  punctuate: true,
  interim_results: true
}
```

**Audio** - Binary audio data (streamed continuously)
```javascript
// Binary audio data (Int16Array, 16kHz, mono)
```

**Stop** - End transcription
```javascript
{
  type: 'stop'
}
```

### WebSocket Messages (Server → Client)

**Transcript** - Transcription result
```javascript
{
  type: 'Results',
  channel: {
    alternatives: [{
      transcript: 'Hello world',
      confidence: 0.99
    }]
  },
  is_final: true,
  speech_final: true
}
```

**Metadata** - Stream metadata
```javascript
{
  type: 'Metadata',
  transaction_key: 'xxx',
  request_id: 'yyy',
  duration: 5.2
}
```

**Error** - Error occurred
```javascript
{
  type: 'Error',
  description: 'Error message',
  code: 'ERROR_CODE'
}
```

## Customization

### Styling

Uses Deepgram Design System CSS custom properties:

```css
/* Override in index.html <style> */
:root {
  --dg-primary: #13ef95;
  --dg-background: #0b0b0c;
  --dg-charcoal: #1a1a1f;
}
```

### Adding Features

The code is organized into clear sections in `main.js`:

1. **State Management** - Add new state properties
2. **DOM Elements** - Add new element references
3. **Event Listeners** - Add new interactions
4. **WebSocket Handlers** - Add new message types

## Troubleshooting

### WebSocket connection fails

- Ensure backend is running on correct port
- Check `vite.config.js` proxy configuration
- Verify backend implements `/listen` endpoint

### Microphone not working

- Check browser permissions
- Ensure HTTPS in production (HTTP only works on localhost)
- Verify WebAudio API support

### No transcription results

- Check API key is valid
- Verify audio is being captured (check browser console)
- Ensure audio format matches backend expectations (16kHz, mono, linear16)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Code of Conduct

This project follows the [Deepgram Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

For security policy and procedures, see [SECURITY.md](./SECURITY.md).

## License

MIT - See [LICENSE](./LICENSE)

## Related Projects

- [Node Live Transcription Starter](https://github.com/deepgram-starters/node-live-transcription) - Complete Node.js backend + this frontend
- [Deepgram Speech-to-Text API Docs](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Design System](https://github.com/deepgram/design-system)

## Getting Help

- [Open an issue](https://github.com/deepgram-starters/live-transcription-html/issues/new)
- [Deepgram Discord Community](https://discord.gg/xWRaCDBtW4)
- [Deepgram GitHub Discussions](https://github.com/orgs/deepgram/discussions)
