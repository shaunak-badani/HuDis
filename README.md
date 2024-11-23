# Hudis

### Setting up the development server

- Setup frontend:
    ```bash
    cd frontend
    npm start
    ```
- In another tab, start the backend:
    ```bash
    cd backend
    flask -e .devenv run
    ```

### Deploying to a server

```bash
sudo docker-compose up -d
```