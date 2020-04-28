const { exec } = require('../db/mysql.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const register = (username, password, role) => {
    let sql = `insert into users (username,password,role) values ('${username}','${password}','${role}')`;
    if (role == 'editor') {
        sql = `insert into users (username,password,role,occupation) values ('${username}','${password}','${role}','editor')`;
    }
    console.log(sql);
    const checkRepetSql = `select * from users where username='${username}' and role='${role}'`;
    return exec(checkRepetSql).then((rows) => {
        if (rows.length === 0) {
            return exec(sql).then((data) => {
                console.log('controller', data.affectedRows);
                return data;
            });
        } else {
            return new ErrorModel('该用户名已被注册');
        }
    });
};
const getUserPower = (uid) => {
    const sql = `select firstCheck,secondCheck,thirdCheck,wid,uid from power where uid='${uid}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((data) => {
                console.log('getUserPower', data[0]);
                reslove(data[0]);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};
const setUserPower = (uid, firstCheck = 0, secondCheck = 0, thirdCheck = 0) => {
    const sql = `insert into power (uid,firstCheck,secondCheck,thirdCheck) values ('${uid}','${firstCheck}','${secondCheck}','${thirdCheck}')`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((data) => {
                reslove(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const login = (username, password, role) => {
    // 生成加密密码
    // password = genPassword(password);
    const sql = `
        select * from users where username='${username}' and password='${password}' and role='${role}'
    `;
    console.log(sql);
    // console.log(sql);
    return exec(sql).then((rows) => {
        console.log(rows);
        return rows[0] || {};
    });
};
const getUserInfo = (uid) => {
    const sql = `select * from users where uid='${uid}'`;
    return exec(sql).then((rows) => {
        return rows[0] || {};
    });
};
const updateUserInfo = (obj) => {
    const { uid, nickname, email, phone, occupation, intro } = obj;
    const sql = `update users set nickname='${nickname}',email='${email}',phone='${phone}',
                    occupation='${occupation}',intro='${intro}' where uid='${uid}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('updateUserInfo:', res);
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log('updateUserInfo:', err);
                reject();
            });
    });
};
const addAvatar = (obj) => {
    const { uid, avatar } = obj;
    const sql = `update users set avatar='${avatar}' where uid=${uid}`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('updateUserInfo:', res);
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log('updateUserInfo:', err);
                reject();
            });
    });
};
const updatePsw = (obj) => {
    const { password, uid } = obj;
    const sql = `update users set password='${password}' where uid=${uid}`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('updatePsw:', res);
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log('updatePsw:', err);
                reject();
            });
    });
};
module.exports = { login, register, getUserInfo, updateUserInfo, addAvatar, updatePsw, setUserPower, getUserPower };
