exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        name: {
            type: 'text',
            notNull: true,
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
