import { column } from "./qbuildCore";

export class QBuildSelect {
    private columns: (string | column)[];
    constructor(columns: (string | column)[]){
        this.columns = columns;
    }
}