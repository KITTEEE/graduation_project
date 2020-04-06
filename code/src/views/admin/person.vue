<template>
    <div class="container">
        <div class="title" style="padding-bottom:20px;border-bottom:1px solid #eee">
            个人管理
        </div>
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">修改密码 </a-divider>
        <div class="edit-info" style="margin:40px 0 60px 0">
            <a-form :form="pswForm" @submit="pswUpdate">
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
        <a-divider orientation="left" style="font-weight:bold;font-size:20px">管理员列表 </a-divider>
        <div class="adminList">
            <div style="margin-bottom:30px">
                <a-button type="primary" icon="plus" @click="showNew">新增管理员</a-button>
            </div>
            <a-table :columns="columns" :rowKey="record => record.uid" :dataSource="dataList">
                <span slot="nickname" slot-scope="text">
                    <span>{{ text ? text : '未填写' }}</span>
                </span>
                <span slot="occupation" slot-scope="text">
                    <span>{{ text == 'editor' ? '编辑' : '专家' }}</span>
                </span>
                <span slot="action">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()"> 修改 </a>
                </span>
            </a-table>
        </div>
        <a-modal v-model="newVisible" title="新增管理员" okText="确认添加" cancelText="取消" @ok="addNew" :width="700">
            <a-form :form="newForm" @submit="addNew">
                <a-form-item label="管理员名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input
                        v-decorator="[
                            'nickname',
                            {
                                rules: [{ required: true, message: '管理员名称不能为空' }]
                            }
                        ]"
                        placeholder="管理员真实姓名"
                    />
                </a-form-item>
                <a-form-item label="默认账户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'username',
                            {
                                rules: [{ required: true, message: '用户名不能为空' }]
                            }
                        ]"
                        placeholder="管理员登录账号"
                    />
                </a-form-item>
                <a-form-item label="管理员登录密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'password',
                            {
                                rules: [{ required: true, message: '密码不能为空' }]
                            }
                        ]"
                        placeholder="用户的登录密码"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
const columns = [
    {
        title: '用户id',
        dataIndex: 'uid',
        width: '20%'
    },
    {
        title: '用户名称',
        dataIndex: 'nickname',
        scopedSlots: { customRender: 'nickname' },
        width: '20%'
    },
    {
        title: '用户名',
        dataIndex: 'username',
        width: '20%'
    },
    {
        title: '密码',
        dataIndex: 'password',
        width: '20%'
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
];
export default {
    data() {
        return {
            columns,
            newVisible: false,
            dataList: [],
            list: [],
            newForm: this.$form.createForm(this),
            pswForm: this.$form.createForm(this)
        };
    },
    created() {
        this.$axios.get(`${this.$backEnd}/api/admin/userlist?role='editor'`).then(res => {
            this.list = res.data.data;
            this.dataList = res.data.data;
        });
    },
    methods: {
        pswUpdate() {},
        showNew() {
            this.newVisible = true;
        },
        addNew() {}
    }
};
</script>
<style lang="less">
.adminList {
    width: 60%;
}
</style>
