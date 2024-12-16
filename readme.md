# Backend service

## Local Development

> Required dependencies

- `bun` is used to install packages and for runtime environment

> Run project

- `bun install` installing dependencies
- `bun run dev` starting development mode

```md
✨ default server listening on the port 8080

🌱 REST endpoints
http://localhost:8000/api
```

### In order for everything to work correctly, the PostgreSQL database must be up and running.

```bash
docker run -p 5432:5432 \
  --name llvm-quest-postgres \
  -e POSTGRES_PASSWORD=llvm-quest \
  -e POSTGRES_USER=llvm-quest \
  -e POSTGRES_DB=llvm-quest_dev \
  -d \
  --restart always \
  postgres:latest
```

After launching, perform migrations and seeding of all data, this can be done by writing:

- `bun run prisma:reset`

## Build image and run

### Build

```
docker buildx build -t llvm-quest-back .
```

### Run

```
docker run -d \
  --name llvm-quest-back \
  -p 8080:8080 \
  -e PORT=8080 \
  -e DATABASE_URL="postgresql://llvm-quest:llvm-quest@localhost:5432/llvm-quest_dev?schema=public" \
  -e DEEP_SEEK_KEY="-" \
  -e RESEND_API_KEY="-" \
  -e JWT_SECRET="-" \
  llvm-quest-back
```
