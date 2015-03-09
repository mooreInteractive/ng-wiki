# ng-wiki
Wiki software built with AngularJS. Chiefly a learning experience. The intial setup may be a little shakey. This is also a learning experience for the local bootstrapping/server management.

Shared learning experience for Adam Moore and George Hong. Other contributors may be accepted at a later date.

-----

**warning: learning experience - solutions may be very bad**

***Installation***

1. Clone ng-wiki files

2. Install dependencies with npm via package.json:
```	
npm install
```    
3. Set up a folder called 'data' for mongo to use, then this to start the mongo server:
```
mongod --dbpath 'path/to/folder/data'
```    
4. If this is the first time running, create a db called ng-wiki in mongo, then proceed to step 5.

5. Navigate in terminal to the ng-wiki folder and run the server application on Node:
```	
node server.js
```    
6. Navigate in browser to http://localhost:8080/ (or whateve rport you set in server.js)

-----

**Features**

***Main Template***
	-Permenant Navigation to Home/Settings,
	-Navigation based on Categorie,
	-Create new Categories on home page

***Category Pages***
	-List Pages in Category,
	-Create New Pages in current Category

***Generic Pages***
	-Display Page Content,
	-Build Digest Links,
	-Edit Page,
	-Add Sections,
	-(Attach Files)

***Settings Page***
	-Set Wiki Name,
	-Set Wiki Tagline,
	-Set Wiki Welcome Message,
	-Set Wiki MOTD,
	-set HomeHTML, if not set hoem page shows list of categories after MOTD