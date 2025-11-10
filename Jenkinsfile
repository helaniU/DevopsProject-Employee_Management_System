pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/helaniU/EMS_Devops_Project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f $COMPOSE_FILE build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose -f $COMPOSE_FILE up -d'
            }
        }

        stage('Test') {
            steps {
                echo 'Optional: run tests here'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Optional: stop containers after test'
                sh 'docker-compose -f $COMPOSE_FILE down'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
