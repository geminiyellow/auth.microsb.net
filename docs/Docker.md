# How to

## Build and run with Docker

You can build and run in Docker using the following commands.

```console
docker build -t auth.microsb.net .
docker run --rm -d -p 8000:80 --name auth.microsb.net auth.microsb.net
```

## Run unit tests as part of `docker build`

The unit tests in this sample will run as part of the the `docker build` command listed above.
When changing the test, re-run `docker build` so that you can see the result, with the following command.

```console
docker build -t auth.microsb.net .
```

## Run unit tests as part of `docker run`

The project exposes a `integrationer` stage that you can build and then run explicity.You can then volume mount the appropriate directories in order to harvest test logs.

First build an image, just to and including the `integrationer` stage.

```console
docker build --target integrationer -t auth.microsb.net:integration .
```

The following commands to enable the runner to write test log files to your local drive. Without that, running tests as part of `docker run` isn't as useful.

```console
docker run --rm -v "$(pwd)"/integration:/auth.microsb.net/integration auth.microsb.net:integration
```

You should find a `.trx` file in the integration folder. You can open this file in Visual Studio to see the results of the test run.
