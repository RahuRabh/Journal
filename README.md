# Journal
Journal - Make your own Diary
It’s a Journaling Web Application which implements EJS templating where one can performs CRUD operations through RESTful API’s and add new journal post. The posts are stored in a MongoDB Atlas database.
Bootstrap v4.3 is also used, along with some custom CSS styling.

## To run the app:
`Prerequisites`

In order to run this application locally you'll need to have Node.js installed in your system, as well as MongoDB.
Running the app locally

Once you clone or download the repository files to your desired location, open a command-line terminal, navigate into the app top-level directory, and install the required package dependencies.

` $ cd Journal  # or your chosen other directory name `
` $ npm install             # install package dependencies `

Then open two command-line terminals, one to run the mongosh process and the other to run the app:

# CLI tab 1 (For rendering the MongoDB database locally)
$ mongosh

Finally, start the app by running the 'app.js' file:
# CLI tab 2
$ node app.js   # or 'nodemon app.js', etc

and type "http://localhost:3000" in your browser's address to see the application running.

This site was developed by following along [The Complete 2023 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) Udemy course by Angela Yu
