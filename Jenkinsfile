pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/helaniU/EMS_Devops_Project.git',
                credentialsId: 'github-token'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                // Stop and remove existing containers first to avoid conflicts
                sh '''
                docker compose down
                docker compose up -d
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps -a'
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
