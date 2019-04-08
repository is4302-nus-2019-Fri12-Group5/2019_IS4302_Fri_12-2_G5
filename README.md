# Blockchain-healthcare
IS4302 Healthcare with Blockchain Technology - 2019 Friday 12-2pm Team 5

<br />

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


## Project Images

### HOME

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/home.png" alt="is4302 banner" align="center" />

### SIGNUP

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/login.png" alt="is4302 banner" align="center" />

### LOG IN
<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/signup.png" alt="is4302 banner" align="center" />



### HOW IT WORKS

<br />

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/How_it_works-pt1.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/How_it_works-pt2.JPG" alt="is4302 banner" align="center" />

### Doctor

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-Dashboard.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-create presccription.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-Edit_Prescription.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-medical records.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-medical_records_of_selected_patient.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-PatientList.JPG" alt="is4302 banner" align="center" />


<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Doctor-prescription of selected record.JPG" alt="is4302 banner" align="center" />


### PATIENTS

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Patient-Dashboard.JPG" alt="is4302 banner" align="center" />

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Patient-HospitalList.JPG" alt="is4302 banner" align="center" />

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Patient-MedicalRecord.JPG" alt="is4302 banner" align="center" />

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/Patient-Update Personal Info.JPG" alt="is4302 banner" align="center" />

<img src="https://raw.githubusercontent.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare/master/public/images/readme/wallet.JPG" alt="is4302 banner" align="center" />



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
<br> - npm run build_image
<br> - npm run test_bna
<br> - npm run setup_crypto
<br> - npm run start_fabric
<br> - npm run start_playground
<br> - go to localhost:8080/ and import our healthcare-blockchain(Clean).bna file in and deploy
<br> - Under Credentials for System Adminstrator, select 'ID and Secret'
<br> - Input Enrollment ID: admin and Enrollment Secret: adminpw

<br> 3. Set up the following participants:
<br> - Hospital identified as h1
<br> - Doctor identified as d1 assigned to h1 hospital
<br> - Patient identified as p1 assigned to h1 hospital

<br>4. Issue new identities to participants on the composer.
<br> - Doctor d1 as d1
<br> - Patient p1 as p1

<br>5. To start the rest server:
<br> - npm run start_rest-server p1@blockchain-healthcare 3001
<br> - npm run start_rest-server d1@blockchain-healthcare 3002

**Great! Now you have the blockchain network up and running!

## Front-End 

1. Clone this repo using `git clone https://github.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare.git`
2. Move to the appropriate directory: `cd 2019_IS4302_Fri_12-2_G5`
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

## Troubleshooting 

**Common problems when launching front-end such as:**
1. internal/modules/cjs/loader.js:596 throw err;
    <br>Error: Cannot find module './types.json</br>
    <br>FIX: Remove node_modules folder and re-run npm install on terminal</br>
2. Cannot find module 'express-http-proxy'
    <br>FIX: npm install express-http-proxy</br>



## Info

Project for IS4302 @ NUS SoC

## Disclaimer

This Blockchain project is based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), which is the ultimate starter template for kickstarting a React project. We also implement this based on [Crate](https://github.com/atulmy/crate) template


## License

MIT license, Copyright (c) 2019 Jerrald, Brandon, Yuting, Weijie, Win Phong.

