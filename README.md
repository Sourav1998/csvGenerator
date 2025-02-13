# csvgenerator
An Express.js route that integrates data from three different API endpoints, extracts specific key values from their responses, writes these values into a CSV file, and returns the path to the generated CSV file

After downloading the repo into your local. Kindly install below packages.

**npm install express axios json2csv**

Also you can install nodemon to avoid manually stoping and restarting your server every time you modify your code. Nodemon will help in automatically restart your Node.js server whenever you make changes.

**npm install -g nodemon**

After doing above just hit below command to start the server(You should be inside the repo directory).

When nodemon is not installed in your system :- **node csvgenerator.js**

When nodemon is installed in your system :- **nodemon csvgenerator.js**

After hitting the above command just copy,paste and hit the below URL in your browser.

**http://localhost:8080/generate-csv**
