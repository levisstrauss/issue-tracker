-------------------- Issues tracker app --------------------

      This is a simple app to track issues in a project. 
      It is a simple CRUD app with a REST API.
 
     - Building the navigation bar
       react-icons.github.io/react-icons
       npm i react-icons@4.11.0
       npm i classnames@2.3.2

     ---- Setting up prisma ----
     npm i prisma@5.3.1
     npx prisma init
     this create tow things the prisma folder and the .env file
     set up database to postgresql or mysql in schema.prisma

     ---- Modeling ----
     create the db model in schema.prisma
     npx prisma format // to format the schema.prisma
     npx prisma migrate dev --name init // to create the migration
     give the name tothe migration

     ----- Create API ----
     validate the model with zod
     npm i zod@3.22.2
     use prismas client to create the CRUD operations cpy the code
     on the website and put it inside prisma folder client.ts
     - use it in the api to perform the crud operations


