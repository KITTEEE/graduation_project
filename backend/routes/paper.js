var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var router = express.Router();

var upload = multer({ dest: '../static' });
const {
    getPaperList,
    deletePaper,
    deliveryPaper,
    updatePaper,
    getPaperDetail,
    getEditList,
    changeState,
    returnBack,
} = require('../controller/paper');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', (req, res, next) => {
    const { uid } = req.query;
    const result = getPaperList(uid);
    result.then((data) => {
        res.json(data);
    });
});
router.get('/editList', (req, res, next) => {
    const { state } = req.query;
    const result = getEditList(state);
    result.then((data) => {
        console.log(data);
        res.json(data);
    });
});
router.get('/detail', (req, res, next) => {
    const { pid } = req.query;
    const result = getPaperDetail(pid);
    result
        .then((data) => {
            console.log('获取稿件详情', data);
            res.json(data);
        })
        .catch((err) => {
            res.json(new ErrorModel('获取稿件信息失败，请重试'));
        });
});
router.post('/changeState', (req, res, next) => {
    let { pid, state, remark } = req.body;
    if (!remark) {
        remark = '';
    }
    const result = changeState(pid, state, remark);
    result
        .then((data) => {
            console.log('resolve');
            res.json(new SuccessModel('操作成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('操作失败'));
        });
});
router.post('/returnBack', (req, res, next) => {
    let { pid, laststate, remark } = req.body;
    if (!remark) {
        remark = '';
    }
    const result = returnBack(pid, laststate, remark);
    result
        .then((data) => {
            console.log('resolve');
            res.json(new SuccessModel('操作成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('操作失败'));
        });
});
router.post('/saveDraft', (req, res, next) => {
    const { uid, title, author, overview, categroy, concat, file } = req.body;
    const time = moment().format('YYYY-MM-DD');
    const obj = { uid, title, author, categroy, overview, concat, file, time: time, state: 0 };
    for (var key in obj) {
        if (obj[key] === undefined) {
            obj[key] = '';
        }
    }
    const result = deliveryPaper(obj);
    result
        .then((data) => {
            res.json(new SuccessModel('保存成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('保存失败'));
        });
});
router.post('/updateDraft', (req, res, next) => {
    const { pid, uid, title, author, overview, categroy, concat, file, state = 0 } = req.body;
    const time = moment().format('YYYY-MM-DD');
    const obj = { pid, uid, title, author, categroy, overview, concat, file, time: time, state };
    for (var key in obj) {
        if (obj[key] === undefined) {
            obj[key] = '';
        }
    }
    const result = updatePaper(obj);
    result
        .then((data) => {
            res.json(new SuccessModel('保存成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('保存失败'));
        });
});
router.post('/delivery', (req, res, next) => {
    const { uid, title, author, overview, categroy, concat, file } = req.body;
    const time = moment().format('YYYY-MM-DD');
    const obj = { uid, title, author, categroy, overview, concat, file, time: time, state: 1 };
    const result = deliveryPaper(obj);
    result
        .then((data) => {
            res.json(new SuccessModel('投递稿件成功!'));
        })
        .catch((err) => {
            res.json(new ErrorModel('投递稿件失败，请重试'));
        });
});
router.post('/delete', (req, res, next) => {
    const { pid } = req.body;
    console.log(pid);
    const result = deletePaper(pid);
    result
        .then((data) => {
            res.json(new SuccessModel('删除成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('删除失败，请重试'));
        });
});
router.post('/upload', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.log('ERROR:', err);
        } else {
            let filename = req.file.originalname;
            fs.readdir(path.resolve(__dirname, '../static'), (error, files) => {
                console.log('static下的文件', files);
                let sameNameCount = 0;
                files.forEach((item) => {
                    if (item == filename) {
                        sameNameCount++;
                    }
                });
                console.log('count', sameNameCount);
                if (sameNameCount !== 0) {
                    filename =
                        filename.slice(0, filename.lastIndexOf('.')) +
                        `(${sameNameCount})` +
                        filename.slice(filename.lastIndexOf('.'));
                    console.log(filename);
                }
                var filesrc = path.resolve(__dirname, '../static') + '/' + filename;
                console.log(filesrc);
                fs.writeFile(filesrc, data, (err) => {
                    if (err) {
                        console.log('Error', err);
                    }
                    var obj = {
                        filename: req.file.originalname,
                    };
                    res.json(obj);
                });
            });
        }
    });
});
router.get('/download', (req, res, next) => {
    const filename = req.query.filename;
    // console.log(filename);
    const url = path.resolve(__dirname, '../static') + '\\' + filename;
    console.log(url);
    res.download(path.resolve(__dirname, '../static') + '\\' + filename, filename);
});
module.exports = router;
