<h1 align="center">Hi ! this is the CASHYS backend 😎 </h1>

<h3 color="#fff" align="center">A complete backend service for the cashys app </h3>

 <br/>

The project has been done with _Node js_, _Express js_, _mysql_ , _sequelize_ & _HEROKU_ for storage and _Clever Cloud_ to storage the DB

**The main idea of this project was to create an API and a full backend service , to deal with all necessary things to keep on track a money balance and their incomes and debts.**

Besides this, an _auth service_ is done to cope with authentication and being able do a **CRUD for operations, balances and categories by an specific user**</p>

For authentication i used **JWT**, to deal with the server i used **express js** , to handle the DB storage **clever cloud** and to storage ther rest-server the well known **Heroku**

Finally I worked with the ORM **Sequelize** to deal with the DB petitions

  <br/>

**to see the API documentation :**
[Cashys documentation](https://documenter.getpostman.com/view/12181072/UVyswbFu)

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

_Create a **.ENV** file:_

- You should create the following env vars:

```
PORT=4000
PRIVATESECRETJWTKEY=dummypassword
EMAILUSER=dummyemailuser
EMAILTRANSPORTERKEY=dummyemailkey
```

NOTE : **EMAILUSER** and **EMAILTRANSPORTERKEY** env vars are useful for using the auth functions(like create an user or recover a password ) , basically youll need to know how to setup nodemailer with google(because i am using gmail for sending the emails)

<br/>
<br/>

_Run the code :_

- To be able to run the code without DB problems, please first create a Mysql or Maria DB database in your local computer with the name : **cashy** , password: **null** and user: **root**

NOTE : the params _name_,_password_,_user_ are not mandatory with these names but the development mode has been setted up with these name, if you want to change it just go to the db config file and change the respectives names

<br/>
<br/>

- Once you have setted up your database run in your command Prompt the next code :

```
npm run dev
```

There you go, you should see some logs in your Command Prompt about connection.

If you want , you can visit the alive project already working :
[Go to cashys](https://cashys.netlify.app/)
