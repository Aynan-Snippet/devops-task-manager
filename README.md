# DevOps Task Manager

A containerized Flask REST API deployed on Kubernetes, demonstrating practical DevOps workflows including CI automation, containerization, orchestration, health monitoring, and load testing.

## Project Overview

The DevOps Task Manager is a simple Flask-based API built to demonstrate how DevOps tools and practices work together in a real-world application workflow.

The project covers the journey from application development to containerization, automated testing, Kubernetes deployment, and performance testing.

## Architecture

```text
             Developer
                 |
                 v
              GitHub
                 |
                 v
          GitHub Actions
             (CI Tests)
                 |
                 v
           Docker Image
                 |
                 v
             Minikube
            Kubernetes
                 |
          +------+------+
          |             |
          v             v
       Pod 1          Pod 2
          |             |
          +------+------+
                 |
                 v
          Kubernetes Service
                 |
                 v
             Flask API
```

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Application development |
| Flask | REST API framework |
| Pytest | Automated testing |
| Git & GitHub | Version control |
| GitHub Actions | Continuous Integration |
| Docker | Application containerization |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes cluster |
| kubectl | Kubernetes management |
| k6 | Load testing |
| Ubuntu WSL2 | Development environment |

## Application Endpoints

| Endpoint | Description |
|---|---|
| `/` | Returns API welcome message |
| `/health` | Returns application health status |

Example health response:

```json
{
  "status": "healthy"
}
```

## Project Features

- Flask REST API with two endpoints.
- Automated unit testing using Pytest.
- Docker image creation and containerization.
- GitHub Actions workflow for automated testing.
- Kubernetes Deployment with two replicas.
- Kubernetes NodePort Service.
- Readiness and liveness probes.
- Pod and node resource monitoring using `kubectl top`.
- Load testing using k6.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aynan-Snippet/devops-task-manager.git
cd devops-task-manager
```

### 2. Set Up Python Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Run the Application

```bash
python app/main.py
```

The API runs on:

```text
http://127.0.0.1:5000
```

### 4. Run Unit Tests

```bash
pytest -v
```

## Docker

Build the Docker image:

```bash
docker build -t devops-task-manager:1.0 .
```

Run the container:

```bash
docker run -d -p 5000:5000 devops-task-manager:1.0
```

Test the application:

```bash
curl http://127.0.0.1:5000/health
```

## Kubernetes Deployment

This project uses Minikube to run a local Kubernetes cluster.

Apply the deployment:

```bash
kubectl apply -f k8s/deployment.yaml
```

Apply the service:

```bash
kubectl apply -f k8s/service.yaml
```

Check running pods:

```bash
kubectl get pods
```

Check the service:

```bash
kubectl get services
```

Check deployment status:

```bash
kubectl get deployments
```

### Health Probes

The Kubernetes deployment includes:

- **Readiness Probe:** Checks whether the application is ready to receive traffic.
- **Liveness Probe:** Checks whether the application is still running correctly.

Both probes use the `/health` endpoint.

## Monitoring

Monitor pod resource usage:

```bash
kubectl top pods
```

Monitor node resource usage:

```bash
kubectl top nodes
```

## Load Testing

The project uses k6 to simulate multiple virtual users and evaluate API performance.

Load test script:

```text
tests/load/load-test.js
```

Run the test:

```bash
k6 run tests/load/load-test.js
```

### Load Test Results

A recorded test using 900 virtual users produced the following results:

| Metric | Result |
|---|---:|
| Virtual Users | 900 |
| Total HTTP Requests | 6,223 |
| Successful Checks | 12,446 |
| Failed Checks | 0 |
| HTTP Request Failure Rate | 0% |
| Average Response Time | 1.23 seconds |
| 95th Percentile | 3.60 seconds |
| Maximum Response Time | 4.32 seconds |

**Note:** These are results from a local Minikube test environment, not a production capacity benchmark.

Detailed results: [Load Test Documentation](docs/load-test-results.md)

## Repository Structure

```text
devops-task-manager/
│
├── app/
│   └── main.py
│
├── tests/
│   ├── test_main.py
│   └── load/
│       └── load-test.js
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
├── docs/
│   ├── project-guide.md
│   └── load-test-results.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── .dockerignore
├── .gitignore
├── requirements.txt
└── README.md
```

## Learning Outcomes

Through this project, I gained practical experience with:

- Building and testing a Python application.
- Writing and managing Docker images.
- Automating tests with GitHub Actions.
- Deploying applications using Kubernetes.
- Understanding deployments, replicas, and services.
- Configuring Kubernetes health probes.
- Monitoring resource utilization.
- Performing load testing and interpreting performance metrics.

## Future Improvements

- Automated Docker image publishing to GitHub Container Registry (GHCR).
- Continuous Deployment (CD).
- Cloud deployment using AWS.
- Infrastructure as Code using Terraform.

## Author

**Aynan Muhammad**

GitHub: [Aynan-Snippet](https://github.com/Aynan-Snippet)

Project Repository: [DevOps Task Manager](https://github.com/Aynan-Snippet/devops-task-manager)
