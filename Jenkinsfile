pipeline {
    agent any

    tools {
        nodejs 'node-22'  
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Web Server') {
            steps {
                sh '''
                    echo Deploying build to webserver...
                    sudo cp -r dist/assets dist/favicon.ico dist/index.html /var/www/isms-frontend/
                    echo Deployment Completed Successfully.
                '''
            }
        }
    }
}
