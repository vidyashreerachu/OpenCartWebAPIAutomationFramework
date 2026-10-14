#Takes image/copy  of playwright version v1.63 from microsoft
FROM mcr.microsoft.com/playwright:v1.63.0

#creates app directory
WORKDIR /app

ENV CI=true

COPY package.json package-lock.json ./

#downloads CI package
RUN npm ci

#copies the entire source_code/project inside the container -- volume mapping
COPY . .

CMD ["npx", "playwright", "test", "--project=chromium"]