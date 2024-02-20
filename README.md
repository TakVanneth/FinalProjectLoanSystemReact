# FinalProjectLoanSystemReact

### Installation Instructions

1. Clone the Repository :
- Clone the repository using the following command in your terminal:
# command code : git clone https://github.com/TakVanneth/FinalProjectLoanSystemReact.git

2. Navigate to Project Directory:
- Open your terminal, go to the cloned folder directory:
# command code : cd FinalProjectLoanSystemReact

3. Install Dependencies :
- Make sure you have NodeJS installed. If not, download it here (https://nodejs.org/en/download/). Install dependencies using:
- Install all dependencies by running this command in your terminal:
# command code : npm install

### Setting up the Database

1. Import SQL File :
- import sql file from "db" folder into phpmyadmin or any mysql database management tool that you prefer.

### Setting up the REST API

1. Move API Folder :
- Move folder api to htdocs (xampp) / htdocs (mamp) / www(wamp)/ or other server document root folder.

2. Update Database Connection :
- Modify the connection details in "api/DbConnect.php" (lines 6 to 9) with your database information.

3. Start your web server
- Run your preferred web server software (e.g., Apache, nginx, etc.) and start serving the application. Ensure that your web server is configured to point to the project's directory or document root.

### Connecting React to API

1. Open the project folder, find "vite.config.js," and modify the following code:
- define: {
    BASE_API_URL: '"http://localhost:8888/api/"',
  },

2. Change it to 
- define: {
    BASE_API_URL: '"your-path-url-api"', // Replace your path URL here.
  },

### Run the Application!
- To start the application, ensure that you are in the project folder, and then run the following command in your terminal:
# command code : npm run dev

### Login System 
- Manager :
    - email : vannethtak03@gmail.com
    - password : vannethtak03@gmail.com

- Admin :
    - email : admin@example.com 
    - password : admin@example.com

- User : 
    - email : user@example.com
    - password : user@example.com