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

<dt>Hyperledger Composer</dt>
0. Set up the lab environment as per instructions in https://github.com/suenchunhui/easy-hyperledger-composer 
<br>1. Download the blockchain-healthcare/blockchain_network/healthcare-blockchain(Clean).bna file into the easy-hyperledger-composer folder
<br>2. Run the following commands:
    <http><br>npm run build_image
    <br>npm run test_bna
    <br>npm run setup_crypto
    <br>npm run start_fabric
    <br>npm run build_bna blockchain-healthcare(clean).bna
    <br>npm run install_bna blockchain-healthcare(clean).bna
    <br>npm run start_playground</http>
<br>3. Set up hospital, doctor and patient participants.
<br>4. Issue new identities to participants on the composer.
<br>5. To start the rest server:
    <br>npm run start_rest-server {participant ID}@blockchain-healthcare(Clean) 3001
    
Great! Now you have the blockchain network up and running!

<dt> Front-End </dt>
1. Clone this repo using `git clone https://github.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare.git`
2. Move to the appropriate directory: `cd blockchain-healthcare`.<br />
3. Run `yarn` or `npm install` to install dependencies.<br />
4. Run `npm start` to see the example app at `http://localhost:3000`.

Now you're ready to build on our Blockchain Application!

This Blockchain project is based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), which is the ultimate starter template for kickstarting a React project. 

## Troubleshooting 

Common problems such as:
1. internal/modules/cjs/loader.js:596 throw err;
    <br>Error: Cannot find module './types.json</br>
    <br>FIX: Remove node_modules folder and re-run npm install on terminal</br>
2. Cannot find module 'express-http-proxy'
    <br>FIX: npm install express-http-proxy</br>


## Features 

What can MediChain do for you in today's world?

<dl>

  <dt>Integrated Payment Methods</dt>
  <dd>Pay your doctor at your own convenience through multiple payment methods.</dd>

  <dt>Book your appointment</dt>
  <dd>Scroll through doctors in your hospital to arrange appointment for a suitable one.</dd>

  <dt>Manage your patients all in one platform</dt>
  <dd>Access/create/update your patients medical records all in this one stop platform for you doctors.</dd>

  <dt>Manage your doctors all in one platform</dt>
  <dd>Add and remove doctors in your hospital in an instant</dd>

</dl>

But wait... there's more!

  - Ever-changing, ever-improving platform by a dedicated team of professionals, aiming to change the healthcare industry


## Info

Project for IS4302 @ NUS SoC


## License

MIT license, Copyright (c) 2019 Jerrald, Brandon, Yuting, Weijie, Win Phong.
