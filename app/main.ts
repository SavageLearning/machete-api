import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';

namespace Repository {
var config = {
    user: process.env.MCHT_DB_USER,
    password: process.env.MCHT_DB_PASSWORD,
    server: process.env.MCHT_DB_SERVER,
    database: process.env.MCHT_DB,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
var knex = Knex({client: 'mssql', connection: config });
var bookshelf = Bookshelf(knex);


export class Employers extends bookshelf.Model<Employers> {
    get tableName() { return 'employers'; }
    workOrders(): Bookshelf.Collection<WorkOrders> {
        return this.hasMany(WorkOrders);
    }
}

export class WorkOrders extends bookshelf.Model<WorkOrders> {
    get tableName() { return 'workorders'; }
    workAssignments(): Bookshelf.Collection<WorkAssignments> {
        return this.hasMany(WorkAssignments);
    }
}

export class WorkAssignments extends bookshelf.Model<WorkAssignments> {
    get tableName() { return 'workassignments'; }
}
}

new Repository.Employers().where('ID', 1).fetch().then(function(employer) {
    console.log(employer.toJSON());
}).catch(function(err) {
    console.error(err);
});