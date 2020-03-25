<template>
    <div class="main">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <h2><span style="font-weight:bold">登录</span></h2>
            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    placeholder="请输入用户名"
                    v-decorator="[
                        'username',
                        {
                            rules: [{ required: true, message: '用户名不能为空' }],
                            validateTrigger: ['change', 'blur']
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
                    autocomplete="false"
                    placeholder="请输入密码"
                    v-decorator="[
                        'password',
                        {
                            rules: [{ required: true, message: '请输入密码' }],
                            validateTrigger: 'blur'
                        }
                    ]"
                >
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <span style="display:block">请选择您的角色:</span>
                <a-radio-group
                    :options="options"
                    v-decorator="['role', { rules: [{ required: true, message: '请选择您的角色' }] }]"
                />
            </a-form-item>
            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    type="primary"
                    class="login-button"
                    @click.stop.prevent="handleSubmit"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                    >确定</a-button
                >
            </a-form-item>
            <div class="user-login-other">
                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
            </div>
        </a-form>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
const options = [
    { label: '投稿人', value: 'contributor' },
    { label: '审稿人', value: 'editor' },
    { label: '管理员', value: 'admin' }
];
export default {
    data() {
        return {
            options,
            loginBtn: false,
            loginType: 0,
            isLoginError: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                loginType: 0,
                smsSendBtn: false
            }
        };
    },
    created() {},
    methods: {
        ...mapMutations(['setUserInfo']),
        handleSubmit(e) {
            this.form.validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    console.log(values);
                    this.$axios.post(`${this.$backEnd}/api/users/login`, values).then(res => {
                        if (res.data.errno == 0) {
                            this.setUserInfo(res.data.data);
                            const role = res.data.data.role;
                            localStorage.setItem('userRole', role);
                            localStorage.setItem('uid', res.data.data.uid);
                            this.$message.success('登录成功');
                            if (role == 'contributor') {
                                this.$router.push({
                                    path: '/user'
                                });
                            } else if (role == 'editor') {
                                this.$router.push({
                                    path: '/editor'
                                });
                            } else if (role == 'admin') {
                                this.$router.push({
                                    path: '/admin'
                                });
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
            });
        },
        onRadioChange(e) {}
    }
};
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
    }

    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
}
</style>
