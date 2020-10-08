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

    // 2.3 Get all posts from a specific user and print their name
        // 1st way using SQL
// const getSpecificUsersPosts = specId => {
//     db.many(`
//     SELECT posts.id, url, name FROM posts
//         INNER JOIN users
//         ON users.id = posts.user_id
//         WHERE user_id = $1;
//     `, specId)
//     .then(posts => {
//         posts.forEach(post => {
//             console.log(`${post.url} : ${post.name}`);
//         })
//     })
//     .catch((e)=>{
//         console.log(e);
//     })
// }


        // 2nd way using JS promises
const getUserById = userId =>{
        return db.one(`
        SELECT * FROM users
            WHERE id = $1;
        `, userId)
        .then(user=>{
            return user;
        })
        .catch(e => {
            console.log(e);
        })
}

const getSpecificUsersPosts = specId => {

    
    db.many(`
    SELECT * FROM posts
    WHERE user_id = $1;
    `, specId)
    .then(posts => {
        posts.forEach(post => {
            const user = getUserById(specId);
                user.then(theUser => {
                    console.log(`${theUser.name} : ${post.url}`);
                })
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}

getSpecificUsersPosts(5);

// 3. Update



// 4. Delete




//Its okay to leave this out for an express app, BUT
// for our command line app, we want this in here so we can
// get our terminal back.
// pgp.end(); 