'use strict';

const hook = require('fc-helper');
const moment = require("moment");

exports.handler = hook((req, res) => {
    console.log('-----begin------');
    const mysql = require('mysql');
    // TODO env的なものから取れる？
    const con = {
        host     : 'localhost',
        user     : 'user',
        password : 'password'
    }

    connection.connect((err) => {
        if (err) {
            // TODO bugsnag?
            console.error('connection faild: ' + err.stack);
            return;
        }
    
        console.log('connected as id ' + connection.threadId);
    });

    connection.beginTransaction((tranErr) => {
        if (tranErr) { throw tranErr; }
        
        const deadline = moment().add('h', -12)
                                 .format("YYYY-MM-DD HH:mm:ss"),

        connection.query({
            sql: 'update table set status = 1 where created_at < ?',
            timeout: 40000, // 40s
            values: [deadline]
        }, (error, results, fields) => {
            if (error) { 
                connection.rollback(() => {
                    throw err;
                });
            }
        });

        connection.commit((error) => {
            if (error) { 
                connection.rollback(() => {
                    throw error;
                });
            }
            console.log('------success!------');
        });
    });
    console.log('------end------');
});
