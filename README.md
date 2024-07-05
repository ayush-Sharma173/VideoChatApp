
# VideoChatApp using React, socket.io, Node.js

## Installation

Setup Client

```bash
  cd client
  yarn
```

Setup Server

```bash
  cd server
  yarn
  npx prisma init
  npx prisma generate
```

Now add environment variables in the server's .env file

```bash
    PORT=3005
    DATABASE_URL=<postgres databse url>
    ZEGO_APP_ID=<ZEGO_APP_ID>
    ZEGO_APP_SECRET="<ZEGO_APP_SECRET>"
```

Now after this add the environment variables in the `next.config.js` file.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: <ZEGOCLOUD_APP_ID>,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "<ZEGOCLOUD_SERVER_ID>",
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;

```

