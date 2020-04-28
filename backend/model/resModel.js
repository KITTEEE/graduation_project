class BaseModel {
    constructor(data,message) {
        // data 为对象，message 为字符串
        // 若只传入一个字符串，则把这个字符串当作 message
        if(typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if(data) {
            this.data = data;
        }
        if(message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data,message) {
        super(data,message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data,message) {
        super(data,message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}