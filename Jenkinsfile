pipeline {
    agent any

    triggers {
        githubPush() // runs instantly when you push to GitHub
    }

    stages {
        stage('Deploy on EC2') {
            steps {
                // SSH agent must match the ID of the private key added in Jenkins credentials
                sshagent(['DEPLOY_SSH']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@13.233.73.206 '
                            cd /home/ec2-user/ems || exit 1
                            git fetch origin
                            git reset --hard origin/main
                            docker-compose down --remove-orphans || true
                            docker-compose build --no-cache
                            docker-compose up -d --force-recreate --remove-orphans
                        '
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sshagent(['DEPLOY_SSH']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@13.233.73.206 '
                            docker ps -a
                            docker logs backend || true
                        '
                    """
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