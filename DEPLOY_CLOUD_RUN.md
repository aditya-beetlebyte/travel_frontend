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

## 3. Build the image

From **`travel_frontend`** (this directory):

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.run.app
```

Optional: pass `_NEXT_PUBLIC_API_URL` to bake the URL into the image at build time. If you omit it, the build still succeeds; the **Cloud Run service env** (step 5) is required at runtime.

Use your real backend base URL **with no trailing slash**.

The built image is tagged as:

`asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/travel/frontend:latest`

## 4. Deploy to Cloud Run

```bash
gcloud run deploy travel-frontend \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/travel/frontend:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.run.app \
  --min-instances 0
```

- Set `--min-instances 1` if you want to avoid cold starts (small extra cost).
- **Container port must be 8080** (see Dockerfile `ENV PORT=8080`).

## 5. API URL (`NEXT_PUBLIC_API_URL`)

Set in **Cloud Run → Variables & secrets** (runtime):

`NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.run.app`

(no trailing slash)

The frontend reads the backend from **`NEXT_PUBLIC_API_URL`** (`public/runtime-config.js` is rewritten when the container starts).

**Cloud Build trigger (source deploy):** you do not need a build-time URL. You **must** set `NEXT_PUBLIC_API_URL` on the Cloud Run service under **Variables & secrets**, then deploy a new revision.

If the container exits immediately, check logs for `[entrypoint] ERROR: set NEXT_PUBLIC_API_URL on the Cloud Run service`.

**Local dev:** set the same value in `travel_frontend/.env`, then `npm run dev`.

## Optional: build on your computer

```bash
cd travel_frontend

docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.run.app \
  -t travel-frontend .

docker run -p 8080:8080 -e NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.run.app travel-frontend
```

Push the tag to Artifact Registry and deploy with `gcloud run deploy --image ...` as above.

## CORS

Your **backend** must allow the Cloud Run frontend origin (the `https://....run.app` URL) if the browser calls the API directly.

## Troubleshooting

**`npm ci` fails in Docker / Cloud Build** with “package.json and package-lock.json are not in sync”: commit the latest `package-lock.json` from the repo (run `npm install` locally after any `package.json` change, then commit both files). Never edit `package.json` without updating the lockfile.
