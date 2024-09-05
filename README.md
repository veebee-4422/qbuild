# SQL Query Builder with IntelliSense

This project is a TypeScript-based SQL query builder designed to simplify the process of creating SQL queries with support for IntelliSense for column names and return data types. It automatically polls the database for changes in table structures and updates the corresponding interfaces accordingly. This allows for seamless integration with modern IDEs, providing real-time feedback and suggestions as queries are written.

## Features
- **Fluent API** for building SQL queries with a chainable interface.
- **IntelliSense** support for column names and return data types.
- **Automatic polling** for database schema changes, updating column definitions dynamically.
- **Support for complex queries** like joins, unions, and more.
- **SQL query generation** with properly formatted and aliased column names.
  
## Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up a connection to your database.

## Usage

### Example

Here's how to use the `QBuild` class to build a SQL query:

```typescript
import { QBuild } from './QBuild';

const query = new QBuild()
    .fromTable('users', 'u')
    .addColumn('id', 'userId')
    .addColumn('username', 'userName')
    .fromTable('orders', 'o')
    .addColumn('id', 'orderId')
    .addColumn('order_date', 'orderDate')
    .build()
    .execute();
```

This generates the following SQL query:

```sql
SELECT
    u.id AS userId,
    u.username AS userName,
    o.id AS orderId,
    o.order_date AS orderDate
FROM
    users u
FROM
    orders o;
```
## API Methods

### fromTable(tableName: string, alias: string | null = null)
Adds a table to the query with an optional alias.

Arguments:
- tableName: The name of the table.
- alias: (Optional) Alias for the table. Defaults to the table name.

### addColumn(columnName: string, alias: string | null = null)
Adds a column from the last added table to the query with an optional alias.

Arguments:
- columnName: The name of the column.
- alias: (Optional) Alias for the column. Defaults to the column name.

### join(tableName: string, alias: string | null = null)
Adds a column from the last added table to the query with an optional alias.

Arguments:
- tableName: The name of the table to join.
- alias: (Optional) Alias for the table. Defaults to the table name.
