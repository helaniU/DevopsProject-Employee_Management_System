pipeline {
    agent any

    stages {
        stage('Build and Deploy') {
            steps {
                sshagent(['ec2-user-ssh-key']) {  // use the ID of your SSH credential in Jenkins
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.233.73.206 "
                        cd /home/ec2-user/ems || exit 1
                        git fetch origin
                        git reset --hard origin/main
                        docker-compose down --remove-orphans || true
                        docker-compose build --no-cache
                        docker-compose up -d --force-recreate --remove-orphans
                    "
                    '''
                }
            }
        }
        
        stage('Verify') {
            steps {
                sshagent(['ec2-user-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.233.73.206 "
                        docker ps -a
                        docker logs backend || true
                    "
                    '''
                }
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