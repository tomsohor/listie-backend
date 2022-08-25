module.exports = {
  "swagger": "2.0",
    "info": {
      "title": "Listie",
      "version": "1.0.0",
      "description": "Listie api documentation"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "paths": {
      "/logout": {
        "post": {
          "description": "logout from system",
          "tags":['Logout'],
          "produces": ["application/json"],
          "responses": {
            "200": {
                  "description": "logout successfully"
                }
          }
        }
      },
      "/register": {
        "get": {
          "description": "get Register page",
          "tags":['Register'],
          "produces": ["application/json"],
          // "responses": {
          //   "200": {
          //     "description": "get Register page"
          //   }
          // }
        },
        "post":{
          "description": "Add new user",
          "tags":['Register'],
          "produces": ["application/json"],
          "parameters": [
            {
              "$ref":"#/parameters/email"
             },
            {
              "$ref": "#/parameters/username"
            }
           ,{
             "$ref":"#/parameters/password"
           }
           
          ],
        }
      },
      "/login": {
        "get":{
          "description": "Login to the application",
          "tags": ["Login"],
          "produces": ["application/json"],
          "response":{}
        },
        "post": {
          "description": "Login to the application",
          "tags": ["Login"],
          "produces": ["application/json"],
          "parameters": [
            {
              "$ref": "#/parameters/username"
            }
           ,{
             "$ref":"#/parameters/password"
           }
          ],
          "responses": {
            "200": {
              "description": "login",
              "schema": {
                "type": "object",
                "$ref": "#/definitions/Login"
              }
            }
          }
        }
      },
      "/": {
        "get": {
          "description": "Returns the homepage",
          "tags":['Homepage'],
          "responses": {}
        }
      },
      
    },
    "definitions": {
      "Login": {
        "required": ["username", "password"],
        "properties": {
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
        }
      },
      "Register":{
        "required":["email","username","password"],
        "properties":{
          "email":{
            "type":"string",
          },
          "username":{
            "type":"string",
          },
          "password":{
            "type":"string",
          }
        }
      }
    },
    "responses": {},
    "parameters": {
      "username": {
        "name": "username",
        "description": "Enter Username",
        "in": "formData",
        "required": true,
        "type": "string"
      },
      "password":{
        "name": "password",
        "description": "Enter password.",
        "in": "formData",
        "required": true,
        "type": "string"
      },
      "email":{
        "name": "email",
        "description": "Enter email",
        "in": "formData",
        "required": true,
        "type": "string"
      }
    },
    "securityDefinitions": {},
    "tags": [
      {
        "name": "Login",
        "description": "Login"
      },
      {
        "name": "Logout",
        "description": "Logout from system"
      },
      {
        "name":"Register",
        "description":"Register Page"
      }
      ,
      {
        "name":"Homepage",
        "description": "Homepage"
      }
    ]
  }