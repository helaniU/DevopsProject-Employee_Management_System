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
            sh '''
            # Remove any existing container named "mongo" if it exists
            if [ $(docker ps -a -q -f name=mongo) ]; then
                docker rm -f mongo
            fi

            # Bring up your docker-compose containers
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
