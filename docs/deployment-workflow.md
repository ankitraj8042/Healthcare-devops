# Healthcare DevOps — Deployment Workflow

## Overview

This document describes the complete CI/CD pipeline that automates the deployment of the Healthcare application from a developer's code push to a live update on AWS EC2.

---

## Architecture Diagram

```
┌──────────────┐     Webhook     ┌──────────────┐     Push      ┌──────────────┐
│              │ ──────────────► │              │ ────────────► │              │
│    GitHub    │                 │   Jenkins    │               │  Docker Hub  │
│              │ ◄────── Pull    │              │               │              │
└──────────────┘                 └──────┬───────┘               └──────┬───────┘
                                       │                               │
                                       │ Ansible Playbook              │ Pull Images
                                       ▼                               │
                                ┌──────────────┐                       │
                                │              │ ◄─────────────────────┘
                                │   AWS EC2    │
                                │   (Ubuntu)   │
                                │              │
                                └──────────────┘
                                       │
                                       ▼
                                 🌐 Live Website
                            http://<EC2-IP>:3000
```

---

## Pipeline Stages (Step-by-Step)

### 1️⃣ Developer Pushes Code to GitHub

- Developer commits and pushes code to the `main` branch.
- GitHub repository: `https://github.com/ankitraj8042/Healthcare-devops.git`

### 2️⃣ GitHub Webhook Triggers Jenkins

- A webhook configured on GitHub sends a POST request to the Jenkins server.
- Jenkins is listening at: `http://<Jenkins-IP>:8080/github-webhook/`
- Jenkins receives the webhook and starts the pipeline.

### 3️⃣ Jenkins Pulls Latest Code (Stage 1: Checkout)

- Jenkins clones the repository from the `main` branch.
- All source code (frontend, backend, Dockerfiles, ansible configs) is available to the build.

### 4️⃣ Jenkins Builds Frontend Docker Image (Stage 2)

- Builds the React (Vite) frontend from `./frontend/Dockerfile`.
- Tags the image as:
  - `ankit86/healthcare-frontend:<build-number>`
  - `ankit86/healthcare-frontend:latest`

### 5️⃣ Jenkins Builds Backend Docker Image (Stage 3)

- Builds the Node.js + Express backend from `./backend/Dockerfile`.
- Tags the image as:
  - `ankit86/healthcare-backend:<build-number>`
  - `ankit86/healthcare-backend:latest`

### 6️⃣ Jenkins Pushes Frontend Image to Docker Hub (Stage 4)

- Authenticates with Docker Hub using Jenkins stored credentials (`dockerhub-creds`).
- Pushes both tagged and latest frontend images.

### 7️⃣ Jenkins Pushes Backend Image to Docker Hub (Stage 5)

- Pushes both tagged and latest backend images.
- Docker Hub repositories:
  - `ankit86/healthcare-frontend`
  - `ankit86/healthcare-backend`

### 8️⃣ Jenkins Runs Ansible Playbook (Stage 6)

- Ansible connects to the AWS EC2 instance via SSH.
- Uses the SSH key stored in Jenkins credentials (`ec2-ssh-key`).
- Runs `ansible/deploy.yml` against the inventory.

### 9️⃣ Ansible Deploys to EC2

The Ansible playbook performs the following on the EC2 server:

1. **Ensures Docker is installed** and running on the server.
2. **Copies** the `docker-compose.yml` file to the server.
3. **Pulls** the latest frontend and backend images from Docker Hub.
4. **Stops** old containers (`docker compose down`).
5. **Starts** updated containers (`docker compose up -d`).
6. **Verifies** all containers are running correctly.

### 🔟 Website Updated Live

- The application is now running with the latest code.
- **Frontend**: `http://<EC2-IP>:3000`
- **Backend API**: `http://<EC2-IP>:5000`

---

## Files Overview

| File | Purpose |
|------|---------|
| `Jenkinsfile` | Defines the 6-stage CI/CD pipeline |
| `docker-compose.yml` | Defines the multi-container application (uses Docker Hub images) |
| `ansible/inventory.ini` | Lists the target EC2 server for Ansible |
| `ansible/deploy.yml` | Ansible playbook that deploys to EC2 |
| `ansible.cfg` | Global Ansible configuration |
| `frontend/Dockerfile` | Builds the React frontend image |
| `backend/Dockerfile` | Builds the Node.js backend image |

---

## Directory Structure

```
Healthcare-devops/
├── Jenkinsfile                  # CI/CD pipeline definition
├── docker-compose.yml           # Docker Compose (uses Docker Hub images)
├── ansible.cfg                  # Ansible global config
├── ansible/
│   ├── inventory.ini            # Target EC2 server
│   └── deploy.yml               # Deployment playbook
├── docs/
│   └── deployment-workflow.md   # This document
├── backend/
│   ├── Dockerfile               # Backend Docker image
│   ├── package.json
│   └── src/                     # Express API source code
└── frontend/
    ├── Dockerfile               # Frontend Docker image
    ├── package.json
    └── src/                     # React source code
```

---

## Jenkins Credentials Required

The following credentials must be configured in **Jenkins → Manage Jenkins → Credentials**:

### 1. Docker Hub Credentials (`dockerhub-creds`)

| Field | Value |
|-------|-------|
| **Type** | Username with password |
| **ID** | `dockerhub-creds` |
| **Username** | `ankit86` |
| **Password** | Docker Hub Access Token |
| **Description** | Docker Hub login for pushing images |

### 2. EC2 SSH Key (`ec2-ssh-key`)

| Field | Value |
|-------|-------|
| **Type** | SSH Username with private key |
| **ID** | `ec2-ssh-key` |
| **Username** | `ubuntu` |
| **Private Key** | Paste contents of `healthcare-key.pem` |
| **Description** | SSH key to access AWS EC2 server |

---

## GitHub Webhook Setup

1. Go to your GitHub repo → **Settings** → **Webhooks** → **Add webhook**.
2. Configure:

| Field | Value |
|-------|-------|
| **Payload URL** | `http://<Jenkins-IP>:8080/github-webhook/` |
| **Content type** | `application/json` |
| **Secret** | (leave blank or set a secret) |
| **Events** | Just the push event |
| **Active** | ✅ Checked |

---

## Environment Variables

### Jenkins Pipeline

| Variable | Description |
|----------|-------------|
| `DOCKERHUB_USER` | Docker Hub username (`ankit86`) |
| `FRONTEND_IMAGE` | Full frontend image name |
| `BACKEND_IMAGE` | Full backend image name |
| `IMAGE_TAG` | Build number used as image tag |

### Docker Compose (EC2)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string (set in container env) |

---

## Troubleshooting

### Jenkins pipeline fails at "Push Images"
- Verify `dockerhub-creds` credential is configured correctly.
- Ensure the Docker Hub access token has read/write permissions.

### Ansible fails to connect to EC2
- Check that the EC2 security group allows SSH (port 22) from Jenkins IP.
- Verify the `ec2-ssh-key` credential has the correct PEM key.
- Confirm the EC2 instance is running and the IP is current.

### Containers not starting on EC2
- SSH into EC2 and check logs: `docker compose logs`
- Verify Docker is installed: `docker --version`
- Check disk space: `df -h`

### Website not accessible
- Ensure EC2 security group allows inbound traffic on ports 3000 and 5000.
- Check that containers are running: `docker ps`

---

## Security Notes

- ⚠️ **Never** commit Docker Hub tokens or SSH keys to GitHub.
- ✅ Always use Jenkins Credentials Manager for secrets.
- ✅ Use Docker Hub access tokens instead of passwords.
- ✅ Restrict EC2 security group rules to necessary IPs/ports only.
