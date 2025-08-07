FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/tripmitra-0.0.1-SNAPSHOT.jar app.jar
COPY .env .env

EXPOSE 8910

ENTRYPOINT ["java", "-jar", "app.jar"]
