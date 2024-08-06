#AWS Powered Backend

AWS Services used for the backend for this project:
1. SNS
2. API Gateway
3. Lambda Functions with Node.js
4. RDS with MySQL

The website front end was designed using React.js along with other dependencies such as axios for API Request to the API Gateway. React-icons was used for the icons.

Access the project by visiting this link:
oscargomez15.github.io/aws-library-app/

Watch a quick demo by visiting this link:
https://www.linkedin.com/posts/oscargomez1998_aws-frontenddevelopment-react-activity-7220650039222644736-Y6K5?utm_source=share&utm_medium=member_desktop

In this app you can View all the Books, Find a book, add, delete and update a desired book.

> To find a book the only thing we need is the identifier, you can fetch all books and get an identifier from there.

> To Add a Book we only need he Book Name and the author. The Identifier will be automatically assigned by MySQL. This field has been set to AutoIncrement.

>To delete a book, same as finding a book, we need the identifier of the book which can be found by fetching all the books on the "All books" tab and choosing the identifier.

>To Update a book we would need the Identifier, Book Name to change it to and the Author to change it to.

In this project you can find a folder named "diagram" in which you can find a diagram showing how AWS services are making the magic behind the scenes.
