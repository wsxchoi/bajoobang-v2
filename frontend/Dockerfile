# 빌드 단계
FROM node:18-alpine AS build-stage
WORKDIR /app
# 환경변수 주입
ARG REACT_APP_KAKAOMAP_APIKEY
ENV REACT_APP_KAKAOMAP_APIKEY=$REACT_APP_KAKAOMAP_APIKEY
# 종속성 설치 (캐싱 활용을 위해 package.json 먼저 복사)
COPY package*.json ./
RUN npm install
# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build


# 실행 단계 (Nginx)
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
# 이전 단계에서 생성된 빌드 결과물만 복사
COPY --from=build-stage /app/build /usr/share/nginx/html
# Nginx 설정 파일
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]