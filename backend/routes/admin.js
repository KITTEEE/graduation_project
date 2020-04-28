var express = require('express');
var moment = require('moment');
var router = express.Router();

const {
    getCommitorList,
    getPaperList,
    deleteUser,
    addContributor,
    editContributor,
    addEditor,
    editEditor,
    addPaper,
    deletePaper,
    editPaper,
    getPower,
    setPower,
    setAdminPsw,
    addAdmin,
    editAdmin,
} = require('../controller/admin');
const { setUserPower } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 获取用户列表
router.get('/userlist', (req, res, next) => {
    const { role } = req.query;
    const result = getCommitorList(role);
    result
        .then((data) => {
            res.json(new SuccessModel(data));
        })
        .catch((err) => {
            res.json(new ErrorModel());
        });
});
// 获取稿件列表
router.get('/paperlist', (req, res, next) => {
    const result = getPaperList();
    result
        .then((data) => {
            console.log(data);
            res.json(new SuccessModel(data));
        })
        .catch((err) => {
            res.json(new ErrorModel());
        });
});
// 添加投稿人
router.post('/addContributor', (req, res, next) => {
    const { username, password, nickname } = req.body;
    const result = addContributor(username, password, nickname);
    result
        .then((data) => {
            if (data.affectedRows == 1) {
                setUserPower(data.insertId)
                    .then((response) => {
                        console.log('setUserPower', response);
                        res.json(new SuccessModel('添加用户成功'));
                    })
                    .catch((err) => {
                        console.log('setUserPower err', err);
                    });
            }
        })
        .catch((error) => {
            res.json(error);
        });
});
// 添加审稿人
router.post('/addEditor', (req, res, next) => {
    let { username, password, nickname, occupation } = req.body;
    const result = addEditor({ username, password, nickname, occupation });
    result
        .then((data) => {
            if (data.affectedRows == 1) {
                setUserPower(data.insertId)
                    .then((response) => {
                        console.log('setUserPower', response);
                        res.json(new SuccessModel('添加用户成功'));
                    })
                    .catch((err) => {
                        console.log('setUserPower err', err);
                    });
            }
        })
        .catch((error) => {
            res.json(error);
        });
});
// 新增稿件
router.post('/addPaper', (req, res, next) => {
    const { uid, title, author, overview, categroy, concat, file, state } = req.body;
    const time = moment().format('YYYY-MM-DD');
    const obj = { uid, title, author, categroy, overview, concat, file, state, time: time };
    console.log(obj);
    for (var key in obj) {
        if (obj[key] === undefined) {
            obj[key] = '';
        }
    }
    const result = addPaper(obj);
    result
        .then((data) => {
            res.json(new SuccessModel('添加稿件成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('添加失败，请重试'));
        });
});
// 编辑投稿人
router.post('/editContributor', (req, res, next) => {
    const { uid, nickname, email, phone, occupation, username, password } = req.body;
    const result = editContributor({ uid, nickname, email, phone, occupation, username, password });
    result
        .then((data) => {
            console.log(data);
            res.json(new SuccessModel('保存成功'));
        })
        .catch((err) => {
            console.log(err);
            res.json(new ErrorModel('保存失败'));
        });
});
// 编辑审稿人
router.post('/editEditor', (req, res, next) => {
    const { uid, nickname, email, phone, occupation, username, password } = req.body;
    const result = editEditor({ uid, nickname, email, phone, occupation, username, password });
    result
        .then((data) => {
            res.json(new SuccessModel('保存成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('保存失败'));
        });
});
// 编辑稿件
router.post('/editPaper', (req, res, next) => {
    const { pid, title, author, state, uid, concat } = req.body;
    const result = editPaper({ pid, title, author, state, uid, concat });
    result
        .then((data) => {
            res.json(new SuccessModel('保存成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('保存失败'));
        });
});
// 删除用户
router.get('/deleteUser', (req, res, next) => {
    const { uid } = req.query;
    console.log(uid);
    const result = deleteUser(uid);
    result
        .then((data) => {
            res.json(new SuccessModel('成功删除用户'));
        })
        .catch((err) => {
            res.json(new ErrorModel('删除失败，请重试'));
        });
});
// 删除稿件
router.get('/deletePaper', (req, res, next) => {
    const { pid } = req.query;
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
// 获取审稿人权限
router.get('/getPower', (req, res, next) => {
    const result = getPower();
    result
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});
// 设置审稿人权限
router.post('/setPower', (req, res, next) => {
    const { uid, firstCheck, secondCheck, thirdCheck } = req.body;
    const result = setPower({ uid, firstCheck, secondCheck, thirdCheck });
    result
        .then((data) => {
            res.json(new SuccessModel('设置成功'));
        })
        .catch((error) => {
            res.json(new ErrorModel('设置失败，请重试'));
        });
});
// 修改管理员密码
router.post('/setAdminPsw', (req, res, next) => {
    const { uid, password } = req.body;
    console.log(uid, password);
    const result = setAdminPsw(uid, password);
    result
        .then((data) => {
            res.json(new SuccessModel('修改成功'));
        })
        .catch((error) => {
            res.json(new ErrorModel('修改失败，请重试'));
        });
});
// 添加管理员
router.post('/addAdmin', (req, res, next) => {
    const { nickname, username, password } = req.body;
    const result = addAdmin({ nickname, username, password });
    result
        .then((data) => {
            res.json(new SuccessModel('添加成功'));
        })
        .catch((error) => {
            res.json(error);
        });
});
// 编辑管理员
router.post('/editAdmin', (req, res, next) => {
    const { uid, nickname, username, password } = req.body;
    const result = editAdmin({ uid, nickname, username, password });
    result
        .then((data) => {
            res.json(new SuccessModel('修改成功'));
        })
        .catch((err) => {
            res.json(new ErrorModel('修改失败,请重试'));
        });
});

module.exports = router;
