# Contributing to Voice Agent HTML Frontend

We love contributions! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/voice-agent-html.git
cd voice-agent-html
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up a backend**

This frontend requires a backend that implements the Voice Agent WebSocket endpoint. Use the [Node Voice Agent starter](https://github.com/deepgram-starters/node-voice-agent) or your own backend.

4. **Start development server**

```bash
pnpm dev
```

## Making Changes

### Code Style

- Use vanilla JavaScript (ES6+)
- Keep code organized in clearly marked sections
- Add comments for complex logic
- Use meaningful variable and function names

### HTML/CSS

- Follow existing Deepgram Design System patterns
- Use CSS custom properties for theming
- Maintain mobile responsiveness
- Keep accessibility in mind (ARIA labels, keyboard navigation)

### JavaScript

- Pure vanilla JS - no frameworks
- Use modern ES6+ features
- Handle errors gracefully
- Add user-friendly error messages

### Testing Changes

1. Test in multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices
3. Verify WebSocket connection works
4. Check audio capture and playback
5. Ensure UI is responsive

## Submitting Changes

1. **Create a branch**

```bash
git checkout -b feat/your-feature-name
```

2. **Make your changes**

Follow the code style guidelines above.

3. **Commit your changes**

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve audio playback issue on Safari"
git commit -m "docs: update API reference"
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

4. **Push your branch**

```bash
git push origin feat/your-feature-name
```

5. **Open a Pull Request**

- Use a clear, descriptive title
- Describe what changes you made and why
- Reference any related issues
- Include screenshots for UI changes

## Pull Request Guidelines

### Required

- [ ] Code follows existing style and patterns
- [ ] Changes are tested in multiple browsers
- [ ] Commit messages follow Conventional Commits
- [ ] PR description clearly explains changes

### Nice to Have

- [ ] Screenshots/videos for UI changes
- [ ] Updated documentation if needed
- [ ] Added comments for complex logic

## Feature Requests

Have an idea? [Open an issue](https://github.com/deepgram-starters/voice-agent-html/issues/new) with:

- Clear description of the feature
- Use case / problem it solves
- Example implementation (if applicable)

## Bug Reports

Found a bug? [Open an issue](https://github.com/deepgram-starters/voice-agent-html/issues/new) with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots or error messages

## Questions

- [Deepgram Discord](https://discord.gg/xWRaCDBtW4) - Chat with the community
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions) - Ask questions
- [Deepgram Docs](https://developers.deepgram.com) - API documentation

## Code of Conduct

This project follows the [Deepgram Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
