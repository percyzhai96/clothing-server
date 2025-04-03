module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "root",
    DB: "clothingadmin",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}
