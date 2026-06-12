pipeline {
    agent any

    environment {
        DOCKERHUB_USER   = 'ankit86'
        FRONTEND_IMAGE   = "${DOCKERHUB_USER}/healthcare-frontend"
        BACKEND_IMAGE    = "${DOCKERHUB_USER}/healthcare-backend"
        IMAGE_TAG        = "build-${BUILD_NUMBER}"
    }

    triggers {
        githubPush()
    }

    stages {

        // ──────────────────────────────────────────────
        // Stage 1: Checkout code from GitHub
        // ──────────────────────────────────────────────
        stage('Checkout Code') {
            steps {
                echo '=========================================='
                echo '  STAGE 1: Checking out source code...'
                echo '=========================================='
                git branch: 'main',
                    url: 'https://github.com/ankitraj8042/Healthcare-devops.git'
                echo "✅ Code checkout complete."
            }
        }

        // ──────────────────────────────────────────────
        // Stage 2: Build frontend Docker image
        // ──────────────────────────────────────────────
        stage('Build Frontend Image') {
            steps {
                echo '=========================================='
                echo '  STAGE 2: Building Frontend Docker Image'
                echo '=========================================='
                sh """
                    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
                    docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest
                """
                echo "✅ Frontend image built: ${FRONTEND_IMAGE}:${IMAGE_TAG}"
            }
        }

        // ──────────────────────────────────────────────
        // Stage 3: Build backend Docker image
        // ──────────────────────────────────────────────
        stage('Build Backend Image') {
            steps {
                echo '=========================================='
                echo '  STAGE 3: Building Backend Docker Image'
                echo '=========================================='
                sh """
                    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
                    docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest
                """
                echo "✅ Backend image built: ${BACKEND_IMAGE}:${IMAGE_TAG}"
            }
        }

        // ──────────────────────────────────────────────
        // Stage 4: Push frontend image to Docker Hub
        // ──────────────────────────────────────────────
        stage('Push Frontend Image') {
            steps {
                echo '=========================================='
                echo '  STAGE 4: Pushing Frontend Image to Docker Hub'
                echo '=========================================='
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
                sh """
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${FRONTEND_IMAGE}:latest
                """
                echo "✅ Frontend image pushed: ${FRONTEND_IMAGE}:${IMAGE_TAG} & latest"
            }
        }

        // ──────────────────────────────────────────────
        // Stage 5: Push backend image to Docker Hub
        // ──────────────────────────────────────────────
        stage('Push Backend Image') {
            steps {
                echo '=========================================='
                echo '  STAGE 5: Pushing Backend Image to Docker Hub'
                echo '=========================================='
                sh """
                    docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${BACKEND_IMAGE}:latest
                """
                echo "✅ Backend image pushed: ${BACKEND_IMAGE}:${IMAGE_TAG} & latest"
            }
        }

        // ──────────────────────────────────────────────
        // Stage 6: Deploy to AWS EC2 via Ansible
        // ──────────────────────────────────────────────
        stage('Ansible Deploy') {
            steps {
                echo '=========================================='
                echo '  STAGE 6: Deploying to AWS EC2 via Ansible'
                echo '=========================================='
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sshagent(['aws-ec2-key']) {
                        sh '''
                            export ANSIBLE_HOST_KEY_CHECKING=False
                            export ANSIBLE_CONFIG=ansible/ansible.cfg
                            ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
                                -e "dockerhub_token=$DOCKER_PASS" \
                                -e "dockerhub_user=$DOCKER_USER"
                        '''
                    }
                }
                echo "✅ Ansible deployment complete!"
            }
        }

        // ──────────────────────────────────────────────
        // Stage 7: Verify Deployment
        // ──────────────────────────────────────────────
        stage('Verify Deployment') {
            steps {
                echo '=========================================='
                echo '  STAGE 7: Verifying Deployment'
                echo '=========================================='
                sshagent(['aws-ec2-key']) {
                    sh '''
                        echo ">> Checking running containers..."
                        ssh -o StrictHostKeyChecking=no ubuntu@43.205.206.219 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'

                        echo ""
                        echo ">> Checking Healthcare Frontend..."
                        ssh -o StrictHostKeyChecking=no ubuntu@43.205.206.219 'curl -sf -o /dev/null -w "Frontend: HTTP %{http_code}\n" http://localhost:3000'

                        echo ">> Checking Grafana..."
                        ssh -o StrictHostKeyChecking=no ubuntu@43.205.206.219 'curl -sf -o /dev/null -w "Grafana:  HTTP %{http_code}\n" http://localhost:3001/api/health'

                        echo ">> Checking Prometheus..."
                        ssh -o StrictHostKeyChecking=no ubuntu@43.205.206.219 'curl -sf -o /dev/null -w "Prometheus: HTTP %{http_code}\n" http://localhost:9090/-/healthy'
                    '''
                }
                echo "✅ All services verified and running!"
            }
        }
    }

    post {
        success {
            echo ''
            echo '╔══════════════════════════════════════════════╗'
            echo '║   🎉 PIPELINE COMPLETED SUCCESSFULLY!       ║'
            echo '║                                              ║'
            echo '║   ✅ Images pushed to Docker Hub             ║'
            echo '║   ✅ Ansible deployed to AWS EC2             ║'
            echo '║   ✅ Monitoring stack active                 ║'
            echo '║   ✅ Health checks passed                    ║'
            echo '╚══════════════════════════════════════════════╝'
            echo ''
        }
        failure {
            echo ''
            echo '╔══════════════════════════════════════════════╗'
            echo '║   ❌ PIPELINE FAILED!                        ║'
            echo '║   Check the logs above for errors.           ║'
            echo '║                                              ║'
            echo '║   Rollback: docker pull ankit86/healthcare-  ║'
            echo '║   frontend:build-<PREV_BUILD_NUMBER>         ║'
            echo '╚══════════════════════════════════════════════╝'
            echo ''
        }
        always {
            echo "Build Number: ${BUILD_NUMBER}"
            echo "Image Tag:    ${IMAGE_TAG}"
            echo "Build URL:    ${BUILD_URL}"
            sh 'docker logout || true'
        }
    }
}
