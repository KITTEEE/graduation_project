<template>
    <div class="main user-layout-register">
        <h2><span style="font-weight:bold">注册</span></h2>
        <a-form ref="formRegister" :form="form" id="formRegister">
            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    placeholder="请输入账号或名称"
                    v-decorator="[
                        'username',
                        {
                            rules: [{ required: true, message: '用户名不能为空' }],
                            validateTrigger: 'change'
                        }
                    ]"
                >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    size="large"
                    type="password"
                    @click="handlePasswordInputClick"
                    autocomplete="false"
                    placeholder="至少6位密码，区分大小写"
                    v-decorator="[
                        'password',
                        {
                            rules: [{ required: true, message: '请输入密码' }, { validator: this.handlePasswordCheck }],
                            validateTrigger: ['change', 'blur']
                        }
                    ]"
                ></a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    size="large"
                    type="password"
                    autocomplete="false"
                    placeholder="确认密码"
                    v-decorator="[
                        'password2',
                        {
                            rules: [{ required: true, message: '请输入密码' }, { validator: this.handlePasswordCheck2 }],
                            validateTrigger: ['change', 'blur']
                        }
                    ]"
                ></a-input>
            </a-form-item>
            <a-form-item>
                <span style="display:block">请选择您的角色:</span>
                <a-radio-group
                    :options="options"
                    @change="onRadioChange"
                    v-decorator="['role', { rules: [{ required: true, message: '请选择您的角色' }] }]"
                />
            </a-form-item>
            <a-form-item>
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="register-button"
                    :loading="registerBtn"
                    @click.stop.prevent="handleSubmit"
                    :disabled="registerBtn"
                    >注册
                </a-button>
                <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
// import { mixinDevice } from "@/utils/mixin.js";
// import { getSmsCaptcha } from "@/api/login";
const options = [
    { label: '投稿人', value: 'contributor' },
    { label: '审稿人', value: 'editor' }
];
const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
};
const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
};
const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a'
};
export default {
    name: 'Register',
    components: {},
    // mixins: [mixinDevice],
    data() {
        return {
            options,
            radioValue: 'contributer',
            form: this.$form.createForm(this),
            state: {
                time: 60,
                smsSendBtn: false,
                passwordLevel: 0,
                passwordLevelChecked: false,
                percent: 10,
                progressColor: '#FF0000'
            },
            registerBtn: false
        };
    },
    computed: {
        passwordLevelClass() {
            return levelClass[this.state.passwordLevel];
        },
        passwordLevelName() {
            return levelNames[this.state.passwordLevel];
        },
        passwordLevelColor() {
            return levelColor[this.state.passwordLevel];
        }
    },
    methods: {
        onRadioChange(e) {
            console.log(this.radioValue);
        },
        handlePasswordLevel(rule, value, callback) {
            let level = 0;

            // 判断这个字符串中有没有数字
            if (/[0-9]/.test(value)) {
                level++;
            }
            // 判断字符串中有没有字母
            if (/[a-zA-Z]/.test(value)) {
                level++;
            }
            // 判断字符串中有没有特殊符号
            if (/[^0-9a-zA-Z_]/.test(value)) {
                level++;
            }
            this.state.passwordLevel = level;
            this.state.percent = level * 30;
            if (level >= 2) {
                if (level >= 3) {
                    this.state.percent = 100;
                }
                callback();
            } else {
                if (level === 0) {
                    this.state.percent = 10;
                }
                callback(new Error('密码强度不够'));
            }
        },

        handlePasswordCheck(rule, value, callback) {
            const password2 = this.form.getFieldValue('password2');
            if (value === undefined) {
                callback(new Error('请输入密码'));
            }
            if (value && password2 && value.trim() !== password2.trim()) {
                callback(new Error('两次密码不一致'));
            }
            callback();
        },

        handlePasswordCheck2(rule, value, callback) {
            const password = this.form.getFieldValue('password');
            // console.log('value', value);
            if (value === undefined) {
                callback(new Error('请输入密码'));
            }
            if (value && password && value.trim() !== password.trim()) {
                callback(new Error('两次密码不一致'));
            }
            callback();
        },

        handlePasswordInputClick() {
            this.state.passwordLevelChecked = false;
        },

        handleSubmit() {
            const {
                form: { validateFields },
                state,
                $router
            } = this;
            // console.log(this.form.getFieldsValue());
            validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    console.log('noerr');
                    this.registerBtn = true;
                    this.$axios
                        .post('http://localhost:8000/api/users/register', values)
                        .then(res => {
                            console.log('注册接口', res);
                            this.registerBtn = false;
                            if (res.data.errno == 0) {
                                this.$success({
                                    title: '注册成功',
                                    // JSX support
                                    okText: '立即登录',
                                    closable: true,
                                    onOk: () => {
                                        console.log('ok');
                                        this.$router.push({ name: 'login' });
                                    }
                                });
                            } else if (res.data.errno == -1) {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            if (this.registerBtn) {
                                this.registerBtn = false;
                            }
                        });
                }
            });
        }
        // requestFailed(err) {
        //     this.$notification['error']({
        //         message: '错误',
        //         description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        //         duration: 4
        //     });
        //     this.registerBtn = false;
        // }
    },
    watch: {
        'state.passwordLevel'(val) {
            console.log(val);
        }
    }
};
</script>
<style lang="less">
.user-register {
    &.error {
        color: #ff0000;
    }

    &.warning {
        color: #ff7e05;
    }

    &.success {
        color: #52c41a;
    }
}

.user-layout-register {
    .ant-input-group-addon:first-child {
        background-color: #fff;
    }
}
</style>
<style lang="less" scoped>
.user-layout-register {
    & > h3 {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .register-button {
        width: 50%;
    }

    .login {
        float: right;
        line-height: 40px;
    }
}
</style>
