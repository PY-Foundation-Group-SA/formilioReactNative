<div align="center">

<img height=200px src="assets/project-logo.png">

# Formilio - React Native App

[![Build Status](https://travis-ci.com/sarthakpranesh/formilioReactNative.svg?branch=master)](https://travis-ci.com/sarthakpranesh/formilioReactNative)
![GitHub issues](https://img.shields.io/github/issues/sarthakpranesh/formilioReactNative)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/sarthakpranesh/formilioReactNative)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sarthakpranesh/formilioReactNative)
![GitHub](https://img.shields.io/github/license/sarthakpranesh/formilioReactNative)

</div>

## Meet Formilio - form generator for your daily needs!
<p>
Welcome to Formilio! The goal behind formilio is to provide an open source form generation tool ( like google forms ), keeping in mind ease of access and usability. Using Formilio is simple and straight forward, you create a form and the app will provide you with a unique url. You can share this url to collect responses.
</p>
<p>
You can fully customize the Formilio app, frontend form and backend api as per your needs and requirements if you wish to implement your own project over it.
Don't forget to star the project 🌟
</p>

## Download Latest-Release: [Formilio](https://github.com/sarthakpranesh/formilioReactNative/tree/build)

## For Developer & Enthusiasts
For contributors, developer and testers
1. `git clone https://github.com/sarthakpranesh/formilioReactNative.git`
2. `cd formilioReactNative`
3. `yarn install`
4. `yarn android` - this will start your app in either a physical connected device or an emulator ( make sure you start the metro bundler before it using `yarn start` and leave it running )

<br/>

If you wish to have your own server and mongo database then make sure you follow the below steps
1. Make sure you have started your own [Formilio API](https://github.com/sarthakpranesh/formilio) and [Formilio Form Frontend](https://github.com/sarthakpranesh/formilio-frontend) servers, if you haven't then set them up
2. `git clone https://github.com/sarthakpranesh/formilioReactNative.git`
3. `cd formilioReactNative`
4. Add your Formilio API url to the .env (remove existing one): `API_URL = https://YOUR-API-URL.com/` 
5. `yarn install`
6. `yarn android` - this will start your app in either a physical connected device or an emulator ( make sure you start the metro bundler before it using `yarn start` and leave it running )


## Features Table

|Feature Gist           |How to!            |Helps With         | 
|---	|---	|---	|
|Easy Account Creation|Sign Up -> create your account|With Formilio you can create as many forms as you want. Without a sweat|
|Dark & Light Theme|Toggle theme Switch on Login and Sign up screens, or change theme using Drawer|Formilio takes care of user preferences such as themes and provides two themes to choose from |
|All Your Forms In One Place|Home Screen - screen after login|All your forms are listed in one place for easy access|
|Search For Forms|Tab on `Search for Form` and type the name of the form|Having Too Many Forms? Search Your Way Out|
|Intuitive Form Creation|Requires User To be logged in - either click on the plus icon on HomeScreen or open the drawer from the left and hit `Add New Form`|Allows you to add new forms with card UI|
|Easily View Form Details|Click on a form in Home Screen|Gives you details such as created on, description, form url, etc|
|Download Your Responses|In the Form details view, click on Download button in header|All your form responses will be downloaded as a .csv file and will be saved in your `Downloads` folder|

<br/>

## Help Us Improve Formilio?
This project uses [GitHub Issues](https://github.com/sarthakpranesh/formilioReactNative/issues) to track bugs, feature request and more. So feel free to open issues and feature request 😉.
Also help us make a better experience and be a part of the project!
