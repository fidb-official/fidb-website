# manager

`manager/Manager`

[backend] list all directories in a database

[backend] list all files in a directory -- page by page

- `type FindPageOptions = { page, size } & FindOptions` -- starting from 0
- `findPage()`
- we can config using page by page or not -- page by page by default
