const multer = require('multer')

module.exports = {
    init: (path) => {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, path)
            },
            filename: (req, file, callback) => {
                callback(null, `${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`)
            }
        })

        const fileFilter = (req, file, callback) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                // accept files
                callback(null, true)
            } else {
                // reject files
                callback(null, false)
                console.log('File type not accepted')
            }
        }

        return multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5 // 5MB
            },
            fileFilter: fileFilter
        })
    }
}
