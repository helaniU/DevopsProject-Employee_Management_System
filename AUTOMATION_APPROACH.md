# Part 2: Automation Approach - DevOps Deployment Strategy

## 1. DevOps Tools & Technologies

### Core DevOps Tools Used

| Tool | Version | Purpose |
|------|---------|---------|
| **Jenkins** | Latest (Pipeline) | CI/CD Orchestration - Automates build, test, and deployment processes |
| **Docker** | Latest | Containerization - Packages application with dependencies into isolated containers |
| **Docker Compose** | v3.x | Container Orchestration - Manages multi-container deployment locally and in development |
| **Git/GitHub** | Latest | Version Control - Centralized source code management with webhook integration |
| **MongoDB** | Latest | NoSQL Database - Persistent data storage for Employee Management System |
| **Nginx** | Alpine | Reverse Proxy & Web Server - Serves React frontend with optimized routing |
| **Node.js** | 18-Alpine | Backend Runtime - JavaScript runtime for Express.js API server |

### Infrastructure as Code & Deployment
- **AWS ECR** (Elastic Container Registry) - Container image storage
- **AWS EC2/ECS** - Compute instances for deployment
- **AWS RDS** - Managed database service (MongoDB/MySQL)
- **AWS ALB** - Application Load Balancer for traffic distribution
- **Terraform** - Infrastructure provisioning (referenced in architecture)
- **Ansible** - Configuration management (referenced in architecture)

---

## 2. Application Tools & Dependencies

### Backend Dependencies (Node.js)

**Framework & Core:**
- `express: ^4.21.2` - Fast, minimal web framework for REST API development
- `mongoose: ^8.19.3` - MongoDB object modeling and validation

**Security & Data Handling:**
- `bcryptjs: ^3.0.3` - Password hashing and encryption (security)
- `cors: ^2.8.5` - Enable Cross-Origin Resource Sharing for frontend communication
- `multer: ^2.0.2` - Middleware for file upload handling

**Configuration:**
- `dotenv: ^17.2.3` - Environment variable management (database URLs, API keys, etc.)

**Development Tools:**
- `nodemon: ^3.1.10` - Auto-restart server during development

---

### Frontend Dependencies (React + Vite)

**Core Framework:**
- `react: ^19.1.1` - UI library for building interactive user interfaces
- `react-dom: ^19.1.1` - React rendering in the browser
- `react-router-dom: ^7.8.2` - Client-side routing for navigation

**HTTP & Data:**
- `axios: ^1.13.2` - HTTP client for API communication with backend

**UI & Styling:**
- `tailwindcss: ^4.1.12` - Utility-first CSS framework for responsive design
- `@tailwindcss/vite: ^4.1.12` - Tailwind CSS Vite plugin integration
- `@headlessui/react: ^2.2.7` - Unstyled, accessible UI components
- `@heroicons/react: ^2.2.0` - SVG icon library
- `lucide-react: ^0.552.0` - Modern icon library
- `react-icons: ^5.5.0` - Popular icon sets (Font Awesome, Bootstrap, etc.)

**Build & Development:**
- `vite: ^7.1.2` - Lightning-fast build tool and dev server
- `@vitejs/plugin-react: ^5.0.0` - React plugin for Vite
- `eslint: ^9.33.0` - Code quality and linting
- `eslint-plugin-react-hooks: ^5.2.0` - ESLint rules for React Hooks
- `eslint-plugin-react-refresh: ^0.4.20` - Vite React Fast Refresh support

**Other:**
- `postcss: ^8.5.6` - CSS transformation tool
- `autoprefixer: ^10.4.21` - Auto vendor prefixing for CSS

---

## 3. Deployment Automation

### CI/CD Pipeline Architecture

The deployment is fully automated using **Jenkins** with a **GitHub webhook trigger** that initiates the pipeline on code commits.

#### **Pipeline Stages:**

```
┌─────────────────────────────────────────────────────────────┐
│                   JENKINS CI/CD PIPELINE                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ 1. CLONE REPOSITORY  │
                   └──────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │ Git: Pull latest code    │
                │ Branch: main            │
                │ Auth: GitHub Token      │
                └──────────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ 2. BUILD CONTAINERS  │
                   └──────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │   docker compose build                     │
        ├─────────────────────┬─────────────────────┤
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐        ┌─────────────┐      ┌──────────────┐
   │ MongoDB │        │   Backend   │      │   Frontend   │
   │         │        │   (Node.js) │      │   (React)    │
   │ Image   │        │   Image     │      │   Image      │
   └─────────┘        └─────────────┘      └──────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ 3. RUN CONTAINERS    │
                   └──────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │  docker compose down                       │
        │  docker compose up -d                      │
        └──────────────────────────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ 4. VERIFY DEPLOYMENT │
                   └──────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │  docker ps -a                              │
        │  Verify all containers running             │
        └──────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ POST-BUILD STAGE │
                    └──────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │ ✅ SUCCESS   │    │ ❌ FAILURE   │
            │ Deployment   │    │ Rollback/    │
            │ Complete     │    │ Alert        │
            └──────────────┘    └──────────────┘
```

---

### Detailed Pipeline Explanation

#### **Stage 1: Clone Repository**
```groovy
git branch: 'main', url: 'https://github.com/helaniU/DevopsProject-Employee_Management_System',
credentialsId: 'github-token'
```
- Pulls latest code from GitHub main branch
- Uses GitHub token for secure authentication
- Triggered by webhook on code push

#### **Stage 2: Build Containers**
```bash
docker compose build
```
**Builds 3 container images:**

1. **Backend Container**
   - Base: `node:18-alpine`
   - Sets workdir: `/app`
   - Installs npm dependencies
   - Exposes Port: `5000`
   - CMD: `npm start` (runs Express.js server)

2. **Frontend Container**
   - Base: `node:18-alpine` (build stage)
   - Builds React app: `npm run build` (Vite)
   - Final: `nginx:alpine` (production serve)
   - Copies built `dist/` to Nginx
   - Exposes Port: `80`
   - CMD: `nginx -g daemon off`

3. **MongoDB Container**
   - Base: Official MongoDB image
   - Port: `27017`
   - Volume: `mongo-data:/data/db` (persistent storage)

#### **Stage 3: Run Containers**
```bash
docker compose down    # Clean up old containers
docker compose up -d   # Start all services in background
```
**Services Started:**
- **Frontend**: localhost:5333 (Nginx serving React app)
- **Backend**: localhost:5000 (Express API server)
- **MongoDB**: localhost:27017 (Database)

**Service Dependencies:**
- Backend depends on MongoDB (waits for db before starting)
- Frontend depends on Backend (waits for API before starting)

#### **Stage 4: Verify Deployment**
```bash
docker ps -a
```
- Lists all running containers
- Confirms successful deployment
- Checks for any failed containers

#### **Post-Build Stage**
- **Success**: Logs "✅ Build and deployment successful!"
- **Failure**: Logs "❌ Build failed!" and alerts team

---

### Container Communication Flow

```
┌──────────────────────────────────────────────────────┐
│           External Client (Browser)                  │
└────────────────┬─────────────────────────────────────┘
                 │ HTTP Request (Port 5333)
                 ▼
        ┌────────────────────┐
        │   Nginx (Frontend) │
        │   Port: 5333→80    │
        └────────┬───────────┘
                 │ Serves React SPA (dist/ files)
                 │ Handles static assets
                 │ Reverse proxy to backend
                 │
        ┌────────▼──────────┐
        │  React App        │
        │  Port: 3000       │
        └────────┬──────────┘
                 │ API Calls via Axios (HTTP)
                 │ Port 5000
                 ▼
        ┌──────────────────────┐
        │  Backend (Express)   │
        │  Port: 5000          │
        └────────┬─────────────┘
                 │ Database Queries
                 │ Mongoose/MongoDB Protocol
                 │ Port 27017
                 ▼
        ┌──────────────────────┐
        │  MongoDB             │
        │  Port: 27017         │
        │  Database: EMS_DB    │
        └──────────────────────┘
```

---

## 4. Automation Benefits

| Benefit | Description |
|---------|-------------|
| **Continuous Integration** | Code automatically tested and built on every push |
| **Continuous Deployment** | Containers deployed automatically without manual intervention |
| **Isolated Environments** | Each service runs in its own container with specific dependencies |
| **Version Control** | All infrastructure code tracked in Git |
| **Reproducibility** | Same environment across dev, test, and production |
| **Scalability** | Easy to scale containers horizontally using Docker Compose |
| **Fast Rollback** | Old container images can be quickly restored if issues arise |
| **Minimal Downtime** | `docker compose down` and `docker compose up -d` provide quick restarts |

---

## 5. Security Practices

- **GitHub Token**: Securely stored in Jenkins credentials for repo access
- **Environment Variables**: Database URLs and sensitive data via `dotenv`
- **Password Hashing**: bcryptjs for user authentication
- **CORS**: Restricted cross-origin requests between frontend and backend
- **Alpine Images**: Minimal Docker images reduce attack surface
- **Nginx Reverse Proxy**: Adds security layer between clients and backend

---

## 6. Local Development vs. Production

### Development (Current Setup)
- Single host Docker Compose deployment
- All services on localhost with specific ports
- Volume mounts for hot-reload (nodemon, Vite)
- Easy local testing and debugging

### Production (AWS Architecture Referenced)
- **Multi-tier deployment**: EC2/ECS instances
- **Load balancing**: AWS ALB distributes traffic
- **Database isolation**: AWS RDS (managed service)
- **Storage**: AWS S3 for logs and artifacts
- **High availability**: Multi-AZ deployment with auto-scaling
- **Infrastructure as Code**: Terraform for provisioning, Ansible for configuration

---

## Summary

Your **Employee Management System** uses a **modern, containerized DevOps approach** with:
- **Automated CI/CD pipeline** via Jenkins
- **Docker containerization** for consistent deployments
- **Docker Compose** for multi-container orchestration
- **GitHub integration** with webhook triggers
- **Scalable architecture** ready for AWS cloud deployment
- **Full automation** from code commit to running application in production
