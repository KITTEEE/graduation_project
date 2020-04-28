const { exec } = require('../db/mysql.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getCommitorList = (role) => {
    const sql = `select * from users where role=${role}`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('获取用户列表', res);
                reslove(res);
            })
            .catch((err) => {
                console.log('获取用户列表失败', err);
                reject(err);
            });
    });
};
const getPaperList = () => {
    const sql = `select * from paper`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('稿件列表', res);
                reslove(res);
            })
            .catch((err) => {
                console.log('获取稿件列表失败', err);
                reject(err);
            });
    });
};
const deleteUser = (uid) => {
    const sql = `delete from users where 1=1 and uid='${uid}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('删除用户', res);
                reslove(res);
            })
            .catch((err) => {
                console.log('删除用户失败', err);
                reject(err);
            });
    });
};
const deletePaper = (id) => {
    const sql = `delete from paper where 1=1 and pid='${id}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                reject();
            });
    });
};
const addContributor = (username, password, nickname) => {
    const sql = `insert into users (username,password,nickname,role) values ('${username}','${password}','${nickname}','contributor')`;
    const checkRepetSql = `select * from users where username='${username}' and role='contributor'`;
    return new Promise((resolve, reject) => {
        exec(checkRepetSql).then((rows) => {
            if (rows.length === 0) {
                exec(sql).then((data) => {
                    console.log('controller', data.affectedRows);
                    resolve(data);
                });
            } else {
                reject(new ErrorModel('该用户名已被使用'));
            }
        });
    });
};
const addEditor = (params) => {
    const { username, password, nickname, occupation } = params;
    const sql = `insert into users (username,password,nickname,occupation,role) values 
                ('${username}','${password}','${nickname}','${occupation}','editor')`;
    const checkRepetSql = `select * from users where username='${username}' and role='editor'`;
    return new Promise((resolve, reject) => {
        exec(checkRepetSql).then((rows) => {
            if (rows.length === 0) {
                exec(sql).then((data) => {
                    console.log('controller', data.affectedRows);
                    resolve(data);
                });
            } else {
                reject(new ErrorModel('该用户名已被使用'));
            }
        });
    });
};
const editContributor = (params) => {
    const { uid, nickname, email, phone, occupation, username, password } = params;
    const sql = `update users set nickname='${nickname}',email='${email}',phone='${phone}',
                occupation='${occupation}',username='${username}',password='${password}' where uid='${uid}' `;
    return new Promise((resolve, reject) => {
        return exec(sql)
            .then((result) => {
                console.log('editContributor:', result);
                if (result.affectedRows == 1) {
                    resolve(result);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const editEditor = (params) => {
    const { uid, nickname, email, phone, occupation, username, password } = params;
    const sql = `update users set nickname='${nickname}',email='${email}',phone='${phone}',
                occupation='${occupation}',username='${username}',password='${password}' where uid='${uid}' `;
    return new Promise((resolve, reject) => {
        return exec(sql)
            .then((result) => {
                console.log('editEditor:', result);
                if (result.affectedRows == 1) {
                    resolve(result);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const editPaper = (params) => {
    const { pid, title, author, state, uid, concat } = params;
    const sql = `update paper set title='${title}',author='${author}',concat='${concat}',
                    state='${state}',uid='${uid}' where pid='${pid}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('delivery:', res);
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
    });
};
const addPaper = (obj) => {
    const { uid, title, author, overview, categroy, concat, file, time, state } = obj;
    const sql = `insert into paper (uid,title,author, overview, categroy,concat,file,time,state)
                    values ('${uid}','${title}','${author}','${overview}','${categroy}','${concat}','${file}','${time}','${state}')`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('addPaper:', res);
                if (res.affectedRows == 1) {
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                reject();
            });
    });
};

const getPower = () => {
    const sql = `select users.uid,users.nickname,users.occupation,users.role,
                    power.firstCheck,power.secondCheck,power.thirdCheck,power.uid from users,power 
                    where users.uid=power.uid and users.role='editor'`;
    return new Promise((resolve, reject) => {
        exec(sql)
            .then((rows) => {
                console.log('getPower', rows);
                resolve(rows);
            })
            .catch((err) => {
                console.log('getPower err', err);
                reject(err);
            });
    });
};
const setPower = (params) => {
    const { uid, firstCheck, secondCheck, thirdCheck } = params;
    const sql = `update power set firstCheck='${firstCheck}',secondCheck='${secondCheck}',thirdCheck='${thirdCheck}' where uid='${uid}'`;
    return new Promise((resolve, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('setPower:', res);
                if (res.affectedRows == 1) {
                    resolve(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
    });
};
const setAdminPsw = (uid, password) => {
    const sql = `update users set password='${password}' where uid='${uid}'`;
    return new Promise((resolve, reject) => {
        return exec(sql)
            .then((res) => {
                console.log('setAdminPsw:', res);
                if (res.affectedRows == 1) {
                    resolve(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
    });
};
const addAdmin = (params) => {
    const { nickname, username, password } = params;
    const sql = `insert into users (username,password,nickname,role) values ('${username}','${password}','${nickname}','admin')`;
    const checkRepetSql = `select * from users where username='${username}' and role='admin'`;
    return new Promise((resolve, reject) => {
        exec(checkRepetSql).then((rows) => {
            if (rows.length === 0) {
                exec(sql).then((data) => {
                    console.log('controller', data.affectedRows);
                    resolve(data);
                });
            } else {
                reject(new ErrorModel('该用户名已被使用'));
            }
        });
    });
};
const editAdmin = (params) => {
    const { uid, nickname, username, password } = params;
    const sql = `update users set nickname='${nickname}',username='${username}',password='${password}' where uid='${uid}' `;
    return new Promise((resolve, reject) => {
        return exec(sql)
            .then((result) => {
                console.log('editAdmin:', result);
                if (result.affectedRows == 1) {
                    resolve(result);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
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
};
