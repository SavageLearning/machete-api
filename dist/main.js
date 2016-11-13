"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Knex = require('knex');
var Bookshelf = require('bookshelf');
var config = {
    user: process.env.MCHT_DB_USER,
    password: process.env.MCHT_DB_PASSWORD,
    server: process.env.MCHT_DB_SERVER,
    database: process.env.MCHT_DB,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
var knex = Knex({ client: 'mssql', connection: config });
var bookshelf = Bookshelf(knex);
var Employers = (function (_super) {
    __extends(Employers, _super);
    function Employers() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Employers.prototype, "tableName", {
        get: function () { return 'employers'; },
        enumerable: true,
        configurable: true
    });
    Employers.prototype.workOrders = function () {
        return this.hasMany(WorkOrders);
    };
    return Employers;
}(bookshelf.Model));
var WorkOrders = (function (_super) {
    __extends(WorkOrders, _super);
    function WorkOrders() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(WorkOrders.prototype, "tableName", {
        get: function () { return 'workorders'; },
        enumerable: true,
        configurable: true
    });
    WorkOrders.prototype.workAssignments = function () {
        return this.hasMany(WorkAssignments);
    };
    return WorkOrders;
}(bookshelf.Model));
var WorkAssignments = (function (_super) {
    __extends(WorkAssignments, _super);
    function WorkAssignments() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(WorkAssignments.prototype, "tableName", {
        get: function () { return 'workassignments'; },
        enumerable: true,
        configurable: true
    });
    return WorkAssignments;
}(bookshelf.Model));
new Employers().where('ID', 1).fetch().then(function (employer) {
    console.log(employer.toJSON());
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=/home/jcii/src/machete-api.old/main.js.map