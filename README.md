# Auth API 🔐

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="API demo" width="200">

CRUD and Authentication API in Service-Controller Architecture, built with:

- Express.js
- Node.js
- TypeScript
- Prisma
- Docker
- pgAdmin

Backend deployed 🚀 https://render.com/  
DB deployed 🗄️ https://neon.com/

Application can sleep so first enter will take some time to wake it up 😴

Please use Postman, Frontend in progress 🛠️

## Unprotected Routes 🔓

Healthcheck ✅  
GET https://authapi-2and.onrender.com/

Get Users 👥  
GET https://authapi-2and.onrender.com/users/

Create User ➕  
POST https://authapi-2and.onrender.com/users/

```json
{
  "email": "a@example.com",
  "password": "a"
}
```

Update User ✏️  
PATCH https://authapi-2and.onrender.com/users/:id

```json
{
  "email": "updated@example.com",
  "password": "new-password"
}
```

Delete User 🗑️  
DELETE https://authapi-2and.onrender.com/users/:id

Login 🔑  
POST https://authapi-2and.onrender.com/auth/login

```json
{
  "email": "a@example.com",
  "password": "a"
}
```

_\* unprotected because this is a demo API_

## Protected Routes 🔒

Use login token in header 🪪

```txt
Authorization: Bearer YOUR_TOKEN
```

Get Protected Users 👥  
GET https://authapi-2and.onrender.com/auth/users/

Update User ✏️  
PATCH https://authapi-2and.onrender.com/auth/users/:id

```json
{
  "email": "updated@example.com",
  "password": "new-password"
}
```

Delete User 🗑️  
DELETE https://authapi-2and.onrender.com/auth/users/:id

## Prerequisites 📦

- Node.js 24+
- pnpm 8+
- Docker & Docker Compose

## Docker Development (hot reload) 🐳

```bash
pnpm dev
```

This starts:

- **API** - http://localhost:3000 (tsx watch, source mounted)
- **PostgreSQL** - localhost:5432
- **pgAdmin** - http://localhost:5050
