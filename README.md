# Tech Stack
 # Front-End
- HTML
- CSS
- JavaScript
- React

# Back-End
- NodeJS
- Express
- MongoDB


# External CSS Library
-Chakra UI

#Front-End Deployment - vercel
#Back-End Deployment - Cyclic 

# Folder Structure and Packages
==>Before you start:
   - I have already created all the folders which you will need during journey.

   - Dont use any other folder to make files if you are doing please inform the
     team members that you have created a folder with name.

   - I have already setup all the things related to `redux`, `.env`, `Chakra UI` and `react-router-dom` 
     You guys have to just start developments.

   - Also given you sample `Navbar` and `Footer` components so that you get 
     comfortable about folder components export.

   - You will get all the routing files in `routes` folder.

   - You can also use context-api if needed.

   - All the end-points and base-url should be in env files.

   - Use `assets` folder for images,pdf,video..etc
   - Use `components` folder for making components either in folder or without folder 
     just be sure naming should not match with other folder/file to avoid collision
   - Use `pages` folder to create all the pages
   - Use `routes`  folder to all the routing related stuffs
   - Use `scripts` folder for any js script you wanna write.(this folder helps you to 
     keep jsx and js folder separate)
   - Use `styles` folder to keep your all css files.
   - Use `constants` folder to create all the constants (Helps you reducing hard-coding)(Most recommended)




   <!-- Cloning related and Getting started related stuffs -->
=> Clone the directory to start work `$git clone  https://github.com/faisalinfinity/cuddly-smoke-9747.git`

=> Ok guys here are the some basic instruction before you start , If you are here you are successfully pulled the code and you are ready to type you first command in terminal.

Step-1- Navigate to proeject directory using `$cd remarkable-veil-524`

Step-2- install node_modules using `$cd npm install`

- It will install some common dependencies:- <br />
    - `$npm install react-router-dom redux react-redux redux-thunk axios`<br />
    - `$npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`

<!-- Git related stuffs -->
=> Some basic requirements(Mandatory):
       1- You have to work in daily branches manner, so you have to create
          new branch everyday . So you have make branch using your student_code 
          followed the day in which you working. below is the eg for my branches.

               - branch-naming style: fw21_XXXX_day-x

            -for day-2 branch name should be: fw21_1117_day-2
            -for day-3 branch name should be: fw21_1117_day-3
            -for day-4 branch name should be: fw21_1117_day-4
            -for day-5 branch name should be: fw21_1117_day-5

        2- How to create branches:
            - $git branch <branch-name> (without angle brackets)

        3- How to switch branches:
            -$git switch <branch-name>  (without angle brackets)

        4- How to pull:
            -$git pull origin <branch-name>    (without angle brackets)


=> Some helpful Tools during development :<br />
    - Chakra-UI - https://chakra-ui.com/<br />
    - Chakra-Templets - https://chakra-templates.dev/#<br />
    - String Builder - https://codebeautify.org/string-builder<br />
    - Chat-gpt - https://chat.openai.com/chat<br />
    - Your-Team-members- https://chat.whatsapp.com/KR80RM0zbWi6agJVFL66Z9<br />

# DATABASE SCHEMAS

# endpoints:-

 # /user

```
|GET
`/user`-------> |POST
                |-----> `/user/register`  //for registering user

                   {
                        name:"Faisal",
                        email:"mujtabafaisal944.fkgmail.com",
                        password:"12234",
                        profile:(optional)
                    }
-------------------------------------------------------------------------------------------------------
                |POST
                |-----> `/user/login`

                   {
                       
                        email:"mujtabafaisal944.fkgmail.com",
                        password:"12234",
                       
                    }

-------------------------------------------------------------------------------------------------------

                |GET
                |---> `/user/admin` 

                  headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                    }

-------------------------------------------------------------------------------------------------------

```   

 -----------------------------------------------------------------------------------------------------

 # /product             

```
|GET/POST
`/product`---> |GET/PATCH/DELETE
                |-----------------> `/product/:id`

            |GET -----> /product?category=vitamins

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
            }

-------------------------------------------------------------------------------------------------------            

            |POST --> /product

                [{

                    image: { type: String, required: true },
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    price: { type: Number, required: true },
                    originalPrice: { type: Number, required: true },
                    sizes: { type: String, required: true },
                    category: { type: String ,required:true },
                    rating: { type: Number, required: true },
                    review: { type: Number, required: true },
                    flavour: { type: String, required: false },
                    brand: { type: String, required: true },
                    tags:{type: String},
                    stock:{type: Number, required: true},


                }]

                 headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                    }

-------------------------------------------------------------------------------------------------------

            |PATCH -----> /product/:id
                {
                    key:"value"
                }

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                }

------------------------------------------------------------------------------------------------------

            |DELETE -----> /product/:id

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                }

```
 # /cart

```
|GET/POST 
`/cart`-------> |PATCH/DELETE 
                |-------------> `/cart/:id`

            |GET -----> /cart

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
            }

-------------------------------------------------------------------------------------------------------            

            |POST --> /cart

                [{

                        adminId:{type: String, required: true},
                        quantity:{type:Number,required:true},(Add manually)
                        userId:{type:String,required:true},
                        pid:{type:String,required:true},
                        tags:{type: String},
                        stock:{type: Number, required: true},
                }]

                 headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                    }

-------------------------------------------------------------------------------------------------------

            |PATCH -----> /cart/:id
                {
                    key:"value"
                }

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                }

------------------------------------------------------------------------------------------------------

            |DELETE -----> /cart/:id

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                }



```

 # /order 
```
|GET/POST
`/order`-----> |PATCH
                |------> `/orders/:id`

            |GET -----> /order

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
            }

-------------------------------------------------------------------------------------------------------            

            |POST --> /order

               [{

                           
                           
                            quantity:{type:Number,required:true},
                            userId:{type:String,required:true},
                            status:{type:String,required:true},(Automatic)
                            address:{type:String,required:true},
                            orderDate:{type:String,required:true}, (Automatic)
                            pid:{type:String,required:true},
                            delivery:{ type: Number, required: true },
                            adminId:{type: String, required: true},
                            tags:{type: String},
                            stock:{type: Number, required: true},
                            totalDiscountPrice:{type:Number,required:true}


                }]

                 headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                    }

-------------------------------------------------------------------------------------------------------

            |PATCH -----> /order/:id
                {
                    key:"value"
                }

               headers:{

                    Authorization:`kjxbjbjxsjbxsbdbxbsaodboaodsbdoubdba`
                        
                }
            
```

|GET<br>
`/search`<br>

# Middlewares

Authencator--> verify user

# Querys:-
```
`/search?q=`<br>
`/products?`<size, title,price, category, brand> =<br>

```

# user keys

name <br>
email<br>
password<br>
role <br>  (Automatic)
# Product keys

image<br>
title<br>
description<br>             
price<br>
stock<br>
review<br>,
flavour<br>
rating<br>
originalPrice<br>
sizes<br>
category<br>
brand<br>
delivery<br>
adminId<br>
tags<br>

# user schema for Registering

name:{type:String,required:true},<br>
email:{type:String},<br>
password:{type:String},<br>
role:{type:String,required:true},<br> (Automatic)



 # Product Schema
                    _id:{type:String,required:true},<br>(Automatic)
                    image: { type: String, required: true },
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    price: { type: Number, required: true },
                    originalPrice: { type: Number, required: true },
                    sizes: { type: String, required: true },
                    category: { type: String ,required:true },
                    rating: { type: Number, required: true },
                    review: { type: Number, required: true },
                    flavour: { type: String, required: false },
                    brand: { type: String, required: true },
                    tags:{type: String},
                    stock:{type: Number, required: true},
                    adminId:{type: String, required: true},<br> (Automatic)
                




 # Cart Schema
                       _id:{type:String,required:true}, <br> (Automatic)
                        pid:{type:String,required:true},
                        quantity:{type:Number,required:true},(Add manually)
                        userId:{type:String,required:true},
                        tags:{type: String},
                        stock:{type: Number, required: true},




 # Order Schema 
                            _id:{type:String,required:true} <br> (Automatic)
                            quantity:{type:Number,required:true},
                            userId:{type:String,required:true},
                            status:{type:String,required:true},(Automatic)
                            address:{type:String,required:true},
                            orderDate:{type:String,required:true}, (Automatic)
                            pid:{type:String,required:true},
                            delivery:{ type: Number, required: true },
                            adminId:{type: String, required: true},
                            tags:{type: String},
                            stock:{type: Number, required: true},
                            totalDiscountPrice:{type:Number,required:true}



  #API

for register: Make a Post request to {Base_URL}/register   
   with  {name:,
    email:,
    password:,
    gender:,
    role:user/admin,
    profile:}  as body

for Login :   Make a Post request to {Base_URL}/Login 
 with {email,password} as body   



 for getting product  : Make a Post request to {Base_URL}/product?category={Food,Nutrients,Ayurveda,Vitmains}             
