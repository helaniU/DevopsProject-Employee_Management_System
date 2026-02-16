pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/helaniU/DevopsProject-Employee_Management_System',
                credentialsId: 'github-token'
            }
        }

        stage('Build and Deploy') {
            steps {
                sshagent(['DEPLOY_SSH']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.233.73.206 "
                        cd /home/ec2-user/ems || exit 1 &&
                        docker-compose down --remove-orphans || true &&
                        docker-compose build --no-cache frontend &&
                        docker-compose up -d --force-recreate --remove-orphans
                    "
                    '''
                }
            }
        }
        
        stage('Verify') {
            steps {
                sh 'docker ps -a'
                sh 'docker logs backend || true'
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
