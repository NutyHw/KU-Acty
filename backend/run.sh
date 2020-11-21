docker-compose up -d --build
docker-compose exec -T database mongorestore ../dump/

