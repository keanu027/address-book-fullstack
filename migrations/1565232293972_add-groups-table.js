exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        group_id: {
          type: 'integer',
          notNull: true,
          references: '"group_names"', 
        },
        userId: {
          type: 'integer',
          notNull: true,
          references: '"users"', 
        },
        contactId: {
          type: 'integer',
          notNull: true,
          references: '"contacts"', 
        },
      });
};

exports.down = (pgm) => {

};
