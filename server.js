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

const getAllUsers = () => {
    db.many(`
    SELECT * FROM users;
    `)
    .then((users)=>{
        users.forEach((user)=>{
            console.log(user.id +' ' + user.name + ' : ' + user.email);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}



// 1. Create
const createNewUser = (name, email)=>{
    const info = {userName: name, userEmail: email};
    const q = "INSERT INTO users VALUES (DEFAULT, ${userName}, ${userEmail})"
    db.none(q, info)
    .then(()=>{
        console.log('Added');
    })
    .catch(e=>{
        console.error(e);
    })
}

// createNewUser('Pete', 'Loo@yahoo.com');
// getAllUsers();


// 2. Read
    //  2.1 Get all users
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

// getSpecificUsersPosts(5);

    // 2.4 getAllComments
const getAllComments = () => {
    db.many(`
    SELECT * FROM comments;
    `)
    .then(comments =>{
        comments.forEach(comment=>{
            console.log(`${comment.comment} : ${comment.created_at}`);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}
// getAllComments();

    // 2.5 getAllCommentsByUserId
const getCommentsBySpecificId = (specId) => {
    db.many(`
        SELECT * FROM comments
            WHERE user_id = $1;
    `, specId)
    .then(comments =>{
        const user = getUserById(specId);
        user.then(theUser=>{
            comments.forEach(comment=>{
                console.log(`${comment.comment} -> ${theUser.name}`)
            })
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}
// getCommentsBySpecificId(1);

    // 2.6 getAllCommentsWithUser
const getAllCommentsWithUser = () =>{
    db.many(`
        SELECT * FROM comments
            INNER JOIN users
            ON users.id = comments.user_id
            INNER JOIN posts
            ON posts.id = comments.post_id;
    `)
    .then(comments=>{
        comments.forEach(comment =>{
            console.log(`${comment.comment} -->On Post--> ${comment.url} -->Was Said By--> ${comment.name}`);
        });
    })
    .catch((e)=>{
        console.log(e);
    })
}
// getAllCommentsWithUser();

    // 2.7 getPostsWithLikes

const getUsernamesOfPeopleWhoLikedPost = postId =>{
    return db.many(`
        SELECT post_id, name FROM likes
            INNER JOIN users
            ON likes.user_id = users.id
                WHERE post_id = $1;
    `, postId)
    .then(names=>{
        return names;
    })
    .catch((e)=>{
        console.log(e);
    })
}

const getPostsWithLikes = () =>{
    db.many(`
    SELECT count(*) as num_likes, url, post_id FROM likes
        INNER JOIN posts
        ON likes.post_id = posts.id
            GROUP BY url, post_id
            ORDER BY num_likes DESC;
    `)
    .then(comments=>{
        comments.forEach(comment=>{
            const names = getUsernamesOfPeopleWhoLikedPost(comment.post_id);
            names.then((nameList)=>{
                const name = nameList.map(element=>{
                    return element.name;
                })
                name.join('');
                console.log(`\nPost: ${comment.url} has ${comment.num_likes} likes`);
                console.log(`It was liked by ${name}\n`)
            })
        });
    })
    .catch((e)=>{
        console.log(e);
    })
}
// getPostsWithLikes();

// 3. Update
    //3.1 Update a specific users name
const updateSpecificUsersName = (userId, newName)=>{
    const info = {id: userId, name: newName};
    const q = "UPDATE users SET name = ${name} WHERE id = ${id}";
    db.none(q, info)
    .then((r)=>{
        console.log('Updated');
    })
    .catch(e=>{
        console.log(e);
    })
}

updateSpecificUsersName(6, 'David');
getAllUsers();

// 4. Delete




//Its okay to leave this out for an express app, BUT
// for our command line app, we want this in here so we can
// get our terminal back.
// pgp.end(); 