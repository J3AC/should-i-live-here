const db = require('../server/models/db.js');
const userController = require('../server/controllers/userController.js');


describe('UserController functionality', () => {
    it('checks for an email conflict and if there is one (a user is already using that email, it does not create a new account', () => {
        const email = 'chelsey.fewer@gmail.com'
    db.query(
        'SELECT * FROM Users WHERE email = $1',
        [email],
        (err, response, req) => {
            expect(response.rows.length).not.toEqual(0);
            expect(response.rows[0].email).toEqual(email);
        }
      );

    })
    
    it('creates a new user in the database if there is no email conflict', () => {
     
            const name = 'bob';
            const num = Math.random()
            num.toString();
            const email = 'different11@different.com' + num;
            const hash = 'bob';
        

        db.query(
            `INSERT INTO Users(email, hash, name)
          VALUES($1, $2, $3)`,
            [email, hash, name],
            (err, response, req) => {
            //     expect(err).toBe(undefined)
            //     await db.query(
            //         'SELECT * FROM Users WHERE email = $1',
            //         [email],
            //         (err2, response2, req2) => {
            //             expect(response2.rows.length).not.toEqual(0);
            //             expect(response2.rows[0].email).toEqual(email);
            //         }
            //       );
            
            // }
           
          );
    })

})

