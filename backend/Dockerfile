# 1. 빌드 단계
FROM eclipse-temurin:17-jdk-jammy AS build-stage
WORKDIR /app

# Gradle 래퍼와 설정 파일들을 먼저 복사 (캐싱 활용)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 종속성 미리 다운로드 (소스 코드 변경 시에도 이 단계는 캐싱됨)
RUN ./gradlew dependencies --no-daemon

# 소스 코드 복사 및 빌드
COPY src src
RUN ./gradlew clean bootJar --no-daemon

# 2. 실행 단계
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build-stage /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]