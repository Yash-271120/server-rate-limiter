## Technology Stack & Tools

- Express
- Typescript
- Node js
- MongoDB


## Folder Structure
root/
├── src/
|   ├── classes/
│   │   ├── mutex.ts
│   │   ├── rateLimiter.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   ├── middleware/
│   │   ├── authentication.ts
│   ├── models/
│   │   ├── user.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
├── config/
│   ├── config.ts
├── app.ts
├── tsconfig.json

## steps to get it running
1. run `npm install`
2. create a `.env` file
3. add following fields:
     PORT = `/// YOUR PORT NUMBER////`    
     MONGODB_URI = `/// YOUR DB URI////`

4. compile with `tsc` and run `app.js` or `ts-node app.ts`.

## Notes
### Endpoints
1. POST "/auth/register" (register user with email,username,password)
2. POST "/auth/login" (login user with username,password)
3. GET "/user/me" (protected user routes)

### ratelimiter
1. Max 5 request allowed from a IP for 60 seconds window. Can be modified in `app.ts`.
