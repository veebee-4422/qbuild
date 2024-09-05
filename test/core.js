
export class QBuild {
    #fromTables = [];
    #tableColumns = {};

    constructor(){}

    fromTable(tableName, alias = null){
        alias = alias || tableName;

        if(!tableName) throw new Error("No table name provided");
        if(this.#tableColumns[`${tableName}_${alias}`]) throw new Error("No table already selected");
        if(!this.#fromTables.length){
            this.#fromTables.push({
                tableName: tableName,
                alias: alias,
                joinType: "MAIN"
            })
            this.#tableColumns[`${tableName}_${alias}`] = [];
        } else {
            this.#fromTables.push({
                tableName: tableName,
                alias: alias,
                joinType: "FULL"
            })
            this.#tableColumns[`${tableName}_${alias}`] = [];
        }

        return this;
    }

    addColumn(columnName, alias = null){
        alias = alias || columnName;
        if(!this.#fromTables.length) throw new Error("No tables selected.");

        const targetTable = this.#fromTables.slice(-1)[0];
        this.#tableColumns[`${targetTable.tableName}_${targetTable.alias}`].push({
            columnName: columnName,
            alias: alias,
        })

        return this;
    }

    build(){
        const tableExists = Boolean(this.#fromTables.length);
        if(!tableExists) throw new Error("No table selected.");
        const columnsExist = Boolean(Object.entries(this.#tableColumns).filter(([tableAlias, columnArray]) => columnArray.length).length);

        console.log(Object.entries(this.#tableColumns)[0])
        if(!columnsExist) throw new Error("No columns selected.");

        const tableColumnArray = Object.entries(this.#tableColumns);

        let query = "SELECT\n";
        for(let i=0; i<tableColumnArray.length; i++){
            const [tableName, tableAlias] = tableColumnArray[i][0].split("_");
            for(let j=0; j<tableColumnArray[i][1].length; j++){
                const { columnName, alias: columnAlias } = tableColumnArray[i][1][j];
                query += `\t${tableAlias}.${columnName}`;
                if(columnAlias !== columnName) query += ` AS ${columnAlias}`;
                if(j !== tableColumnArray[i][1].length - 1) query += `,`;
                query += `\n`;
            }
            query += `FROM\n\t${tableName} ${tableAlias}\n`;
        }
        query += ";";

        this.query = query;

        return this;
    }
}