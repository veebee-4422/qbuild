import { QBuild } from "./core.js";

export function qbuild(){
    return new QBuild();
}


const q = qbuild()
    .fromTable("users", "u")
        .addColumn("id")
        .addColumn("name", "user_name")
        .addColumn("phone_number")
    .build()
    .query;

console.log(q)