<template>
    <a-card :bordered="false">
        <!-- <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="用户ID">
                            <a-input placeholder="请输入用户id" v-model="uid" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                            <a-button type="primary" @click="searchUser">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div> -->
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="searchForm" @submit="searchUser">
                <a-row type="flex" justify="center" align="middle">
                    <a-col :md="12" :sm="24">
                        <a-input-group compact>
                            <a-select size="large" v-model="searchType" v-decorator="['type']" style="width:20%">
                                <a-select-option value="uid">用户ID</a-select-option>
                                <a-select-option value="nickname">用户昵称</a-select-option>
                                <!-- <a-select-option value="author">作者</a-select-option> -->
                            </a-select>
                            <a-input
                                v-decorator="['text']"
                                v-model="searchText"
                                style="width:80%"
                                placeholder="input search text"
                                size="large"
                            />
                        </a-input-group>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                            <a-button style="margin-left:20px" type="primary" @click="searchUser">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div style="margin-bottom:30px">
            <a-button type="primary" icon="plus" @click="showNew">新建</a-button>
        </div>
        <a-table :columns="columns" :rowKey="(record) => record.uid" :dataSource="dataList">
            <span slot="nickname" slot-scope="text">
                <span>{{ text ? text : '未填写' }}</span>
            </span>
            <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="showEdit(record)">查看与编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="delUser(record)">删除</a>
            </span>
        </a-table>
        <a-modal v-model="editVisible" title="操作" :width="800" okText="保存" cancelText="取消" @ok="saveEdit">
            <a-form :form="editForm" @submit="saveEdit">
                <a-divider orientation="left">基本信息</a-divider>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="用户id" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['uid']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="用户昵称" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['nickname']" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['email']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="联系电话" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['phone']" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="职业" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['occupation']" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-divider orientation="left">账号信息</a-divider>
                <a-form-item label="用户登录账号" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'username',
                            {
                                rules: [{ required: true, message: '用户名不能为空' }],
                            },
                        ]"
                    />
                </a-form-item>
                <a-form-item label="用户密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'password',
                            {
                                rules: [{ required: true, message: '密码不能为空' }],
                            },
                        ]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model="newVisible" title="新增投稿人" okText="确认添加" cancelText="取消" @ok="addNew" :width="700">
            <a-form :form="newForm" @submit="addNew">
                <a-form-item label="默认昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input v-decorator="['nickname']" placeholder="用户 nickname" />
                </a-form-item>
                <a-form-item label="默认账户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'username',
                            {
                                rules: [{ required: true, message: '用户名不能为空' }],
                            },
                        ]"
                        placeholder="用户的登录账号"
                    />
                </a-form-item>
                <a-form-item label="原始密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'password',
                            {
                                rules: [{ required: true, message: '密码不能为空' }],
                            },
                        ]"
                        placeholder="用户的登录密码"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>
<script>
const columns = [
    {
        title: '用户id',
        dataIndex: 'uid',
        width: '20%',
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        scopedSlots: { customRender: 'nickname' },
        width: '20%',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];
export default {
    data() {
        return {
            columns,
            uid: '',
            searchText: '',
            searchType: 'uid',
            searchForm: this.$form.createForm(this),
            editForm: this.$form.createForm(this),
            newForm: this.$form.createForm(this),
            dataList: [],
            list: [],
            editVisible: false,
            newVisible: false,
            editUser: '',
        };
    },
    created() {
        this.getContributorList();
    },
    methods: {
        getContributorList() {
            this.$axios.get(`${this.$backEnd}/api/admin/userlist?role='contributor'`).then((res) => {
                this.list = res.data.data;
                this.dataList = res.data.data;
            });
        },
        searchUser() {
            if (!this.searchText) {
                this.$message.info('请输入要查询的信息');
                return;
            }
            this.dataList = this.list.filter((item) => {
                if (item[this.searchType]) {
                    return item[this.searchType].toString().search(`${this.searchText}`) !== -1;
                }
            });
        },
        reset() {
            this.dataList = this.list;
            this.uid = '';
        },
        addNew() {
            this.newForm.validateFields({ first: true, force: true }, (err, value) => {
                if (!err) {
                    console.log(value);
                    // 添加用户接口
                    this.$axios.post(`${this.$backEnd}/api/admin/addContributor`, value).then((res) => {
                        console.log('addContributor', res);
                        if (res.data.errno == -1) {
                            this.$message.error(res.data.message);
                            return;
                        } else {
                            this.$message.success(res.data.message);
                            this.newVisible = false;
                            this.getContributorList();
                        }
                    });
                }
            });
        },
        delUser(user) {
            console.log(user.uid);
            this.$confirm({
                title: '确定删除该用户吗？',
                content: (h) => <div style="color:red;">执行此操作后，将无法恢复数据</div>,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    console.log('OK');
                    this.$axios.get(`${this.$backEnd}/api/admin/deleteUser?uid=${user.uid}`).then((res) => {
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.getContributorList();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test',
            });
        },
        showEdit(user) {
            this.editUser = user;
            const { uid, username, password, nickname, email, phone, occupation } = this.editUser;
            this.editVisible = true;
            this.$nextTick(() => {
                const obj = {
                    uid,
                    username,
                    password,
                    nickname,
                    email,
                    phone,
                    occupation,
                };
                this.editForm.setFieldsValue(obj);
            });
        },
        saveEdit() {
            this.editForm.validateFields({ first: true, force: true }, (err, value) => {
                if (!err) {
                    console.log(value);
                    this.$axios.post(`${this.$backEnd}/api/admin/editContributor`, value).then((res) => {
                        console.log(res);
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.editVisible = false;
                            this.getContributorList();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
            });
        },
        showNew() {
            this.newVisible = true;
        },
    },
};
</script>
<style lang="less">
.table-page-search-wrapper {
    margin-bottom: 30px;
    .ant-form-inline {
        .ant-form-item {
            display: flex;
            margin-bottom: 24px;
            margin-right: 0;

            .ant-form-item-control-wrapper {
                flex: 1 1;
                display: inline-block;
                vertical-align: middle;
            }

            > .ant-form-item-label {
                line-height: 32px;
                padding-right: 8px;
                width: auto;
            }
            .ant-form-item-control {
                height: 32px;
                line-height: 32px;
            }
        }
    }
}
</style>
