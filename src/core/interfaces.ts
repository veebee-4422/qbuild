export interface TableName {
    tableName: string,
    alias: string,
    joinType: "MAIN" | "FULL" | "LEFT" | "RIGHT",
}

export interface ColumnName {
    columnName: string,
    alias: string,
}