# cloud-run-node


## build and deploy
````
PROJECT_ID=
gcloud builds submit --tag gcr.io/$PROJECT_ID/cloud-run-node
gcloud run deploy --image gcr.io/$PROJECT_ID/cloud-run-node --platform managed
````

## api
````
TOKEN=$(gcloud auth print-identity-token)
ENDPOINT=http://localhost:8080

curl -H "Authorization: Bearer $TOKEN" $ENDPOINT/gcs
````
