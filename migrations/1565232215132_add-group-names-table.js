exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('group_names', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        name: {
          type: 'text',
          notNull: true,
        }
      });
};

exports.down = (pgm) => {

};
