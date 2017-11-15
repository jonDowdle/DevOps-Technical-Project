# RESTful Cats

## Overview 

This is an implementation of the directions given in `DIRECTIONS.md`. Essentially, this is an application that returns URLs to cat images and the history of which URLs were returned. 

There are two HTTP endpoints that return data. 

| Endpoint | Supported HTTP Verbs | Purpose |
|-----------|-------------------------|-----------|
| /cat | GET | Returns JSON describing a cat image |
| /history | GET | Returns a JSON array of all previously returned cat images |


## Required ENV Vars

There are three environment (ENV) variables to set for the application to operate properly. The are detailed in the table below. 

| ENV Var | Usage |
|----------|--------|
| PORT | Port on host to map into container |
| CONTAINER_PORT | Port within container to listen on | 
| CAT_API_KEY | API Key for the Cat API. [Request one here.](http://thecatapi.com/api-key-registration.html) |  

If you don't have anything running on port `8080`, you can run the following to set the port values:

```
export PORT=8080
export CONTAINER_PORT=8080
```

To test that the above were set correctly, you can run
```
printenv PORT
printenv CONTAINER_PORT
```
and you should see the values `8080` for both.

If you would like to use the `CAT_API_KEY`, setting it is very similar:
```
export CAT_API_KEY=<YOUR_API_KEY>
```

## Running

Once the above required ENV variables are set, running the application is simply done via `docker-compose up` from within the application directory. You will be greeted by the Docker compose output for Redis and the application. To access the applicaiton, open your browser and go to http://localhost:<PORT>, where `<PORT>` is the value you set for the required ENV variables.

## Etc

There is a `Makefile` available as well. Currently, only `make lint` is supported.
