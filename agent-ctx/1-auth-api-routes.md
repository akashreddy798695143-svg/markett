# Task 1 - Auth API Routes Agent

## Task: Create Backend API Routes for Authentication

## Work Summary

Created/rewrote 4 authentication API route files using `crypto.scryptSync` for password hashing as specified:

### Files Created/Modified

1. **`/src/app/api/auth/register/route.ts`** (rewritten)
   - POST handler accepting `{ name, email, phone, password }`
   - Validates all required fields, email format, and checks for duplicate email
   - Hashes password using `crypto.scryptSync` with random salt: `salt:hash` format
   - Creates user via Prisma with `provider: 'email'`
   - Returns `{ user: { id, name, email, phone, role, walletBalance, rewardPoints } }`
   - HTTP status codes: 200 (success), 400 (validation/duplicate), 500 (server error)

2. **`/src/app/api/auth/login/route.ts`** (rewritten)
   - POST handler accepting `{ email, password }`
   - Finds user by email, returns 401 if not found
   - Verifies password by splitting stored `salt:hash` and comparing with `scryptSync`
   - Returns 401 with `{ error: 'Invalid email or password' }` on failure
   - Returns `{ user: { id, name, email, phone, role, walletBalance, rewardPoints } }` on success

3. **`/src/app/api/auth/google/route.ts`** (new)
   - POST handler accepting `{ email, name }`
   - Finds existing user by email or creates new one with `provider: 'google'`
   - New Google users get `emailVerified: true`
   - Returns `{ user: { id, name, email, phone, role, walletBalance, rewardPoints } }`

4. **`/src/app/api/auth/forgot-password/route.ts`** (new)
   - POST handler accepting `{ email }`
   - Finds user by email, returns 404 if not found
   - Generates 6-character OTP using `randomBytes`
   - Stores OTP in `OTPVerification` table with 10-minute expiry
   - Returns `{ message: 'OTP sent to your email', otp: theOtp }` for demo

### Verification
- Prisma schema synced (`bun run db:push`)
- ESLint passed with zero errors
- Dev server running normally
