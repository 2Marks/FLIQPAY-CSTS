# Customer Support Tickecting System
This is a basic customer support ticketing system

## Getting Started
Clone the repository to your local system

### Prerequisites
```
you need to have nodejs and mongodb installed on your machine.
```

### Installing

After cloning the repository to your local system. Kindly follow the steps below to get the project running.

Environment variables are stored in env files. make a copy of the example env and set the config as appropriate. Run the command below.

```
npm run env:copy
```

And install dependencies

```
run npm install
```

Create folder to store exported csv files on your local machine

```
create [public/downloads] folder at your project root
```

### Starting the project
```
npm start
```

### Postman Docs link

[API Doc Link](https://documenter.getpostman.com/view/484915/T1DmFexWversion=latest#5aacfa3a-2811-478a-ac4c-bd65e0013d87)

#### Assumptions
* All users except a customer can have multiple roles. e.g an admin can also act as an agent


## Built With
* [Nodejs](https://nodejs.org/) - The runtime platform
* [Typescript](https://www.typescriptlang.org/) - The language used
* [Expressjs](https://expressjs.com/) - Web framework
* [MongoDB](https://www.mongodb.com/) - Database 
