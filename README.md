# Codedamn Projects - Full-stack Todo App

![Pending Todo](https://user-images.githubusercontent.com/50735025/151712301-2a99ea2d-a6c9-4d95-8e78-3e557ba05088.png)

![Typing Todo](https://user-images.githubusercontent.com/50735025/151712305-1373c0ee-0e56-47ec-aab9-b1dfacd6f9ae.png)

![Completed Todo](https://user-images.githubusercontent.com/50735025/151712296-c304bc81-0523-4629-ad34-077e0449ec0a.png)
## Hello developer!

This is one of the many projects available on [codedamn](https://codedamn.com/projects) to reinforce your learning by building. If you want to become a full stack developer and learn by practicing, feel free to attempt this challenge. Feel free to check out the codedamn [Full Stack Web Development Learning Path](https://codedamn.com/learning-paths/fullstack) to learn more about how to become an awesome full stack developer.

## Project Overview

You have to create an application that allows people to manage their Todo's

The application should take care of the following aspects: 

-  Registeration / Login for users, all user data should be persisted in a database (mongodb in this case). 
-  Users should be able to Create, Read, Update and delete their todos from the UI. 
-  All todos data should be persisted in database for each user.


### Landing Page

The is no landing page structure, you are free to make a small landing page based on the topic of the project and the page should contain the links for login and registration 

### Register

The registration functionality should be implemented at  `/register` route.

This should contain the user details, refer to the user document for the details to be collected. 

### Log In

The login functionality should be implemented in the `/login` route.

On Successful submission of credentials you have to create and store a JWT token in localStorage for handling the authentication. Every request to the api should share the JWT token to verify the identity of the user, before returning any response. 

### Todos

All the available todos for the logged in user should be shown on `/` page and the user should be able to manage their todos from here.

## API Routes 

### `/api/auth/signin`

To verify the user credentials on Sign In, taking the parameters as email and the password 

### `/api/auth/register` 

To register a new user and add the document to the database


### GET `/api/todos`

This should return all the todos for the logged in user.

### POST `/api/create-todo`

This api should add a todo to the todos document in the database. 

### PUT `/api/todos/{todoId}`

This Endpoint should be used to update todos. For eg. for editing the todos title, or marking the todo as complete.

### DELETE `/api/todos/{todoId}`

This should remove the todo for the logged in user. Note verify in backend that the todo to be deleted is actually owned by the logged in user.


### MongoDB User document
```
{
  "_id": randomly auto-generated _id by mongodb,
  "name": "User's name",
  "email": "user@email.com",
  "password: string (store it as hash using bcrypt)
}
```
### MongoDB Todos document
```
{ 
   "_id": randomly auto-generated _id by mongodb,
   "title": "bring milk",
   "userid": user documents _id field, 
   "done": false (this should be a boolean value, and should be false when the user creates the todo),
   "time":  date object
}
```

### Ports 
The Codedamn Playgrounds exposes only `1337` and `1338` ports on the internet. So you'll be using `localhost` for connecting to the mongodb instance as they are hosted on the same docker container. You can specify it as `localhost:27017` or simple write `localhost`. 

## Recommended Technologies 

1. Mongoose for mongodb object modelling and effective type system 
1. Tailwind CSS for User Interface
1. `@mui/icons-material`. You can use their [website](https://mui.com/components/material-icons/) to pick up icons for the project.

There is no restriction for using mui, you can free to choose any other icons for your project.


## Instructions

Your challenge is to build out this project and get it looking as close to the design as possible or take it up a notch and surprise us.

You can use **any tools or technologies** you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your project should:

-   Be responsive for desktop and mobile phones
-   Have minimum functionalities and effects working


Want some support on the challenge? [Join our discord community](https://cdm.sh/discord) and ask questions in the **#general** channel.

There is no limit you can go beyond the mentioned criteria and create additional functionalities


## Where to find everything

Your task is to build out the project as per the provided screenshots. You will find both a mobile and a desktop version of the design.

The designs are in image formats can be found in `/designs`.

You will find all the required required images in the `/public` folder

There is also a `style-guide.html` file containing the information you'll need, such as color palette and font names. Make sure to open this in the browser to see the contents.

## Want to do more

1. You can build OAuth2 for Sign In and Registration
1. Creating the network page and having Connections

## Send feedback!

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please visit [codedamn feedback page](https://codedamn.com/contact)# todo-app-fullstack
