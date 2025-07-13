1. create all folders and files that are required
-  folders - public , src 
-  files - .env , .gitignore, package.json(git init) ,  package-lock.json , prittier , .prittierignore, constants.js(store constants) ,index.js(project initialize file ) ,app.js
- in src - middlewares , DB , controllers , modules ,routes, utils
--------------------------------------------------------------------------
 step 1- connect DB in project initialize file (index.js)  --  2 ways to connect DB (1. in index file ,2 in DB file and import in index file); 

  --- connection is established by (try catch) or (promisses) method ;
 
 NPM packages - mongoose  ,  dotenv 
--------------------------------------------------------------------------
 step 2- 
 - create app from express (helps to listen project on port , also to handle DB data by app.get , app.post) ;
 - makes utillis files 
          create a app.use like functions to handle the request data from the user 
 NPM packages ->  1.coockie-parser - to manage coockies
                  2.cors - helps to cros origin share (data only share by same ports or same domain, with the help of proxy we can manage but for big production we use "cors" package);
                           "app.use(cors())" it is mostly used when we have to do middleware and configuration settings ;
        