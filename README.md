# Description

GLKB-Kantonalbank-Replica is a onlinebanking website created with angular. It works together with the bootstrap library. It also works with sql databases and localstorage to transfer amounts of money to other accounts. It doesnt transfer real money. You get a ballance of 1000 CHF after signing up. You need the accountnumber of a different account in order to send the money to it.

## Validation
Every account needs a firstname, a lastname, a username and a password which all need to have more than 3 characters.
There is no option to reset a password through email verfication.

# Usage
To start it you need to install a few libraries.
You need to install Angular version 16 for it to work. Its not safe to work if a different version is installed.
```
npm install @angular/cli@16.2.8 --save-dev
```
Search for the following code in package.json. It worked if its in.
```
  "devDependencies": {
   "@angular/cli": "^16.2.8",
 ```
Paste and run this command inside the frontend and backend folder.
```
npm i
```

To now run this project, you should write the following code in both folders frontend and backend aswell.
Both commands work.
The better option:
```
npm run start
```
or
```
npx ng serve
```

