var config = {
    user: process.env.MCHT_DB_USER,
    password: process.env.MCHT_DB_PASSWORD,
    server: process.env.MCHT_DB_SERVER,
    database: process.env.MCHT_DB,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
var knex = require('knex')({client: 'mssql', connection: config });
var bookshelf = require('bookshelf')(knex);


var Employers = bookshelf.Model.extend({
    tableName: 'employers',
    workOrders: function() {
        return this.hasMany(WorkOrders);
    }
});

var WorkOrders = bookshelf.Model.extend({
    tableName: 'workorders',
    workAssignments: function() {
        return this.hasMany(WorkAssignments);
    }
});

var WorkAssignments = bookshelf.Model.extend({
    tableName: 'workassignments'
})

Employers.where('ID', 1).fetch().then(function(employer) {
    console.log(employer.toJSON());
}).catch(function(err) {
    console.error(err);
});