# ng-wiki
Wiki software built with AngularJS. Chiefly a learning experience. The intial setup may be a little shakey. This is also a learning experience for the local bootstrapping/server management.

Shared learning experience for Adam Moore and George Hong. Other contributors may be accepted at a later date.

-----

**warning: learning experience - solutions may be very bad**

To Start we have package.json dependencies: express, mongoose, passport. 

Running 'npm install' should install these, and be ready to run on the server. 

Run the server with 'node server.js'.

The application is not usable on a public server yet. It resides only on the fornt end with local JSON dummy data. Once a user system is set up and the whole thing connects to a db on the back-end, it may be usable publicly. The goal is to keep intitialization steps in the code to a minimum. The optimal installation experience should be 4 steps:

**Installation**

1. Clone ng-wiki files

2. Install dependencies with npm via package.json:
	
	npm install

3. Set up a folder called 'data' for mongo to use, then this to start the mongo server:
	
	mongod --dbpath ''

4. If this is the first time running, create a db called ng-wiki on mongo, then proceed to step 5.

5. Navigate in terminal to the ng-wiki folder and run the server application on Node:
	
	node server.js

6. Navigate in browser to http://localhost:8080/ (or whateve rport you set in server.js)

-----

Features:

	-Main Template: 
	--Permenant Navigation to Home, Settings
	--Navigation based on Categories
	--Create new Categories on home page

	-Category Pages: 
	--List Pages in Category
	--Create New Pages in current Category

	-Generic Pages: 
	--Display Page Content
	--Build Digest Links
	--Edit Page
	--Add Sections
	--(Attach Files)

	-Settings Page:
	--Set Wiki Name
	--Set Wiki Tagline
	--Set Wiki Welcome Message
	--Set Wiki MOTD
	--set HomeHTML, if not set hoem page shows list of categories after MOTD

