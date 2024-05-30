## SETUP

1. use node version v14.19
2. create config.json file
    ```
    {
        "SERVER_PORT": 8000,
        "ENV": "dev",
        "INTERNAL_API_KEY": "xyzabc"
    }
    ```

## RUNNING THE PROJECT

```
1. npm run install (install the dependencies)
2. npm run start (start project)
```

## PRETTIFY CODE

```
1. npm run format
```

## FOLDER STRUCTURE

-   routes
    -   route category
        -   routes (contain all the routes for the category)
        -   service (contain functions which serves the route)
        -   validation-schema (contain validation schemas for the routes)
        -   validation (contain validator functions)
-   controller
    -   handlers
        -   handler (contains handlers for the services)
-   test
    -   api category
        -   test case
