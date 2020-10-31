rm -rf ../database/
docker-compose up -d
docker-compose exec -T database mongorestore ../dump/

