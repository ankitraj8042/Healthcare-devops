pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
  }

  stages {
    stage('Clone Repository') {
      steps {
        echo 'Cloning repository'
        git branch: 'feature/devops-core', url: 'https://github.com/ankitraj8042/Healthcare-devops.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        echo 'Building Docker images'
        sh 'docker compose build'
      }
    }

    stage('Stop Existing Containers') {
      steps {
        echo 'Stopping existing containers'
        sh 'docker compose down || true'
      }
    }

    stage('Start Containers') {
      steps {
        echo 'Starting containers'
        sh 'docker compose up -d'
      }
    }
  }
}
