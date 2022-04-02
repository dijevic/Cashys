# Hi ! this is the CASHYS backend :D :)

<h3 color="#fff" align="center">A complete backend service for the cashys app </h3>

 <br/>

<p>The project has been done with Node js, Express js, mysql , sequelize  & HEROKU for storage and Clever Cloud to storage the DB </p>

<p>The main idea of this project was to create an API and a full backend service ,  to deal with  all necessary things  to keep on track a money balance and their incomes and debts.  </p>

<p>Besides this, an auth service is done to cope  with authentication and being able do a CRUD for operations, balances and categories by an specific user</p>

<p>For authentication i used JWT, to deal with the server i used express js , to handle the DB storage  clever cloud and to storage ther rest-server the well known Heroku</p>

<p>Finally I worked with the ORM Sequelize to deal with the DB petitions</p>

  <br/>

<p margin="20px"><b>To start with this project in local :</b></p>

<p align="center">First step :</p>

- Copy and paste the following code on your Command Prompt :

```
 https://github.com/dijevic/Cashys.git
```

<p align="center">Second step </p>

- Navigate to the folder.

```
 cd Cashys
```

- Open the folder on your favorite IDE

```
 code .

```

<p align="center">install all the dependencies</p>

```
 npm install
```

<p align="center">Run the code</p>

- To be able to run the code without DB problems, please first create a Mysql or Maria DB database in your local computer with the name : **cashy** , password: **null** and user: **root**

- Once you have setted up your database run in your command Prompt the next code :

```
npm run dev
```

<p>There you go, you should see some logs in your Command Prompt about connection </p>

<p>If you want , you can visit the online project already working : </p>

<a href="https://cashys.netlify.app/" target="_blank">GO TO CASHYS</a>
