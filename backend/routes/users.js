var express = require('express');
var router = express.Router();
const {
    register,
    login,
    getUserInfo,
    updateUserInfo,
    addAvatar,
    updatePsw,
    setUserPower,
    getUserPower
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
/* GET users listing. */
// 用户注册
router.post('/register', (req, res, next) => {
    const { username, password, role } = req.body;
    const result = register(username, password, role);
    result.then(data => {
        if (data.affectedRows == 1) {
            setUserPower(data.insertId)
                .then(response => {
                    console.log('setUserPower', response);
                    res.json(new SuccessModel());
                })
                .catch(err => {
                    console.log('setUserPower err', err);
                });
        } else {
            res.json(data);
        }
    });
});
// 获取用户权限
router.get('/getPower', (req, res, next) => {
    const { uid } = req.query;
    console.log('/getPower uid', uid);
    const result = getUserPower(uid);
    result
        .then(data => {
            console.log('/getPower', data);
            res.json(new SuccessModel(data));
        })
        .catch(err => {
            res.json(new ErrorModel());
        });
});
// 用户登录
router.post('/login', (req, res, next) => {
    const { username, password, role } = req.body;
    const result = login(username, password, role);
    result.then(data => {
        if (Object.keys(data).length !== 0) {
            res.json(new SuccessModel(data));
        } else {
            res.json(new ErrorModel('用户名或密码错误'));
        }
    });
});
// 获取用户信息
router.get('/info', (req, res, next) => {
    const { uid } = req.query;
    const result = getUserInfo(uid);
    result.then(data => {
        res.json(data);
    });
});
// 上传头像
router.post('/uploadAvatar', (req, res, next) => {
    const { uid, avatar } = req.body;
    const obj = { uid, avatar };
    const result = addAvatar(obj);
    result
        .then(data => {
            res.json(new SuccessModel('更换成功'));
        })
        .catch(err => {
            res.json(new ErrorModel('更换失败，请重试'));
        });
});
// 修改用户信息
router.post('/update', (req, res, next) => {
    const { uid, nickname, email, phone, occupation, intro } = req.body;
    const obj = { uid, nickname, email, phone, occupation, intro };
    const result = updateUserInfo(obj);
    result
        .then(data => {
            res.json(new SuccessModel('更新信息成功！'));
        })
        .catch(err => {
            res.json(new ErrorModel('更新失败，请重试'));
        });
});
router.post('/updatePsw', (req, res, next) => {
    const { uid, password } = req.body;
    const obj = { uid, password };
    const result = updatePsw(obj);
    result
        .then(data => {
            res.json(new SuccessModel('修改密码成功！'));
        })
        .catch(err => {
            res.json(new ErrorModel('修改密码失败，请重试！'));
        });
});
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
