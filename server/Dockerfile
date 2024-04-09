FROM eclipse-temurin:17.0.9_9-jre-jammy

WORKDIR /project
COPY . .
RUN ./gradlew bootJar --no-daemon

EXPOSE 8080

ENTRYPOINT ["java","-jar","build/libs/coding-challenge-1.0.0.jar"]