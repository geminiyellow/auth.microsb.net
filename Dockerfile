# COPY FROM: https://github.com/dotnet-architecture/eShopOnContainers/blob/dev/src/Services/Identity/Identity.API/Dockerfile
FROM microsoft/aspnetcore:latest as base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:latest as build
WORKDIR /src
COPY . .
RUN dotnet restore
# WORKDIR /src/src/Services/Identity/auth.microsb.net
RUN dotnet build --no-restore -c Release -o /app

FROM build as publish
RUN dotnet publish --no-restore -c Release -o /app

FROM base as final
WORKDIR /app
COPY --from=publish /app .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet auth.microsb.net.dll
