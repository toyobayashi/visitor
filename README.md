# visitor

[![](https://toyobayashi-visitor.vercel.app/api/visitor?uid=toyobayashi%2Fvisitor%2FREADME.md)](https://toyobayashi-visitor.vercel.app/api/visitor?uid=toyobayashi%2Fvisitor%2FREADME.md)

## Environment variables

Fill mongodb configuration.

```
VISITOR_DB_USER=<user>
VISITOR_DB_PASS=<pass>
VISITOR_DB_HOST=<host>
VISITOR_DB_NAME=<db>
```

## Local development

```bash
git clone https://github.com/toyobayashi/visitor.git
cd visitor
npm install
```

Create `.env` file in root, add environment variables mentioned above.

* Serverful

    ```bash
    npm run build:server

    # or
    # npm run watch:server
    ```

    ```bash
    node index
    ```

* Vercel dev (Serverless)

    ```
    npm install -g vercel
    npm run dev
    ```

## Deploy to Vercel

```
npm install -g vercel
npm run d:prod
```
