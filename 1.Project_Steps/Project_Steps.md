1. create all folders and files that are required
-  folders - public , src 
-  files - .env , .gitignore, package.json(git init) ,  package-lock.json , prittier , .prittierignore, constants.js(store constants) ,index.js(project initialize file ) ,app.js
- in src - middlewares , DB , controllers , modules ,routes, utils
--------------------------------------------------------------------------
 step 1- connect DB in project initialize file (index.js)  --  2 ways to connect DB (1. in index file ,2 in DB file and import in index file); 

  --- connection is established by (try catch) or (promisses) method ;
 
 NPM packages - mongoose  ,  dotenv 
--------------------------------------------------------------------------
 step 2-   APP files handle
 - create app from express (helps to listen project on port , also to handle DB data by app.get , app.post) ;
 - makes utillis files 
          create a app.use like functions to handle the request data from the user 
 NPM packages ->  1.coockie-parser - to manage coockies
                  2.cors - helps to cros origin share (data only share by same ports or same domain, with the help of proxy we can manage but for big production we use "cors" package);
                           "app.use(cors())" it is mostly used when we have to do middleware and configuration settings ;
--------------------------------------------------------------------------
step 3- Creating models  
 - build required models
 - make aggregation pipelines 
 - add pipelines and also own plugins ex. (videoSchema.plugin (mongooseAggregatePaginate))
 - use JWT and bcrypt library for generate web token and encrypt and decrypt password respectively
 - adding user defined methods to add different functionality on user data ex.checking password corrected or not and more things

 NPM packages ->  1. mongoose-aggregate-paginate-v2
                  2. bcrypt or bcryptjs  // increapt decreapt password
                  3. JWT  // used to create tokens 
