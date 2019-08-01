exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('address_book', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        fname: {
          type: 'text',
          notNull: true,
        },
        lname: {
          type: 'text',
        },
        contacts: {
          type: 'integer',
        },
        email: {
          type: 'text',
        },
        city: {
          type: 'text',
        },
        province: {
          type: 'text',
        },
        postal_code: {
          type: 'integer',
        },
        country: {
          type: 'text',
        },
      });
};

exports.down = (pgm) => {

};
