# ng-wiki
Wiki software built with AngularJS. Chiefly a learning experience. Installed Node and Express Manually. There is only a very simple server routing to 'public/index.html'. The main focus is Angular on the fornt-end, and will not focus on other related tools such as Bower, Node Modules, HTML/CSS pre-processors(JADE, SASS).

Shared learning experience for Adam Moore and George Hong. Other contributors may be accepted at a later date.

-----

For now a lot of the files are just bootstrapping. The angular code mostly resides in 'public/js/main.js'. We will be working toward a more industry-standard project structure.

The application is not usable on a public server yet. It resides only on the fornt end with local JS dummy data. Once a user system is set up and the whole thing connects to a db on the back-end, it may be usable publicly. The goal is to keep intitialization steps in the code to a minimum. To Copy the files onto a server, and start the server, then navigate to the index page to begin one-time setup should be the optimal experience. 

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

