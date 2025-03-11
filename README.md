## Getting Started

First, run the development server:

```bash
npm run dev
```
## Docker dev run
```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname

# Build dev
docker compose -f compose.dev.yaml build

# Up dev
docker compose -f compose.dev.yaml up

# remove all images and cache
docker compose -f compose.dev.yaml down -v
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
