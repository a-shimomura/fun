'use strict';

const hook = require('fc-helper');
const moment = require("moment");
const bugsnag = require('bugsnag');
const mysql = require('mysql');

/**
 * メイン処理
 */
const main = (event, context, callback) => {
    const connection = {
        host     : process.env['db_host'],
        user     : process.env['db_user'],
        password : process.env['db_password']
    }

    connection.connect((error) => {
        if (error) {
            console.error('connection faild: ' + err.stack);
            throw error;
        }
    
        console.log('connected as id ' + connection.threadId);
    });

    connection.beginTransaction((tranErr) => {
        if (tranErr) { throw tranErr; }
        
        const deadline = moment().add('h', -12)
                                 .format("YYYY-MM-DD HH:mm:ss"),

        connection.query({
            sql: 'UPDATE TABLE SET STATUS = 1 WHERE CREATED_AT < ?',
            timeout: 40000, // 40s
            values: [deadline]
        }, (error, results, fields) => {
            if (error) { 
                connection.rollback(() => {
                    throw error;
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
}

/**
 * 最初に呼ばれる関数
 */
module.exports.handler = (event, context, callback) => { 
    console.log('-----begin------');

    const bugsnagClient = bugsnag(process.env['bugsnag_api_key']);
    bugsnagClient.autoNotify(() => {
        main(event, context, callback);
    });
    console.log('------end------');
});
