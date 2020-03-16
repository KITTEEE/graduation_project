<template>
    <div class="container">
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">编辑个人信息 </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form :form="form" @submit="baseInfoSubmit">
                <a-form-item label="邮箱" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-input v-decorator="['email']"><a-icon slot="suffix" type="mail" allowClear/></a-input>
                </a-form-item>
                <a-form-item label="手机号" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-input v-decorator="['phone']"><a-icon slot="suffix" type="phone" allowClear/></a-input>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 2, offset: 2 }">
                    <a-button type="primary" @click="baseInfoSubmit" block>保存</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">修改密码 </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form :form="form2" @submit="pswUpdate">
                <a-form-item label="旧密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password v-decorator="['oldpsw']" placeholder="请输入您现在的密码" />
                </a-form-item>
                <a-form-item label="新密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password v-decorator="['newpsw']" placeholder="请输入新密码" />
                </a-form-item>
                <a-form-item label="确认密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password v-decorator="['confirmpsw']" placeholder="再次确认您输入的新密码" />
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 2, offset: 2 }">
                    <a-button type="primary" block @click="pswUpdate">修改密码</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutation } from 'vuex';
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            form2: this.$form.createForm(this)
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        baseInfoSubmit() {
            this.form.validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    values = Object.assign(this.userInfo, values);
                    console.log(values);
                    this.$axios.post(`${this.$backEnd}/api/users/update`, values).then(res => {
                        console.log('update:', res);
                        if (res.data.errno == 0) {
                            this.$message.success(`${res.data.message}`);
                        } else {
                            this.$message.error(`${res.data.message}`);
                        }
                    });
                }
            });
        },
        pswUpdate() {
            this.form2.validateFields({ first: true, force: true }, (err, values) => {
                if (values.oldpsw !== this.userInfo.password) {
                    this.$message.error('旧密码错误');
                    return;
                } else if (!values.newpsw || !values.confirmpsw) {
                    this.$message.error('新密码不能为空');
                    return;
                } else if (values.newpsw !== values.confirmpsw) {
                    this.$message.error('新密码不一致');
                    return;
                } else {
                    const params = { password: values.newpsw, uid: this.userInfo.uid };
                    this.$axios
                        .post(`${this.$backEnd}/api/users/updatePsw`, params)
                        .then(res => {
                            this.$message.success(`${res.data.message}`);
                            this.$axios.get(`${this.$backEnd}/api/users/info?uid=${this.userInfo.uid}`).then(res => {
                                this.$store.commit('setUserInfo', res.data);
                                console.log('setUserInfo', res.data);
                            });
                            this.showConfirm();
                        })
                        .catch(err => {
                            this.$message.errno(`${err.data.message}`);
                        });
                }
            });
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        },
        showConfirm() {
            var _this = this;
            this.$confirm({
                title: '修改密码成功，是否现在重新登录？',
                content: '',
                onOk() {
                    _this.handleLogout();
                }
            });
        },
        handleLogout() {
            localStorage.setItem('userRole', 'unload');
            // 跳转到登录页的时候顺便刷新
            window.location.href = window.location.origin + window.location.pathname;
        }
    }
};
</script>
<style lang="less"></style>
