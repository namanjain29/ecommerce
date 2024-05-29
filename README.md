# RUNNING THE PROJECT
1. use node version v14.19
2. npm run install  (install the dependencies)
3. npm run start (start project)

# PRETTIFY CODE
1. npm run format

# FOLDER STRUCTURE
- routes
    - route category
        - routes (contains all the routes for the category)
        - service (contain functions which serves the route)
        - validation-schema (contain validation schemas for the routes)
        - validation (contain validator function)
- controller
    - handlers
        - handler (contains handlers for the services)

