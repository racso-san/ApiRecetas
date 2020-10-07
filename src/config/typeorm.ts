import {createConnection} from 'typeorm'
import path from 'path'

export async function connect() {
  await createConnection({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username: "oscar", //root
    password: "1234",
    database: "recetas-bd",
    entities: [
      path.join(__dirname, '../entity/**/**.ts')
    ],
    synchronize: true
  });
  console.log('Database is Connected')
}
