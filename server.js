const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')();
const db = pgp(config);


// DEMO QUERY FROM LECTURE
// db.query(`
//     SELECT * FROM users;
// `)
// .then((results)=>{
//     results.forEach((user)=>{
//         console.log(`${user.name} : ${user.email}`);
//     })
// })
// .catch((e)=>{
//     console.log('Oh no');
//     console.log(e);
// })



// 1. Create



// 2. Read
//  2.1 Get all users
const getAllUsers = () => {
    db.many(`
    SELECT * FROM users;
    `)
    .then((users)=>{
        users.forEach((user)=>{
            console.log(user.name + ' : ' + user.email);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}
// getAllUsers();

// 2.2 Get all posts
const getAllPosts = () => {
    db.many(`
        SELECT * FROM posts;
    `)
    .then((posts)=>{
        posts.forEach((post)=>{
            console.log(`${post.url} : ${post.user_id}`);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}

//getAllPosts();

// 2.3 Get all posts from a specific user
const getBySpecificUser = specId => {
    db.many(`
        SELECT * FROM posts
            WHERE user_id = $1;
    `, specId)
    .then((posts)=>{
        posts.forEach((post)=>{
            console.log(`${post.url} : ${post.user_id}`);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}

getBySpecificUser(5);

// 3. Update



// 4. Delete




//Its okay to leave this out for an express app, BUT
// for our command line app, we want this in here so we can
// get our terminal back.
pgp.end(); 