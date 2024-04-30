import { Pool } from "mysql2/promise"

export class DbQueries {
    private thisPool: Pool;

    constructor(pool: Pool){
        this.thisPool = pool;
        this.makeRawQuery = this.makeRawQuery.bind(this);
    }

    async makeRawQuery(query: string, params: any[] = []){
        return this.thisPool.query(query, params);
    }
}