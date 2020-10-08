
const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')();
const db = pgp(config);

db.query(`
    SELECT * FROM users;
`)
.then((results)=>{
    results.forEach((user)=>{
        console.log(user.name);
    })
})
.catch((e)=>{
    console.log('Oh no');
})