const Model = require('objection');
const Knex = require('knex');
const db = require('../../util/database');

// const knex = Knex({
//     client: 'sqlite3',
//     useNullAsDefault: true,
//     connection: {
//       filename: 'example.db'
//     }
//   });

// Pass the Knex connection to Objection
Model.knex(db);

class adminSchema extends Model {
    
    // Tells Objection what the db table is for this model
    static tableName() {
        return 'admin';
    }

    static get idColumn() {
        return 'id';
      }

    static get jsonSchema() {
        return {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        };
      }
}

// Expose the model as the public api
module.exports = adminSchema;