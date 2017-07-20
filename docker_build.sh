#!/usr/bin/env bash

REPOSITORY="sphinx-api"
TAG=$1
AWS_CONTAINER_REGISTRY="539277938309.dkr.ecr.us-west-2.amazonaws.com"


aws ecr get-login --region us-west-2 --no-include-email > ecr_login.sh
chmod +x ecr_login.sh
./ecr_login.sh

docker build -t $REPOSITORY:$TAG .
docker tag $REPOSITORY:$TAG $AWS_CONTAINER_REGISTRY/$REPOSITORY:$TAG
docker push $AWS_CONTAINER_REGISTRY/$REPOSITORY:$TAG

if [ $? -ne 0 ]; then
    echo "rolling-update --rollback"
    kubectl rolling-update $REPOSITORY --rollback=true
fi

kubectl set image deployment/$REPOSITORY sphinx-api=$AWS_CONTAINER_REGISTRY/$REPOSITORY:$TAG
kubectl rollout status deployment/$REPOSITORY
kubectl delete pods -l name=$REPOSITORY
rm -f ecr_login.sh
