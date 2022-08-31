# latex2pdf

Docker Image to convert LaTeX to PDF

You can find this image in Docker Hub:
https://hub.docker.com/repository/docker/lennetech/latex2pdf

Integration in `docker-compose.yml`:
```
  latex2pdf:
    image: lennetech/latex2pdf
    ports:
      - 80:80
    volumes:
      - /PATH_TO_ASSETS_DIR:/assets
```
and start with `docker-compse up`

Usage via POST request with LaTeX in body:
```
curl --data-binary "@/path/to/latex/file" --output ./latex.pdf http://localhost
```

Assets (like images) can be integrated into the LaTeX document via /assets/PATH_TO_ASSET 
(see values in docker-compose.yml).

## Development & Deployment

### Build
```
docker build -t latex2pdf .
```

### Run

Run with name
```
docker run -dp 80:80 latex2pdf
```

### Stop
```
docker stop $(docker ps -a -q --filter ancestor=latex2pdf --format="{{.ID}}")
```

### Stop and remove
```
docker rm $(docker stop $(docker ps -a -q --filter ancestor=latex2pdf --format="{{.ID}}"))
```

### Build and push to Docker Hub

Install docker:
[https://docs.docker.com/get-started/#download-and-install-docker-desktop](https://docs.docker.com/get-started/#download-and-install-docker-desktop)

```
docker login --username=USERNAME
    ENTER ACCESS_TOKEN
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 --push -t lennetech/latex2pdf:latest .
```
(see [How to build x86 (and others!) Docker images on an M1 Mac](https://jaimyn.com.au/how-to-build-multi-architecture-docker-images-on-an-m1-mac/))

## Sources

### Documentation
- [Orientation and setup](https://docs.docker.com/get-started/)
- [Build and run your image](https://docs.docker.com/get-started/part2/)
- [Share images on Docker Hub](https://docs.docker.com/get-started/part3/)

### Reference
- [Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [docker_login](https://docs.docker.com/engine/reference/commandline/login/)
- [docker build](https://docs.docker.com/engine/reference/commandline/build/)
- [docker push](https://docs.docker.com/engine/reference/commandline/push/)
