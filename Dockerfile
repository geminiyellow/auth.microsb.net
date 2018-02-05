FROM microsoft/aspnetcore:latest as base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:latest as build
WORKDIR /auth.microsb.net

# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/*.csproj ./src/
COPY integration/*.csproj ./integration/
RUN dotnet restore

# copy and build everything else
COPY src/. ./src/
COPY integration/. ./integration/
RUN dotnet build

FROM build as integrationer
WORKDIR /auth.microsb.net/integration
ENTRYPOINT ["dotnet", "test","--logger:trx"]

FROM build AS integration
WORKDIR /auth.microsb.net/integration
RUN dotnet test

FROM integration as publish
WORKDIR /auth.microsb.net/src
RUN dotnet publish --no-restore -c Release -o /app

FROM base as final
WORKDIR /app
COPY --from=publish /app .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet auth.microsb.net.dll
