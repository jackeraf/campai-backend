# campai - Backend for Fullstack developer Challenge

Welcome to **[campai](https://campai.de/)**!

This is the backend side of a code challenge for the position of `Full Stack Developer`.

Please read the following notes carefully, since they are of utmost importance for this challenge

*   Show us what you know! Think outside of the box. Think about structure, reusability and scalability
*   You should create your own repository for the front-end. You can set it up however you prefer, but you have to use `React`, a store (Mobx or Redux are both fine) and a comprehensive README to help anyone setup and run your code.
*   Testing  for the backend is not necessary. Bonus points if you do. Even more so if you add it to travis.
*   Testing the front-end is not necessary.
*   Once again, think about scalability. If I would have to add 20 more endpoints for your server tomorrow, how easy would that be?

Happy coding! :coffee:

# Before you start

For the dev environment we suggest:

*   Node 8.9.4+
*   Mongo 3.4+
*   Any code editor of your choice (Although VScode is always the right choice)
*   Npm or Yarn as package managers. Npm 5+ is fast, so we reccomend that.

# Test challenge itself:

Fork this repo to your private profile, that will be where you should commit all your backend code.

Create the front-end repo however you prefer, as stated on the guidelines above.

## Layout

For this challenge, you will build a navbar with a search input.

This is the base layout, you can click on it for more details

[<img src="https://i.imgur.com/rheKEdI.png">](https://www.figma.com/file/XNRScAt4be6hP2NvrU3RrNXO/Untitled)

## Usage

While the user is typing, the search dropdown should be updated accordingly. The search should be performed on three different collections: `orgs`, `contacts`, and `contactgroups`.

The search result inside the dropdwon should have three different sections, one for each collection. If no result is found for a certain collection, the section should not be displayed.

All searches should be canse insensitive.

## Features

*   When searching the Org collection, you can search for name, type and city. Should only display the name, city and type. You can add a dummy logo that has the initial letter of the org name like [this](<[Imgur](https://i.imgur.com/eTOdqUS.png)>)

*   When searching for contacts, you can search for the first_name, last_name and org name. Should display the full name of the user, city and the org name below the user name. For rendering the user avatar, you need to use this [library](https://github.com/fangpenlin/avataaars)

*   When searching for groups, you should search for name only. You need to display the name and city only. You can add a dummy logo that has the initial letter of the org name.

## How to start:

First, you need to have Mongo installed and running. Then you can create the fake database by running:

```
npm run fake-data
```

Then you can start the app by simply running

```
npm start
```

## Testing

Unit tests are essential for this challenge. You have to use `ava` as your test runner. You can check the documentation [here](https://github.com/avajs/ava).

To run the tests, simply do

```
npm run test
```
