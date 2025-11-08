# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

## Prerequisites

This project requires **Node.js v20** (LTS). Node v23 and newer versions have compatibility issues with Sanity Studio dependencies.

### Setting up Node Version Manager (fnm)

We recommend using [fnm](https://github.com/Schniz/fnm) to manage Node.js versions:

**Install fnm:**
```bash
# macOS/Linux (via Homebrew)
brew install fnm

# Or via curl
curl -fsSL https://fnm.vercel.app/install | bash
```

**Configure your shell:**

Add this to your `~/.zshrc` or `~/.bashrc`:
```bash
eval "$(fnm env --use-on-cd)"
```

**Install and use Node 20:**
```bash
fnm install 20
fnm use 20
```

## Installation

From the project root directory:

```bash
# Install all workspace dependencies
npm install
```

## Running the Studio

```bash
# From the studio directory
cd studio
npm run dev
```

The studio will be available at [http://localhost:3333](http://localhost:3333)

## Troubleshooting

### Vite 504 Errors (Outdated Optimize Dep)

If you encounter 504 errors in the browser console:

1. Stop the dev server
2. Clear all caches:
   ```bash
   rm -rf .sanity node_modules/.vite node_modules/.sanity
   ```
3. Restart the dev server: `npm run dev`
4. Hard refresh your browser (Cmd+Shift+R on Mac)

### Node Version Issues

If you see errors related to `@portabletext/editor` or module exports:
- Verify you're using Node v20: `node --version`
- Switch to Node v20: `fnm use 20`
- Reinstall dependencies from the project root: `npm install`

## Resources

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
