const fs = require("fs");
const {
    mainDb,
    mainDbMulti,
    lsqDb,
    lsqDbMulti,
    pollDb,
    localDb,
    localDbMulti,
    mainReadonlyDb,
    backupDb
} = require('./mainDbConfig');

const logFilePath = "./temp/logs.log";
const latencyThreshold = 300;

function log(query, params, time){
    const logMessage = `
    ____________________________________________________________________________NEW_LOG_____________________________________________________________________________
    QUERY
    ___________
    ${query}

    PARAMS
    ___________
    ${params ? params.toString() : ""}
    ________________________________________________________________${new Date().toISOString()}___${time}ms_______________________________________________________________
    `;
    fs.appendFile(logFilePath, logMessage, (error) => {
      if (error) console.log("DBlog", error);
      console.log('The message was appended to the log file!');
    });
}

function makeQuery(query, params, logThis = false) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = mainDb.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            if(logThis !== null && (Date.now() - now > latencyThreshold || logThis)){
                log(query, params, Date.now() - now);
            }
            // console.log(query, Date.now() - now)
            resolve(results);
        });
        // console.log(q)
    });
}

function makeReadQuery(query, params, logThis = false) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = mainReadonlyDb.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
    });
}

// To be used sparingly, SQL injections++
function makeMultiQuery(query, params) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = mainDbMulti.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            // if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
        // console.log(q)
    });
}

function makeLsqQuery(query, params, multipleQueries = false) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        const connectionPool = multipleQueries ? lsqDbMulti : lsqDb;
        let q = connectionPool.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            // if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
        //console.log(q.sql)
    });
}

function makePollQuery(query, params) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = pollDb.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            // if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            // console.log(query, Date.now() - now)
            resolve(results);
        });
        // console.log(q.sql)
    });
}

function makeLocalQuery(query, params, multipleQueries = false) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        const connectionPool = multipleQueries ? localDbMulti : localDb;
        let q = connectionPool.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
        // console.log(q.sql)
    });
}

function makeLocalMultiQuery(query, params) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = localDbMulti.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            // if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
        // console.log(q)
    });
}

function makeBackupQuery(query, params) {
    if(query.toLowerCase().includes("update") && !query.toLowerCase().includes("where")){
        throw new Error("NO WHERE CLAUSE IN AN UPDATE QUERY DUMBASS");
    }
    const now = Date.now();
    return new Promise((resolve, reject) => {
        let q = backupDb.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            // if(Date.now() - now > latencyThreshold) log(query, params, Date.now() - now);
            resolve(results);
        });
        // console.log(q)
    });
}

module.exports = {
    makeQuery,
    makeMultiQuery,
    makeLsqQuery,
    makePollQuery,
    makeLocalQuery,
    makeLocalMultiQuery,
    makeReadQuery,
    makeBackupQuery
};