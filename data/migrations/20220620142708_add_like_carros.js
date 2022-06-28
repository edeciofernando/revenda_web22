exports.up = function(knex) {
    return knex.schema.table('carros', (table) => {
        table.integer('n_likes').notNull().defaultTo(0);
        table.integer('n_dislikes').notNull().defaultTo(0);
    });  
};

exports.down = function(knex) {
    return knex.schema.table('carros', (table) => {
        table.dropColumn('n_likes');
        table.dropColumn('n_dislikes');
    });    
};
