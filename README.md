# Hi ! this is the CASHYS backend :D :)

<h3 color="#fff" align="center">A complete backend service for the cashys app </h3>

 <br/>

The project has been done with _Node js_, _Express js_, _mysql_ , _sequelize_ & _HEROKU_ for storage and _Clever Cloud_ to storage the DB

**The main idea of this project was to create an API and a full backend service , to deal with all necessary things to keep on track a money balance and their incomes and debts.**

Besides this, an _auth service_ is done to cope with authentication and being able do a **CRUD for operations, balances and categories by an specific user**</p>

For authentication i used **JWT**, to deal with the server i used **express js** , to handle the DB storage **clever cloud** and to storage ther rest-server the well known **Heroku**

<p>Finally I worked with the ORM Sequelize to deal with the DB petitions</p>

  <br/>

**To start with this project in local :**

_First step :_

- Copy and paste the following code on your Command Prompt :

```
 https://github.com/dijevic/Cashys.git
```

_Second step :_

- Navigate to the folder.

```
 cd Cashys
```

- Open the folder on your favorite IDE

```
 code .

```

_install all the dependencies :_

```
 npm install
```

_Run the code :_

- To be able to run the code without DB problems, please first create a Mysql or Maria DB database in your local computer with the name : **cashy** , password: **null** and user: **root**

- Once you have setted up your database run in your command Prompt the next code :

```
npm run dev
```

There you go, you should see some logs in your Command Prompt about connection

If you want , you can visit the online project already working :
[Go to cashys](https://cashys.netlify.app/)
