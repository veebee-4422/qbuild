import { QBuildSelect } from "./qbuildSelect";

export class QBuildFrom {
    constructor(){

    }
}

export interface column {
    name: string,
    alias: string
}

export class QBuild {
    private queryType: QBuildSelect | null = null;
    private fromTable: QBuildFrom | null = null;

    
    constructor(){
        this.select.bind(this);
        return this;
    }

    select(...columns: (string | column)[]){
        this.queryType = new QBuildSelect(columns);
    }

    from(table: string){

    }
}