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

## 5. When the API URL changes

`NEXT_PUBLIC_*` values are compiled into the bundle at **image build** time.

Change `NEXT_PUBLIC_API_URL` → run **step 3** again → **step 4** again (or deploy the new `latest`).

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
