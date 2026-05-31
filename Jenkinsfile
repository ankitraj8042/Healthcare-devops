pipeline {
agent any

```
environment {
    DOCKERHUB_USER = "ankit86"
}

stages {

    stage('Clone Repository') {
        steps {
            git branch: 'feature/devops-core',
                url: 'https://github.com/ankitraj8042/Healthcare-devops.git'
        }
    }

    stage('Build Images') {
        steps {
            sh 'docker compose build'
        }
    }

    stage('Docker Hub Login') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {

                sh '''
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                '''
            }
        }
    }

    stage('Tag Images') {
        steps {
            sh '''
            docker tag healthcare-devops-backend:latest ankit86/healthcare-backend:latest
            docker tag healthcare-devops-frontend:latest ankit86/healthcare-frontend:latest
            '''
        }
    }

    stage('Push Images') {
        steps {
            sh '''
            docker push ankit86/healthcare-backend:latest
            docker push ankit86/healthcare-frontend:latest
            '''
        }
    }
}
```

}
