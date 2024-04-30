const mysql = require("mysql");
require("dotenv").config();

const mainDbPoolConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    // host: process.env.SMALL_READONLY_DB,
    host: process.env.MAIN_DB_PRODUCTION,
    user: process.env.MAIN_DB_ID,
    password: process.env.MAIN_DB_PASS,
    // user: process.env.ADMIN_ID,
    // password: process.env.ADMIN_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
}

const readOnlyDbPoolConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    host: process.env.MAIN_READONLY_DB,
    user: process.env.MAIN_DB_ID,
    password: process.env.MAIN_DB_PASS,
    // user: process.env.ADMIN_ID,
    // password: process.env.ADMIN_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
}

const lsqDbPoolConfig = {
    connectionLimit: process.env.OTP_DB_CON_LIM,
    host: process.env.OTP_DB_URI,
    user: process.env.OTP_DB_ID,
    password: process.env.OTP_DB_PASS,
    // user: process.env.ADMIN_ID,
    // password: process.env.ADMIN_PASS,
    database: process.env.OTP_DB_NAME,
    charset: "utf8mb4"
}

const pollDbPoolConfig = {
    connectionLimit: process.env.POLL_DB_CON_LIM,
    host: process.env.POLL_DB_PRODUCTION,
    user: process.env.POLL_DB_ID,
    password: process.env.POLL_DB_PASS,
    database: process.env.POLL_DB_NAME,
    charset: "utf8mb4"
}

const localDbPoolConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.LOCAL_DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
}

const activityDbPoolConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    host: process.env.ACTIVITY_DB,
    port: 3306,
    user: process.env.MAIN_DB_ID,
    password: process.env.MAIN_DB_PASS,
    // user: process.env.ADMIN_ID,
    // password: process.env.ADMIN_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
}

const vtseDbPoolConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    host: "vtsetestdb.cbuslrmrtb0l.ap-south-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "#0MSA1RAM786*",
    database: "vtse",
    charset: "utf8mb4"
}

const backupDbConfig = {
    connectionLimit: process.env.MAIN_DB_CON_LIM,
    host: process.env.BACKUP_DB,
    port: 3306,
    user: process.env.MAIN_DB_ID,
    password: process.env.MAIN_DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
}

const mainDb = mysql.createPool(mainDbPoolConfig);
const mainDbMulti = mysql.createPool({...mainDbPoolConfig, multipleStatements: true});
const mainReadonlyDb = mysql.createPool(readOnlyDbPoolConfig);
const mainReadonlyDbMulti = mysql.createPool({...readOnlyDbPoolConfig, multipleStatements: true});
const lsqDb = mysql.createPool(lsqDbPoolConfig);
const lsqDbMulti = mysql.createPool({...lsqDbPoolConfig, multipleStatements: true});
const pollDb = mysql.createPool(pollDbPoolConfig);
const pollDbMulti = mysql.createPool({...pollDbPoolConfig, multipleStatements: true});
const localDb = mysql.createPool(localDbPoolConfig);
const localDbMulti = mysql.createPool({...localDbPoolConfig, multipleStatements: true});
const activityDb = mysql.createPool(activityDbPoolConfig);
const activityDbMulti = mysql.createPool({...activityDbPoolConfig, multipleStatements: true});
const vtseDb = mysql.createPool(vtseDbPoolConfig);
const vtseDbMulti = mysql.createPool({...vtseDbPoolConfig, multipleStatements: true});
const backupDb = mysql.createPool(backupDbConfig);

module.exports = {
    mainDb,
    mainDbMulti,
    mainReadonlyDb,
    mainReadonlyDbMulti,
    lsqDb,
    lsqDbMulti,
    pollDb,
    pollDbMulti,
    localDb,
    localDbMulti,
    activityDb,
    activityDbMulti,
    vtseDb,
    vtseDbMulti,
    backupDb,
};