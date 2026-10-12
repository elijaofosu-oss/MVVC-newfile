const { saveLogsToDB } = require('../controller/user');
const logger = (req, res, next) => {
    const date = new Date()
    const convertedDate = date.toLocaleString()
    const data = `\nAPI with endpoint: "${req.url}" and method: "${req.method}" was called at: ${convertedDate}`
    console.log(data)
    saveLogsToDB(data)
    next()
}

module.exports = logger