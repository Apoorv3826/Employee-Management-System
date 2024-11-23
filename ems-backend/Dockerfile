# Stage 1: Build the application with Maven
FROM maven:3.8-openjdk-17 AS build

WORKDIR /app

# Copy the Maven configuration files and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application with OpenJDK
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/crud-backend-0.0.1-SNAPSHOT.jar .

# Expose the application port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "/app/crud-backend-0.0.1-SNAPSHOT.jar"]
