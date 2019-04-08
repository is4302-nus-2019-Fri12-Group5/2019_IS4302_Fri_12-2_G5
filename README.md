# Blockchain-healthcare
IS4302 Healthcare with Blockchain Technology - 2019 Friday 12-2pm Team 5


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/banner.png" alt="is4302 banner" align="center" />


<br />

<div align="center">Share Medical Information and More!</div>

<br />

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/flexdinesh/react-redux-boilerplate">
    <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/flexdinesh/react-redux-boilerplate#info=devDependencies">
    <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/flexdinesh/react-redux-boilerplate">
    <img src="https://travis-ci.org/flexdinesh/react-redux-boilerplate.svg" alt="Build Status" />
  </a>
</div>

<br />

<div align="center">
  <sub>Created by <a href="https://twitter.com/flexdinesh">IS4302 Fri 12-2pm Group 5</a></sub>
</div>

## Quick start
Follow the instructions below.
## Hyperledger Composer
<br> 0. Set up the lab environment as per instructions in https://github.com/suenchunhui/easy-hyperledger-composer 

<br> 1. Download the fileblockchain_network/healthcare-blockchain(Clean).bna file from the github directory

<br> 2.Run the following commands:
<br> - cd easy-hyperledger-composer
<br> - npm run build_image (only for first time setup, skip if not required)
<br> - npm run test_bna (only for first time setup, skip if not required)
<br> - npm run setup_crypto
<br> - npm run start_fabric
<br> - npm run start_playground
<br> - go to localhost:8080/ and import our healthcare-blockchain(Clean).bna file in and deploy
<br> - Under Credentials for System Adminstrator, select 'ID and Secret'
<br> - Input Enrollment ID: admin and Enrollment Secret: adminpw

<br> 3. Set up the following participants:
<br> - Hospital identified as h1 (registrationID)
<br> - Doctor identified as d1 (NRIC)
<br> - Patient identified as p1 (NRIC)

<br> 4. Issue new identities to participants on the composer and activate each user before proceeding to next step.
<br> - Hospital h1 as h1 
<br> - Patient p1 as p1
<br> - Doctor d1 as d1

<br> 5. Use ID of participant h1

<br> 6. Perform AddDocToHospital transaction to add d1 into h1's list of doctors

<br> 7. To start the rest server:
<br> - npm run start_rest-server p1@blockchain-healthcare 3001
<br> - npm run start_rest-server d1@blockchain-healthcare 3002

**Great! Now you have the blockchain network up and running!

## Front-End 

1. Clone this repo using `git clone https://github.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare.git`
2. Move to the appropriate directory: `cd blockchain-healthcare`
3. Run `yarn` or `npm install` to install dependencies.
4. Run `npm start` to see the example app at `http://localhost:3000`.

**Now you're ready to build on our Blockchain Application!**

## Logging in
<br> **Logging in as a patient**
<br> userid : bcd
<br> password: password

<br> **Logging in as a doctor**
<br> userid : abc
<br> password: password

## Shutting down of blockchain network

<br> 1. Stop the rest server:
<br> - npm run stop_rest-server p1@blockchain-healthcare 3001
<br> - npm run stop_rest-server d1@blockchain-healthcare 3002

<br> 2. To tear down the network, run the following commands:
<br> - npm run stop_playground
<br> - npm run stop_fabric
<br> - npm run clean_network

## Troubleshooting 

**Common problems when launching front-end such as:**
1. internal/modules/cjs/loader.js:596 throw err;
    <br>Error: Cannot find module './types.json</br>
    <br>FIX: Remove node_modules folder and re-run npm install on terminal</br>
2. Cannot find module 'express-http-proxy'
    <br>FIX: npm install express-http-proxy</br>
3. Unable to build the network
    <br> FIX: 
    <br> 1. npm run stop_playground (if started)
    <br> 2. npm run stop_fabric (if started)
    <br> 3. npm run clean_network

## Features 

What can MediChain do for you in today's world?

<dl>

  <dt>Integrated Payment Methods</dt>
  <dd>Pay your doctor at your own convenience through multiple payment methods.</dd>

  <dt>Add your preferred hospital</dt>
  <dd>Add your hospital for easier access.</dd>

  <dt>Manage your patients all in one platform</dt>
  <dd>Access/create/update your patients medical records all in this one stop platform for you doctors.</dd>

  <dt>Manage your doctors all in one platform</dt>
  <dd>Add and remove doctors in your hospital in an instant</dd>

</dl>

But wait... there's more!

  - Ever-changing, ever-improving platform by a dedicated team of professionals, aspiring to change the healthcare industry


## Info

Project for IS4302 @ NUS SoC

## Disclaimer

This Blockchain project is based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), which is the ultimate starter template for kickstarting a React project. 


## License

MIT license, Copyright (c) 2019 Jerrald, Brandon, Yuting, Weijie, Win Phong.
