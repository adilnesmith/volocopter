FROM eclipse-temurin:17.0.9_9-jre-jammy

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Create directory for MongoDB data
RUN mkdir -p /data/db

WORKDIR /project
COPY . .
RUN ./gradlew bootJar --no-daemon

EXPOSE 8000
EXPOSE 27017

ENTRYPOINT ["java","-jar","build/libs/coding-challenge-1.0.0.jar"]