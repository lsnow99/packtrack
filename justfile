set positional-arguments
set export

@init:
  pnpm tsc

@run-backend:
  cd backend && pnpm dev

@watch-frontend:
  cd frontend && pnpm dev

