# Coin Folder

Coin collecting is a time-honored tradition, and the experience can be shared across generations. Collectors find coins in their change while shopping, save them, and later check to see if the particular coins are needed for their collections.

Most collectors organize their collections in commercially made folders, and must check any found coins by opening and checking these folders. This activity is fun to do with young children because they enjoy categorizing the coin, finding the space, and experience satisfaction when that space is empty and they can insert the found coin. Collecting is a fun way to work toward a long-term goal while learning about the thing being collected. 

Many people start collections with their children when they are young, but drift away from the activity as the children grow more independent because the task of checking the coins against the collections can be tedious when done alone. Similarly, it is hard to share the joy of collecting between people who are physically separated, such as between a grandchild in Minnesota and a grandparent in Florida.

CoinFolder brings back the excitement of collecting by allowing collectors not only to see if they need any coins that they find, but to be notified if there are other collectors using the app that need the coin that they found. Email messaging between the users helps share the joy of collecting, as well as create and maintain connections between the collectors. Progress is reinforced by charts and graphs of progress compared with other users of the app.

The features and configuration are geared toward collecting circulating coins from the United States Mint.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install the following software on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    Change superDuperSecret to a long, randomly generated string.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate your browser to `localhost:3000`

### Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

### Deploying

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

Create database per database.sql file. The database name is set in /server/modules/pool.js.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

## Contributing

## Authors

## License

All rights retained by author.

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
