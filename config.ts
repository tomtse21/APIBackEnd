
export const config = {

  testing: {
    host: 'tiny.db.elephantsql.com',
    port: 5432,
    user: 'nfwguazp',
    password: 'IkZx4Btr0leC0Qgj8493QuRQXwxKzlTw',
    database: 'nfwguazp',
    connection_limit: 100,
    env: "Testing"
  },
  dev: {
    host: 'tiny.db.elephantsql.com',
    port: 5432,
    user: 'xdjccgax',
    password: 'PUj6SscxhD6s0evJwNm2KVsjQuiLYmOQ',
    database: 'xdjccgax',
    connection_limit: 100,
    env: "Prod"
  }


}

export const configEnv = process.argv.includes('prod') ? config.dev : config.testing;
