const db = require('../util/database');

module.exports = class Admin {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static save(data) {
        return db.query(
            'INSERT INTO admin (name, email, password, isDeleted) VALUES (?, ?, ?, ?)', [data.name, data.email, data.password, 0]
        );
    }

    static async find(email) {
        // return new Promise((resolve, reject) => {
        //     const result = await db.query(
        //         'SELECT * FROM admin WHERE email = ?', [email], function (err, result) {
        //             if (err) throw err;
        //             console.log(result);
        //         }
        //     );
        //     resolve(result);
        // })
        // return await db.query(
        //             'SELECT * FROM admin WHERE email = ?', [email], function (err, result) {
        //                 if (err) throw err;
        //                 console.log(result);
        //             }
        //         );

       db.query(
            'SELECT * FROM admin WHERE email = ?', [email], function (err, result) {
                if (err) throw err;
                return result;
            }
        );
    }

}   