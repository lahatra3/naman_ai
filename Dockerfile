FROM oven/bun:slim

WORKDIR /app

COPY package.json bun.lockb tsconfig.json main.ts ./

RUN bun install --production 

CMD [ "bun", "run", "main.ts" ]
