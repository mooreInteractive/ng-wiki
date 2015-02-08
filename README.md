# ng-wiki
Wiki software built with AngularJS. Chiefly a learning experience. The intial setup may be a little shakey. This is also a learning experience for the local bootstrapping/server management.

Shared learning experience for Adam Moore and George Hong. Other contributors may be accepted at a later date.

-----

For now a lot of the files are just bootstrapping. The angular code mostly resides in 'public/js/main.js'. We will be working toward a more industry-standard project structure.

**warning: learning experience - solutions may be very bad**

To Start we have package.json dependencies: express, mongoose, passport. 

Running 'npm install' should install these, and be ready to run on the server. 

Run the server with 'node server.js'.

The application is not usable on a public server yet. It resides only on the fornt end with local JSON dummy data. Once a user system is set up and the whole thing connects to a db on the back-end, it may be usable publicly. The goal is to keep intitialization steps in the code to a minimum. The optimal installation experience should be 4 steps:

**Installation**

	-Copy ng-wiki files to node server.
	-Npm Install via package.json
	-Run the server application.
	-Navigate to page in browser for one-time wiki setup.


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
	--Display Title, Author(dummy::amoore), Body(HTML)
	--Edit Page(Edit, Clear, Delete)
	-*next: other pages in category

	-Settings Page:
	--Set Wiki Name
	--Set Wiki Tagline
	--Set Wiki Welcome Message
	--Set Wiki MOTD
	--set HomeHTML, if not set hoem page shows list of categories after MOTD

Problem Areas:

	-When pressing a cancel or save button, the new button doesn't work a second time unless navigating to a different page and back.
	
	-wiki settings like wiki title and tagline change in real time when updating the form without the need to press save. That doesn't seem appropriate. 

