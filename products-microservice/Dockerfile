# Stage 1: build the application
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
# Stage 2: create the image
FROM eclipse-temurin:17
WORKDIR /app
COPY --from=build /app/target/cloudbackend-1.0.0.jar .
EXPOSE 8080
CMD ["java", "-jar", "cloudbackend-1.0.0.jar"]