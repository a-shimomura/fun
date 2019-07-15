## Installation
You should install dependencies first:

### fun
```
$ npm install @alicloud/fun -g
```

### dependencies
```
$ npm install
```

### Deploy
```
$ fun deploy
```

### Test
```
npm run test
```

### Configuration
In addition to configuring fun with fun config, you can also configure for fun with environment variables and .env files.

The process for using environment variables is very simple. We briefly describe the configuration of fun through .env.

Create a file named .env in the project directory with the following content:

ACCOUNT_ID=xxxxxxxx
REGION=cn-shanghai
ACCESS_KEY_ID=xxxxxxxxxxxx
ACCESS_KEY_SECRET=xxxxxxxxxx
TIMEOUT=10
RETRIES=3
It is recommended to add the .env into .gitignore file to prevent your account credentials from being checked into code repository.

#### Configuring Priority
The priority of the fun configuration is decremented in the following order：

.env
environment variables
~/.fcli/config.yaml

### License
The MIT License

