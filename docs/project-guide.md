# DevOps Task Manager API

## 1. Project Overview

The DevOps Task Manager is a Flask-based REST API built to practise core DevOps workflows. The project demonstrates source control, automated testing, Docker containerization, Kubernetes deployment, health checks, and load testing.

### Current features
- Flask API with home and health endpoints
- Automated tests using pytest
- Docker containerization
- GitHub Actions continuous integration (CI)
- Kubernetes Deployment and Service
- Readiness and liveness probes
- k6 load testing
- Resource monitoring with Kubernetes Metrics Server

## 2. Architecture

```text
Developer
   |
   v
Git / GitHub
   |
   v
GitHub Actions CI
   |
   +--> Run automated tests
   |
   v
Docker Image
   |
   v
Kubernetes on Minikube
   |
   +--> Task Manager Pod 1
   |
   +--> Task Manager Pod 2
   |
   v
Kubernetes Service
   |
   v
Flask API
   |
   +--> GET /
   |
   +--> GET /health

k6 --> Load Testing
kubectl top --> Resource Monitoring
```

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Python and Flask | Build the API |
| pytest | Test application endpoints |
| Git and GitHub | Version control and source hosting |
| GitHub Actions | Automated CI |
| Docker | Package the application |
| Kubernetes | Deploy and manage containers |
| Minikube | Run Kubernetes locally |
| kubectl | Manage Kubernetes resources |
| k6 | Generate load and measure performance |

## 4. API Endpoints

### Home endpoint

`GET /`

Returns a message confirming that the API is running.

### Health endpoint

`GET /health`

Returns the application's health status.

Expected response:

```json
{
  "status": "healthy"
}
```

The health endpoint is used by Kubernetes readiness and liveness probes.

## 5. Run the Application Locally

Navigate to the project directory:

```bash
cd ~/projects/devops-task-manager
```

Activate the Python virtual environment:

```bash
source .venv/bin/activate
```

Install dependencies if needed:

```bash
pip install -r requirements.txt
```

Run automated tests:

```bash
pytest -v
```

Start the Flask application:

```bash
python app/main.py
```

Test the API from another terminal:

```bash
curl http://127.0.0.1:5000/
curl http://127.0.0.1:5000/health
```

## 6. Docker

Build the Docker image:

```bash
docker build -t devops-task-manager:1.0 .
```

Run the container:

```bash
docker run --rm -p 5000:5000 devops-task-manager:1.0
```

Test the running container:

```bash
curl http://127.0.0.1:5000/health
```

## 7. Continuous Integration

The GitHub Actions workflow runs automated tests when configured repository events trigger it.

The CI workflow helps identify code problems before changes are accepted.

## 8. Kubernetes Deployment

The Kubernetes manifests are stored in the `k8s/` directory.

- `deployment.yaml` defines the Task Manager pods and health probes.
- `service.yaml` exposes the application through a Kubernetes Service.

Apply the manifests:

```bash
kubectl apply -f k8s/
```

Check the deployment:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

### Readiness probe

The readiness probe checks `GET /health` on port `5000`. A pod that fails readiness checks is removed from the Service's ready endpoints until it becomes ready again.

### Liveness probe

The liveness probe checks `GET /health` on port `5000`. Repeated probe failures can cause Kubernetes to restart the container.

### Access the API

Forward the Kubernetes Service port:

```bash
kubectl port-forward service/task-manager-service 8080:5000
```

Keep that terminal running. From another terminal, test:

```bash
curl http://127.0.0.1:8080/
curl http://127.0.0.1:8080/health
```

## 9. Load Testing

The k6 script is located at:

`tests/load/load-test.js`

The test checks HTTP status codes and verifies that the API returns its expected health response.

Run the test using:

```bash
k6 run tests/load/load-test.js
```

The script must target the currently available local endpoint. If it uses a temporary Minikube service-tunnel URL, update the URL when that tunnel's port changes.

Detailed results for the recorded 900-VU test are available in `docs/load-test-results.md`.

Load-test results depend on the local machine, Minikube, networking, and test configuration. They do not establish production capacity.

## 10. Monitoring

Check pod status:

```bash
kubectl get pods
```

View CPU and memory usage:

```bash
kubectl top pods
kubectl top nodes
```

Inspect the deployment and its probes:

```bash
kubectl describe deployment task-manager
```

## 11. Repository Structure

```text
devops-task-manager/
├── app/
│   └── main.py
├── tests/
│   ├── test_main.py
│   └── load/
│       └── load-test.js
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── docs/
│   ├── load-test-results.md
│   └── project-guide.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── Dockerfile
├── requirements.txt
├── .dockerignore
├── .gitignore
└── README.md
```

## 12. Learning Outcomes

This project demonstrates hands-on practice with:

- Version control and GitHub collaboration workflows
- Automated application testing
- Container image creation and execution
- Kubernetes deployments, Services, and replicas
- Application health checks
- Load testing and performance analysis
- Basic resource monitoring

## 13. Future Improvements

Potential next steps include:

- Automated Docker image publishing to GitHub Container Registry
- A more complete CI/CD pipeline
- Kubernetes resource requests and limits
- Infrastructure deployment on AWS
- Additional application features and tests

These are planned improvements, not features claimed as completed.
