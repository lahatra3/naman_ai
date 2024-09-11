# naman_ai

```bash
$ ~ cd local
```
### Build image and run container
```bash
docker-compose up --build -d
```

### Pull model
```bash
$ ~ docker exec -it ollama bash /root/.ollama/get_model.sh
```

### Run
```bash
$ ~  curl --request POST \
  --url http://localhost:3131/ \
  --header 'Content-Type: application/json' \
  --data '{
	"prompt": "hello hello"
}'
```
