<template>
    <div class="container">
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">编辑个人信息 </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form :form="form" @submit="baseInfoSubmit">
                <a-form-item label="昵称" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input v-decorator="['nickname']"><a-icon slot="suffix" type="user" allowClear/></a-input>
                </a-form-item>
                <a-form-item label="邮箱" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-input v-decorator="['email']"><a-icon slot="suffix" type="mail" allowClear/></a-input>
                </a-form-item>
                <a-form-item label="手机号" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-input v-decorator="['phone']"><a-icon slot="suffix" type="phone" allowClear/></a-input>
                </a-form-item>
                <a-form-item label="职业" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-input v-decorator="['occupation']"><a-icon slot="suffix" type="team" allowClear/></a-input>
                </a-form-item>
                <a-form-item label="个人简介" :label-col="{ span: 2 }" :wrapper-col="{ span: 9 }">
                    <a-textarea v-decorator="['intro']" placeholder="" :autosize="{ minRows: 8 }" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 2, offset: 2 }">
                    <a-button type="primary" @click="baseInfoSubmit" block>保存</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">修改密码 </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form>
                <a-form-item label="旧密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password placeholder="请输入您现在的密码" />
                </a-form-item>
                <a-form-item label="新密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password placeholder="请输入新密码" />
                </a-form-item>
                <a-form-item label="确认密码" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                    <a-input-password placeholder="再次确认您输入的新密码" />
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 2, offset: 2 }">
                    <a-button type="primary" block>修改密码</a-button>
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
            form: this.$form.createForm(this)
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    async created() {
        console.log('userInfo', this.userInfo);
        let uid = localStorage.getItem('uid');
        if (!this.userInfo) {
            await this.$axios.get(`${this.$backEnd}/api/users/info?uid=${uid}`).then(res => {
                this.$store.commit('setUserInfo', res.data);
                console.log('setUserInfo', res.data);
            });
        }
        const { nickname, email, phone, occupation, intro } = this.userInfo;
        this.$nextTick(() => {
            const obj = {
                nickname,
                email,
                phone,
                occupation,
                intro
            };
            this.form.setFieldsValue(obj);
        });
    },
    methods: {
        baseInfoSubmit() {
            this.form.validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    console.log(values);
                    values = Object.assign(values, { uid: this.userInfo.uid });
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
        }
    }
};
</script>
<style lang="less"></style>
