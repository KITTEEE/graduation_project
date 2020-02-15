<template>
    <div class="container">
        <a-divider orientation="left" style="font-weight:bold;font-size:20px"
            >编辑个人信息
        </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form>
                <a-form-item
                    label="昵称"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 5 }"
                >
                    <a-input
                        ><a-icon slot="suffix" type="user" allowClear
                    /></a-input>
                </a-form-item>
                <a-form-item
                    label="邮箱"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 9 }"
                >
                    <a-input
                        ><a-icon slot="suffix" type="mail" allowClear
                    /></a-input>
                </a-form-item>
                <a-form-item
                    label="手机号"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 9 }"
                >
                    <a-input
                        ><a-icon slot="suffix" type="phone" allowClear
                    /></a-input>
                </a-form-item>
                <a-form-item
                    label="职业"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 9 }"
                >
                    <a-input
                        ><a-icon slot="suffix" type="team" allowClear
                    /></a-input>
                </a-form-item>
                <a-form-item
                    label="个人简介"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 9 }"
                >
                    <a-textarea placeholder="" :autosize="{ minRows: 8 }" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 2, offset: 2 }">
                    <a-button type="primary" block>保存</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-divider orientation="left" style="font-weight:bold;font-size:20px"
            >修改密码
        </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form>
                <a-form-item
                    label="旧密码"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 5 }"
                >
                    <a-input-password placeholder="请输入您现在的密码" />
                </a-form-item>
                <a-form-item
                    label="新密码"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 5 }"
                >
                    <a-input-password placeholder="请输入新密码" />
                </a-form-item>
                <a-form-item
                    label="确认密码"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 5 }"
                >
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
export default {
    data() {
        return {};
    },
    methods: {
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
