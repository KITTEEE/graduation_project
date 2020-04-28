const { exec } = require('../db/mysql.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getPaperList = (id) => {
    const sql = `select * from paper where uid='${id}'`;
    return exec(sql).then((rows) => {
        return rows || [];
    });
};
const getEditList = (state) => {
    const sql = `select * from paper where state='${state}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((rows) => {
                console.log('获取某个状态的稿件列表:', rows);
                reslove(rows || []);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const getPaperDetail = (id) => {
    const sql = `select * from paper where pid='${id}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((rows) => {
                console.log('获取稿件详情:', rows);
                reslove(rows[0] || []);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const changeState = (id, state, remark) => {
    console.log(id, state, remark);
    const sql = `update paper set state='${state}',remark='${remark}' where pid='${id}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                if (res.affectedRows == 1) {
                    console.log('更改稿件状态:', res);
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log('更改稿件状态失败:', err);
                reject();
            });
    });
};
const returnBack = (id, laststate, remark) => {
    const sql = `update paper set state=2, laststate='${laststate}',remark='${remark}' where pid='${id}'`;
    return new Promise((reslove, reject) => {
        return exec(sql)
            .then((res) => {
                if (res.affectedRows == 1) {
                    console.log('退回稿件:', res);
                    reslove(res);
                } else {
                    reject();
                }
            })
            .catch((err) => {
                console.log('退回稿件失败:', err);
                reject();
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
const deliveryPaper = (obj) => {
    const { uid, title, author, overview, categroy, concat, file, time, state } = obj;
    const sql = `insert into paper (uid,title,author, overview, categroy,concat,file,time,state)
                    values ('${uid}','${title}','${author}','${overview}','${categroy}','${concat}','${file}','${time}','${state}')`;
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
                reject();
            });
    });
};
const updatePaper = (obj) => {
    const { pid, uid, title, author, overview, categroy, concat, file, time, state } = obj;
    const sql = `update paper set title='${title}',author='${author}', overview='${overview}', categroy='${categroy}',
    concat='${concat}',file='${file}',time='${time}',state='${state}' where pid='${pid}'`;
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
module.exports = { getPaperList, deletePaper, deliveryPaper, updatePaper, getPaperDetail, getEditList, changeState, returnBack };
