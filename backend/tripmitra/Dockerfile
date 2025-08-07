FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/tripmitra-0.0.1-SNAPSHOT.jar .

COPY .env .env

EXPOSE 8910

ENTRYPOINT ["java", "-jar", "/app/tripmitra-0.0.1-SNAPSHOT.jar"]
