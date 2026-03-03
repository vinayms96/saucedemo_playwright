FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

COPY . /app/

RUN npm ci

VOLUME [ "/app/playwright-report" ]

CMD [ "npx", "playwright", "test" ]
