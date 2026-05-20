# Deploy Next.js frontend to Google Cloud Run

This app uses **`output: 'standalone'`** and the **`Dockerfile`** in this folder.

## What you need

- Google Cloud project with billing enabled
- `gcloud` CLI installed and `gcloud auth login`
- Your **backend** URL (same value as `NEXT_PUBLIC_API_URL` in `.env`)

## 1. Enable APIs

```bash
gcloud config set project YOUR_PROJECT_ID

gcloud services enable run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com
```

## 2. Artifact Registry (Docker repo)

One-time, adjust region if needed:

```bash
gcloud artifacts repositories create travel \
  --repository-format=docker \
  --location=asia-south1 \
  --description="Travel app images"
```

## 3. Build the image (bakes `NEXT_PUBLIC_API_URL`)

From **`travel_frontend`** (this directory):

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.run.app
```

Use your real backend base URL **with no trailing slash**, if that matches your frontend code.

The built image is tagged as:

`asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/travel/frontend:latest`

## 4. Deploy to Cloud Run

```bash
gcloud run deploy travel-frontend \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/travel/frontend:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 3000 \
  --min-instances 0
```

- Set `--min-instances 1` if you want to avoid cold starts (small extra cost).
- Cloud Run sets `PORT`; the container already listens on `3000`.

## 5. API URL (`NEXT_PUBLIC_API_URL`)

Set in **Cloud Run → Variables & secrets** (runtime):

`NEXT_PUBLIC_API_URL=https://travel-backend-535611153717.europe-west1.run.app`

(no trailing slash)

The browser calls **`/api/...` on your frontend domain**; Next.js proxies to that backend URL on the server. You do **not** need to rebuild when only this URL changes — save a new revision.

**Container port:** must be **8080** in Cloud Run (matches `ENV PORT=8080` in Dockerfile).

If deploy fails with “failed to start and listen on PORT=8080”, check Cloud Run logs for the revision; ensure the latest Dockerfile with `docker-entrypoint.sh` is deployed.

**Local dev:** same `.env` value; `npm run dev` proxies `/api/*` to the backend automatically.

## Optional: build on your computer

```bash
cd travel_frontend

docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.run.app \
  -t travel-frontend .

docker run -p 3000:3000 travel-frontend
```

Push the tag to Artifact Registry and deploy with `gcloud run deploy --image ...` as above.

## CORS

Your **backend** must allow the Cloud Run frontend origin (the `https://....run.app` URL) if the browser calls the API directly.

## Troubleshooting

**`npm ci` fails in Docker / Cloud Build** with “package.json and package-lock.json are not in sync”: commit the latest `package-lock.json` from the repo (run `npm install` locally after any `package.json` change, then commit both files). Never edit `package.json` without updating the lockfile.
