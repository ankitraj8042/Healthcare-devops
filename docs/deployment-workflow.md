# Healthcare DevOps — Deployment Workflow Documentation

## Architecture Overview

```
Developer Push → GitHub → Webhook → Jenkins (Local Docker)
                                       │
                   ┌───────────────────┘
                   ▼
         ┌─────────────────┐
         │   JENKINS CI/CD  │
         │                   │
         │ Stage 1: Checkout │
         │ Stage 2: Build FE │
         │ Stage 3: Build BE │
         │ Stage 4: Push FE  │
         │ Stage 5: Push BE  │
         │ Stage 6: Ansible  │
         │ Stage 7: Verify   │
         └────────┬──────────┘
                  │
                  ▼ Ansible Playbook (SSH)
         ┌──────────────────────────────────────────────┐
         │              AWS EC2 (Ubuntu)                 │
         │                                               │
         │  ┌─────────────┐  ┌─────────────┐            │
         │  │  Frontend   │  │   Backend   │            │
         │  │  :3000      │  │   :5000     │            │
         │  └─────────────┘  └─────────────┘            │
         │  ┌─────────────┐  ┌─────────────┐            │
         │  │   MongoDB   │  │  Prometheus │            │
         │  │  :27017     │  │   :9090     │            │
         │  └─────────────┘  └─────────────┘            │
         │  ┌─────────────┐  ┌─────────────┐            │
         │  │   Grafana   │  │  cAdvisor   │            │
         │  │   :3001     │  │  (internal) │            │
         │  └─────────────┘  └─────────────┘            │
         │  ┌──────────────┐                             │
         │  │Node Exporter │                             │
         │  │  (internal)  │                             │
         │  └──────────────┘                             │
         └──────────────────────────────────────────────┘
```

## Pipeline Stages

| Stage | Name             | Description                                       |
|-------|------------------|---------------------------------------------------|
| 1     | Checkout Code    | Clone `main` branch from GitHub                   |
| 2     | Build Frontend   | Build Docker image `ankit86/healthcare-frontend`   |
| 3     | Build Backend    | Build Docker image `ankit86/healthcare-backend`    |
| 4     | Push Frontend    | Push `build-N` + `latest` tags to Docker Hub      |
| 5     | Push Backend     | Push `build-N` + `latest` tags to Docker Hub      |
| 6     | Ansible Deploy   | Run Ansible playbook to deploy to EC2             |
| 7     | Verify Deploy    | SSH health checks for all services                |

## Image Versioning

Every build creates **two tags**:
- `ankit86/healthcare-frontend:build-14` (traceable)
- `ankit86/healthcare-frontend:latest` (for compose)

### Rollback Command
```bash
# Roll back to a specific build
docker pull ankit86/healthcare-frontend:build-12
docker pull ankit86/healthcare-backend:build-12
docker tag ankit86/healthcare-frontend:build-12 ankit86/healthcare-frontend:latest
docker tag ankit86/healthcare-backend:build-12 ankit86/healthcare-backend:latest
docker compose up -d
```

## Ansible Deployment

### What Ansible Does (10 Steps):
1. **Docker Hub Login** — Authenticate for image pulls
2. **Pull Images** — Download latest frontend & backend
3. **Copy Configs** — docker-compose.yml + monitoring configs to EC2
4. **Stop Containers** — Graceful shutdown of all running containers
5. **Start Containers** — `docker compose up -d` (app + monitoring)
6. **Wait** — 15 seconds for services to stabilize
7. **Health Checks** — Verify frontend, backend, Grafana, Prometheus
8. **Image Cleanup** — `docker image prune -f` to free disk space
9. **Docker Logout** — Secure credential cleanup
10. **Summary** — Display deployment report with URLs

### Why Ansible Instead of SSH Scripts?
- **Idempotent** — Safe to run multiple times
- **Declarative** — Describes desired state, not steps
- **Modular** — Each task is independent and testable
- **Error Handling** — Built-in retries and failure management
- **Industry Standard** — Used by DevOps teams worldwide

## Monitoring Stack

### Components

| Service        | Port   | Access   | Purpose                       |
|----------------|--------|----------|-------------------------------|
| Grafana        | 3001   | Public   | Dashboard UI for all metrics  |
| Prometheus     | 9090   | Public   | Metrics collection engine     |
| Node Exporter  | 9100   | Internal | Host CPU/Memory/Disk metrics  |
| cAdvisor       | 8080   | Internal | Container resource metrics    |

### Grafana Dashboard
- **URL:** `http://<EC2-IP>:3001`
- **Login:** admin / admin
- **Auto-configured:** Dashboard loads automatically on first boot
- **Panels:**
  - Host CPU Usage (Gauge)
  - Host Memory Usage (Gauge)
  - Running Container Count (Stat)
  - Host Disk Usage (Gauge)
  - Container CPU Usage (Time Series)
  - Container Memory Usage (Time Series)
  - Container Network RX (Time Series)
  - Container Network TX (Time Series)

### Prometheus Targets
- `prometheus:9090` — Self-monitoring
- `node-exporter:9100` — Host metrics
- `cadvisor:8080` — Container metrics

## Tools Used

| Tool           | Purpose                          |
|----------------|----------------------------------|
| GitHub         | Source code repository           |
| Jenkins        | CI/CD pipeline orchestration     |
| Docker         | Containerization                 |
| Docker Hub     | Image registry                   |
| Docker Compose | Multi-container orchestration    |
| Ansible        | Automated deployment             |
| Prometheus     | Metrics collection               |
| Grafana        | Monitoring dashboards            |
| Node Exporter  | Host system metrics              |
| cAdvisor       | Container metrics                |
| AWS EC2        | Cloud hosting                    |
| ngrok          | Webhook tunnel (local Jenkins)   |

## Viva Q&A

**Q: What happens when you push code?**
A: GitHub webhook triggers Jenkins → builds Docker images → pushes to Docker Hub → runs Ansible playbook → Ansible deploys to EC2 → health checks verify everything → application is live.

**Q: Why use Ansible instead of shell scripts?**
A: Ansible is idempotent (safe to re-run), declarative, has built-in error handling, and is an industry-standard tool for infrastructure automation.

**Q: How does monitoring work?**
A: Node Exporter collects host metrics, cAdvisor collects container metrics, Prometheus scrapes both every 15 seconds, and Grafana visualizes everything in a pre-built dashboard.

**Q: How would you rollback a bad deployment?**
A: Every build is tagged with `build-N`. Run `docker pull <image>:build-<previous_number>`, tag it as `latest`, and run `docker compose up -d`.

**Q: Why are Node Exporter and cAdvisor internal-only?**
A: They expose sensitive server metrics. Prometheus scrapes them internally via Docker networking. Only Grafana (the dashboard) is exposed publicly.

**Q: What health checks are performed?**
A: Ansible verifies HTTP 200 from Frontend (port 3000), Backend (port 5000), Grafana (port 3001), and Prometheus (port 9090) with retries before marking deployment as successful.
