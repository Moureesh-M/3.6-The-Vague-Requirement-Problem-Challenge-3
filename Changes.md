# Challenge Findings

## 1. Current Behavior
The original Productivity Score was split across multiple sources. Task creation and task completion both changed a stored score value, while the score endpoint also added a separate momentum bonus at read time. The UI only showed a single number and a hardcoded status message, so users could not tell what actually affected the score.

## 2. Issues Found
- The score was not derived from one clear formula.
- Creation, completion, and retrieval all influenced the score in different ways.
- Deleting a task did not reverse any prior score changes.
- The app mentioned important tasks, but there was no `important` field in the task model.
- The frontend copied the score as if it were an AI-driven metric, which made the system feel opaque.
- The client API was hardcoded to `http://localhost:5000`, which would fail after deployment.

## 3. Improvements Made
- Replaced the mixed stored-plus-dynamic score with a single backend formula.
- Added an `important` flag to tasks.
- Made important tasks count double in the score calculation.
- Removed score mutations from task create, update, and delete flows.
- Updated the score widget to explain the formula and show breakdown details.
- Updated the task form so users can mark a task as important when creating it.
- Added an important badge to task cards so important work is visible in the list.
- Switched the frontend API base URL to `VITE_API_URL` with a localhost fallback.

## 4. How This Improves the System
The score is now reproducible from task data alone, which makes it easier to understand and easier to debug. Important tasks have an explicit meaning in the product, and the UI now explains that meaning instead of implying hidden logic. The result is a cleaner productivity model that is consistent across refreshes and easier to deploy in different environments.

## 5. Deployment Links
The app is configured for deployment using branch `feature` with platform default domains.

- Frontend (Netlify): pending publish, default domain will be `https://<site-name>.netlify.app`
- Backend (Render): pending publish, default domain will be `https://tasknest123-api.onrender.com`
- Database (Supabase): configured via `DATABASE_URL`
- Backend env vars: `DATABASE_URL`, `CORS_ORIGIN`
- Frontend env var: `VITE_API_URL`

## 6. Summary of Files Updated
- `server/controllers/scoreController.js`
- `server/controllers/taskController.js`
- `server/utils/scoreHelper.js`
- `server/prisma/schema.prisma`
- `server/prisma/seed.js`
- `client/src/services/api.js`
- `client/src/components/ScoreWidget.jsx`
- `client/src/components/TaskForm.jsx`
- `client/src/components/TaskCard.jsx`
