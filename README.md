# DevOps Task Manager

A containerized Task Management web application built with Flask, HTML, CSS, and JavaScript, supported by practical DevOps workflows including automated testing, Docker containerization, Kubernetes orchestration, health monitoring, and load testing.

## Project Overview

DevOps Task Manager is a web-based task management application designed to demonstrate the complete journey from application development to deployment and infrastructure management.

The application currently provides an interactive dashboard where users can create, organize, complete, and delete tasks.

The frontend uses browser `localStorage` to persist tasks. Backend REST API and PostgreSQL integration are planned for upcoming development stages.

Alongside application development, this project demonstrates how DevOps tools and practices can automate testing, package applications, deploy containers, monitor resources, and evaluate performance.

## Application Features

- Interactive TaskFlow dashboard.
- Create and delete tasks.
- Mark tasks as completed or pending.
- Organize tasks by category.
- Assign optional due dates.
- Dashboard statistics for total, completed, and pending tasks.
- Browser localStorage for task persistence.
- Responsive frontend design.

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
         Pod 1         Pod 2
           |             |
           +------+------+
                  |
                  v
        Kubernetes Service
                  |
                  v
             Flask App
                  |
           +------+------+
           |             |
           v             v
        HTML/CSS       JavaScript
        Frontend       Task Logic
```

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Application development |
| Flask | Backend web framework |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Task interactions and localStorage |
| Pytest | Automated testing |
| Git & GitHub | Version control |
| GitHub Actions | Continuous Integration |
| Docker | Application containerization |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes cluster |
| kubectl | Kubernetes management |
| k6 | Load testing |
| Ubuntu WSL2 | Development environment |

## Application Routes

| Route | Description |
|---|---|
| `/` | Serves the TaskFlow dashboard |
| `/health` | Returns application health status |

Example health response:

```json
{
  "status": "healthy"
}
```

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

Open the application in your browser:

```text
http://localhost:5000
```

### 4. Run Automated Tests

```bash
python -m pytest -v
```

The tests verify that the dashboard loads successfully and the health endpoint returns the expected response.

## Docker

Build the Docker image:

```bash
docker build -t devops-task-manager:1.0 .
```

Run the container:

```bash
docker run -d -p 5000:5000 devops-task-manager:1.0
```

Test the health endpoint:

```bash
curl http://127.0.0.1:5000/health
```

## Continuous Integration

The project uses GitHub Actions to automate application testing.

The CI workflow:

1. Checks out the repository.
2. Sets up Python 3.10.
3. Installs project dependencies.
4. Runs automated tests using Pytest.

Workflow configuration:

```text
.github/workflows/ci.yml
```

CI runs automatically when changes are pushed to the `main` branch or when a pull request targets `main`.

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

These commands help monitor CPU and memory consumption within the Kubernetes cluster.

## Load Testing

The project uses k6 to simulate multiple virtual users and evaluate application performance.

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
│   ├── __init__.py
│   ├── main.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── app.js
│   └── templates/
│       └── index.html
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

Through this project, I have gained practical experience with:

- Building and testing a Python web application.
- Developing an interactive frontend using HTML, CSS, and JavaScript.
- Working with Flask to serve frontend pages and backend routes.
- Managing source code using Git and GitHub.
- Automating tests with GitHub Actions.
- Building and managing Docker images.
- Deploying applications using Kubernetes.
- Understanding deployments, replicas, and services.
- Configuring Kubernetes health probes.
- Monitoring resource utilization.
- Performing load testing and interpreting performance metrics.

## Future Improvements

- Develop a complete Flask REST API.
- Integrate PostgreSQL as the application database.
- Replace browser localStorage with persistent backend storage.
- Implement individual task detail pages.
- Add file attachments to tasks.
- Implement user authentication and authorization.
- Automate Docker image publishing to GitHub Container Registry (GHCR).
- Implement Continuous Deployment (CD).
- Deploy the application using AWS.
- Introduce Infrastructure as Code using Terraform.

## Author

**Aynan Muhammad**

GitHub: [Aynan-Snippet](https://github.com/Aynan-Snippet)

Project Repository: [DevOps Task Manager](https://github.com/Aynan-Snippet/devops-task-manager)

