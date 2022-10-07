const bcrypt = require("bcrypt");

const saltRounds = 10;
const password = "softsuave";
const anotherPerson = "123456a"

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        bcrypt.compare(password, hash, (err, result) => {
            console.log(result)
        })
    })
})