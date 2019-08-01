exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('contacts', {
        id: {
          type: 'integer',
          notNull: true,
          references: '"address_book"', 
        },
        home_phone: {
          type: 'integer',
        },
        mobile_phone: {
          type: 'integer',
        },
        work_phone: {
          type: 'integer',
        },
      });
};

exports.down = (pgm) => {

};
