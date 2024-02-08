
## Backend:

### Tech Stack:
- Node, Express, MongoDB
- Cloudinary (for storing and managing media files)

### Create the following models:
- 1)User Model
id (unique identifier)
username (string, 3-30 characters)
email (string, valid email format)
password (string)
avatar (string, URL)
created_at (timestamp, automatically set when user is created)
updated_at (timestamp, automatically updated when user profile is updated)

- 2)Post Model
id (unique identifier)
user_id (reference to User)
title (string, max 100 characters)
category (enum, ['Development', 'Design', 'Innovation', 'Tutorial', 'Bussiness'])
content (string)
media (array of strings, URLs of images/videos)
likes (array of user_ids who liked the post)
comments (array of objects containing comment details)
created_at (timestamp, automatically set when post is created)

### Implement the following API endpoints:

```
POST : 

/api/register
Allows users to register with username, email, and password.
201

```
http://localhost:4000/api/register/

{"username":"user1",
        "email":"user1@gmail.com",
        "password":"user1@one",
        "avatar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNphLvPzUU-hNqLT-TGqlDiW13F6_NQ52JxLGRquJTA&s"}
		
		output:
		
		{"msg":"The new user has been registered","registeredUser":{
		"username":"user1",
		"email":"user1@gmail.com",
		"password":"$2b$05$SCtajewcGVRrwDQ0/n7hNu5CfXPo4ICGkwPHkZ52C9/R0jh/NPjC2",
		"avatar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNphLvPzUU-hNqLT-TGqlDiW13F6_NQ52JxLGRquJTA&s",
		"created_at":"2024-02-08T17:43:15.230Z","updated_at":"2024-02-08T17:43:15.231Z",
		"_id":"65c512b32f6ac022615f7a70"}}
```

/api/login
Allows users to log in with email and password.
200
```
http://localhost:4000/api/login

{
        "email":"user4@gmail.com",
        "password":"user4@four"

       }

       output:

       {
    "msg": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWM1MTM5MzQ3Y2Y4M2M0NzA3NGQzY2QiLCJpYXQiOjE3MDc0MTQ1MTN9._VtfihTawRD9ObpBiYr3y2LPuEqXqmZqinLLyk24sG0",
    "expiredIn": "7 days"
}

```

/auth/google
This endpoint should allow user to login using google OAuth providers
201
```

```

/api/posts
Allows users to create a new post with title, content, and media. (Requires Authentication)
201
```

http://localhost:4000/api/posts
Authorization
Bearer eyJ1c2VySUQiOiI2NTljZWEwYzQyOTM2NzQzMDVmYmFmZjgiLCJ1c2VybmFtZSI6InVzZXIyMiIsImlhdCI6MTcwNDc4MjUxNH0.ViiFcHjy1OVkJwlaH7F75StYpS91OYaARkF3KqSBM00

//body:
		{
   "title":"Masai logo",
    "category":"Design",
    "content": "logo of Masai",
    "media":["https://i.ibb.co/wQd3ZGp/masai.png"]
}
output:
{
    "msg": "A new post has been Created",
    "post": {
        "userID": "65c5139347cf83c47074d3cd",
        "title": "Masai logo",
        "category": "Design",
        "content": "logo of Masai",
        "media": [
            "https://i.ibb.co/wQd3ZGp/masai.png"
        ],
        "likes": [],
        "_id": "65c51bc879fe77cabddbc659",
        "comments": [],
        "created_at": "2024-02-08T18:22:00.923Z"
    }
}



{
   "title":"download logo",
    "category":"Design",
    "content": "logo of doownload",
    "media":["https://i.ibb.co/QYBHQvS/preview.png","https://i.ibb.co/vq7CgKR/download.png"]
}


{
    "msg": "A new post has been Created",
    "post": {
        "userID": "65c5139347cf83c47074d3cd",
        "title": "download logo",
        "category": "Design",
        "content": "logo of doownload",
        "media": [
            "https://i.ibb.co/QYBHQvS/preview.png",
            "https://i.ibb.co/vq7CgKR/download.png"
        ],
        "likes": [],
        "_id": "65c51d6e79fe77cabddbc65d",
        "comments": [],
        "created_at": "2024-02-08T18:29:02.824Z"
    }
}
```


/api/posts/:post_id/like
Allows users to like a post.(Requires Authentication)
201
```

```

/api/posts/:post_id/comment
Allows users to comment on a post. (Requires Authentication)
201
```

```


GET:

/api/posts
Retrieves all the posts published by all the users.
200
```
http://localhost:4000/api/posts
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWM1MTM5MzQ3Y2Y4M2M0NzA3NGQzY2QiLCJpYXQiOjE3MDc0MTQ1MTN9._VtfihTawRD9ObpBiYr3y2LPuEqXqmZqinLLyk24sG0

output:
[
    {
        "_id": "65c51bc879fe77cabddbc659",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "Masai logo",
        "category": "Design",
        "content": "logo of Masai",
        "media": [
            "https://i.ibb.co/wQd3ZGp/masai.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:22:00.923Z"
    },
    {
        "_id": "65c51ce279fe77cabddbc65b",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "Icre logo",
        "category": "Design",
        "content": "logo of ICer AI",
        "media": [
            "https://i.ibb.co/ZX7hLZX/Iogo.png",
            "https://i.ibb.co/dKV8MDY/Iogo.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:26:42.797Z"
    },
    {
        "_id": "65c51d6e79fe77cabddbc65d",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "download logo",
        "category": "Design",
        "content": "logo of doownload",
        "media": [
            "https://i.ibb.co/QYBHQvS/preview.png",
            "https://i.ibb.co/vq7CgKR/download.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:29:02.824Z"
    }
]
```


/api/posts?page=1&limit=5
Retrieves posts by pagination
200
```

[
    {
        "_id": "65c51bc879fe77cabddbc659",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "Masai logo",
        "category": "Design",
        "content": "logo of Masai",
        "media": [
            "https://i.ibb.co/wQd3ZGp/masai.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:22:00.923Z"
    },
    {
        "_id": "65c51ce279fe77cabddbc65b",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "Icre logo",
        "category": "Design",
        "content": "logo of ICer AI",
        "media": [
            "https://i.ibb.co/ZX7hLZX/Iogo.png",
            "https://i.ibb.co/dKV8MDY/Iogo.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:26:42.797Z"
    },
    {
        "_id": "65c51d6e79fe77cabddbc65d",
        "userID": "65c5139347cf83c47074d3cd",
        "title": "download logo",
        "category": "Design",
        "content": "logo of doownload",
        "media": [
            "https://i.ibb.co/QYBHQvS/preview.png",
            "https://i.ibb.co/vq7CgKR/download.png"
        ],
        "likes": [],
        "comments": [],
        "created_at": "2024-02-08T18:29:02.824Z"
    }
]
```


/api/posts?category=design
This endpoint should give only those blogs whose category is design.
200

```

```

/api/posts?title=”Post Title”
This endpoint should allow users to search for blogs using their title.
200

```



```


PUT/PATCH:

/api/posts/:post_id
This endpoint should allow the user to edit the contents of a post. (Requires Authorization)
204

```
http://localhost:4000/api/posts/:post_id
{
 "title": " doownload"

}

{
    "msg": "post with Id:65c51d6e79fe77cabddbc65d has been updated"
}

```

DELETE: 
/api/posts/:post_id
This endpoint should allow the user to delete a post. (Requires Authorization)
202

```
http://localhost:4000/api/posts/:post_id


{
    "msg": "post with Id:65c5256725d3191032f749ba has been deleted"
}

```


Implemented basic validation on input data
Implemented proper error handling middleware's
Implemented authentication and authorization middleware's for protected routes.