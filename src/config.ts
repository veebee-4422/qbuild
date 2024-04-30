import fs from "fs";
import { createPool, Pool, PoolOptions } from "mysql2/promise";
import path from "path";
const __dirname = path.resolve();

interface AppConfig extends PoolOptions {
    host: string,
    database: string,
    userId: string,
    password: string,
    connectionLimit: number,
    port: number
}

const configFile: { configs: AppConfig[] } = JSON.parse(fs.readFileSync("../qbuild_config.json").toString());

const poolList: Pool[] = configFile.configs.map(e => createPool(e));

const logFilePath = path.join(__dirname, "sqlLogs.log");
const latencyThreshold = 250;

export class SqlHelper {

    constructor(){
        // this.prodQuery = this.prodQuery.bind(this);
        // this.prodReadQuery = this.prodReadQuery.bind(this);
        // this.lsqQuery = this.lsqQuery.bind(this);
        // this.pollQuery = this.pollQuery.bind(this);
        // this.localQuery = this.localQuery.bind(this);
    }

    private log(query: string, params: any[] = [], time: number = 0){
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
        if(!fs.existsSync(logFilePath)) fs.writeFileSync(logFilePath, "", "utf-8");

        fs.appendFile(logFilePath, logMessage, (error) => {
            if (error) console.log("DBlog", error);
            console.log(`SQL query took: ${time}ms, details appended to the log file.`);
        });
    }

    // async prodQuery(query: string, params: any[] = [], multipleQueries: boolean = false){
    //     const now = Date.now();
    //     const [ queryResults, fieldValues ] = multipleQueries ? await prodMultiPool.query(query, params) :
    //         await prodPool.execute(query, params);
    //     if(Date.now() - now > latencyThreshold) this.log(query, params, Date.now() - now);

    //     return queryResults;
    // }

    // async prodReadQuery(query: string, params: any[] = [], multipleQueries: boolean = false){
    //     const now = Date.now();
    //     const [ queryResults, fieldValues ] = multipleQueries ? await prodReadMultiPool.query(query, params) :
    //         await prodReadPool.execute(query, params);
    //     if(Date.now() - now > latencyThreshold) this.log(query, params, Date.now() - now);

    //     return queryResults;
    // };

    // async lsqQuery(query: string, params: any[] = [], multipleQueries: boolean = false){
    //     const now = Date.now();
    //     const [ queryResults, fieldValues ] = multipleQueries ? await lsqMultiPool.query(query, params) :
    //         await lsqPool.execute(query, params);
    //     if(Date.now() - now > latencyThreshold) this.log(query, params, Date.now() - now);
    
    //     return queryResults;
    // };

    // async pollQuery(query: string, params: any[] = [], multipleQueries: boolean = false){
    //     const now = Date.now();
    //     const [ queryResults, fieldValues ] = multipleQueries ? await pollMultiPool.query(query, params) :
    //         await pollPool.execute(query, params);
    //     if(Date.now() - now > latencyThreshold) this.log(query, params, Date.now() - now);
    
    //     return queryResults;
    // };

    // async localQuery(query: string, params: any[] = [], multipleQueries: boolean = false){
    //     const now = Date.now();
    //     const [ queryResults, fieldValues ] = multipleQueries ? await localMultiPool.query(query, params) :
    //         await localPool.execute(query, params);
    //     if(Date.now() - now > latencyThreshold) this.log(query, params, Date.now() - now);
    
    //     return queryResults;
    // };
}