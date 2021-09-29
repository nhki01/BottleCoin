const multer = require('multer');
const express = require('express');
// const { path } = require('../../app');
const router = express.Router();

const _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: _storage });

router.get('/:filename', function(req, res, next) {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'images/' + filename);
    return res.sendFile(fullfilepath);
});

router.post('/', upload.single('img'),(req, res) => {
    res.json(req.file);
    console.log(req.file);
});

module.exports = router;