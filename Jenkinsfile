pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/helaniU/DevopsProject-Employee_Management_System',
                credentialsId: 'github-token'
            }
        }

        stage('Build and Deploy') {
            steps {
                sh '''
                docker compose down
                docker compose build --no-cache
                docker compose up -d
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps -a'
                sh 'docker logs backend'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}