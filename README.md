# E-commerce Website

### • Deploy:

This project was deploy here:

`1` Admin website: [https://e-commerce-admin-dangtrantien.vercel.app](https://e-commerce-admin-dangtrantien.vercel.app)

`2` Client website: [https://e-commerce-client-dangtrantien.vercel.app](https://e-commerce-client-dangtrantien.vercel.app)

### • Description:

This project has two website, one for client and one for admin.

`1` Admin website is a platform that helps store owner efficiently organize and track their products. It provides features such as products and client management, sales revenue. Users can create products, add client information, and monitor product status.

`2` Client website helps users buy things they want with good price. It provides features such as picture, fuction and price of the product, accessories included. Users can search for the product they want to buy, and chat online with the owner, also they can pay by cash or by credit card.

### • Tech stacks:

Front-end: react, react-router-dom, react-redux, bootstrap, react-bootstrap, socket.io-client.

Back-end: express, mongoose, express-session, jsonwebtoken, multer, nodemailer, socket.io.

### • How to install and start this project (dev. version):

`1` Clone this repositories to your computer.

`2` Open VS Code -> Open folder where you stored.

`3` Open Terminal -> Run

```
cd server
```

`4` Install node_module

```
npm install
```

`5` Start server

```
npm start
```

`6` Open new Terminal or split Terminal -> Run

```
cd client
```

`7` Install node_module

```
npm install
```

`8` Start client

```
npm start
```

`9` Open new Terminal or split Terminal again -> Run

```
cd admin
```

`10` Install node_module

```
npm install
```

`11` Start admin

```
npm start
```

### • Overview functions of the project:

`1` Authentication: form validation, notification on top of screen.

`2` Real-time: chat online between client and admin (use socket.io library).

`3` Admin website: implement CRUD functions, form validation.

`4` Client website:

- Show infomation of products by category (picture, fuction, price,...), add products to cart.
- Show history of order.

`5` Back-end: response requests, return data to front-end, send email to user (use nodemailer library).
