<template>
    <div class="main">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <h2><span style="font-weight:bold">登录</span></h2>
            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    placeholder="账户: admin"
                    v-decorator="[
                        'username',
                        {
                            rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }],
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
                    autocomplete="false"
                    placeholder="密码: admin or ant.design"
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
                <a-radio-group :options="options" @change="onRadioChange" v-model="radioValue" />
            </a-form-item>
            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                    >确定</a-button
                >
            </a-form-item>
            <!-- <a-form-item>
                <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
                <router-link :to="{ name: 'recover', params: { user: 'aaa' } }" class="forge-password" style="float: right;"
                    >忘记密码</router-link
                >
            </a-form-item> -->
            <div class="user-login-other">
                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
            </div>
        </a-form>
    </div>
</template>

<script>
// import md5 from "md5";
// import TwoStepCaptcha from "@/components/tools/TwoStepCaptcha";
// import { mapActions } from "vuex";
// import { timeFix } from "@/utils/util";
// import { getSmsCaptcha, get2step } from "@/api/login";
const options = [
    { label: '投稿人', value: 'user' },
    { label: '审稿人', value: 'editor' },
    { label: '管理员', value: 'admin' }
];
export default {
    // components: {
    //   TwoStepCaptcha
    // },
    data() {
        return {
            options,
            radioValue: 'user',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            }
        };
    },
    created() {
        // get2step({})
        //   .then(res => {
        //     this.requiredTwoStepCaptcha = res.result.stepCode;
        //   })
        //   .catch(() => {
        //     this.requiredTwoStepCaptcha = false;
        //   });
        // this.requiredTwoStepCaptcha = true
    },
    methods: {
        // ...mapActions(["Login", "Logout"]),
        // handler
        handleUsernameOrEmail(rule, value, callback) {
            const { state } = this;
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if (regex.test(value)) {
                state.loginType = 0;
            } else {
                state.loginType = 1;
            }
            callback();
        },
        handleSubmit(e) {
            console.log(e);
            let role = 'editor';
            localStorage.setItem('userRole', role);
            if (role == 'user') {
                this.$router.push({
                    path: '/user'
                });
            } else if (role == 'editor') {
                this.$router.push({
                    path: '/editor'
                });
            } else if (role == 'admin') {
            }
        },
        onRadioChange(e) {
            console.log(this.radioValue);
        }
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
