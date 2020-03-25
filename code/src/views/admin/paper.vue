<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="searchForm" @submit="searchPaper">
                <a-row type="flex" justify="center" align="middle">
                    <a-col :md="12" :sm="24">
                        <a-input-group compact>
                            <a-select size="large" v-model="searchType" v-decorator="['type']" style="width:20%">
                                <a-select-option value="pid">稿件ID</a-select-option>
                                <a-select-option value="title">标题</a-select-option>
                                <a-select-option value="author">作者</a-select-option>
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
                            <a-button style="margin-left:20px" type="primary" @click="searchPaper">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div style="margin-bottom:30px;margin-top:30px">
            <a-button type="primary" icon="plus" @click="showNew">新增稿件</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.pid" :dataSource="dataList">
            <span slot="state" slot-scope="text">
                <span>{{ stateFilter(text) }}</span>
            </span>
            <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="showEdit(record)">查看与编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="delPaper(record)">删除</a>
            </span>
        </a-table>
        <a-modal v-model="editVisible" title="操作" :width="800" okText="保存" cancelText="取消" @ok="saveEdit">
            <a-form :form="editForm" @submit="saveEdit">
                <a-divider orientation="left">基本信息</a-divider>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="稿件id" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['pid']" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="稿件标题" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['title']" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="稿件作者" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['author']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="稿件状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['state']" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
        <a-modal v-model="newVisible" title="新增审稿人" okText="确认添加" cancelText="取消" @ok="addNew" :width="700">
            <a-form :form="newForm" @submit="addNew">
                <a-form-item label="默认昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input v-decorator="['nickname']" placeholder="用户 nickname" />
                </a-form-item>
                <a-form-item label="审稿人职位" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-select placeholder="请选择" default-value="editor">
                        <a-select-option value="editor">编辑</a-select-option>
                        <a-select-option value="profess">专家</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="默认账户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'username',
                            {
                                rules: [{ required: true, message: '用户名不能为空' }]
                            }
                        ]"
                        placeholder="用户的登录账号"
                    />
                </a-form-item>
                <a-form-item label="原始密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
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
    </a-card>
</template>
<script>
const columns = [
    {
        title: '稿件id',
        dataIndex: 'pid',
        width: '10%'
    },
    {
        title: '稿件标题',
        dataIndex: 'title',
        width: '20%'
    },
    {
        title: '投递时间',
        dataIndex: 'time',
        width: '20%'
    },
    {
        title: '稿件状态',
        dataIndex: 'state',
        width: '20%',
        scopedSlots: { customRender: 'state' },
        filters: [
            {
                text: '未投递',
                value: '0'
            },
            {
                text: '待初审',
                value: '1'
            },
            {
                text: '已退回',
                value: '2'
            },
            {
                text: '待外审',
                value: '3'
            },
            {
                text: '待录用',
                value: '4'
            },
            {
                text: '已录用',
                value: '5'
            }
        ],
        onFilter: (value, record) => record.state.toString() === value
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
            searchType: 'pid',
            searchText: '',
            searchForm: this.$form.createForm(this),
            editForm: this.$form.createForm(this),
            newForm: this.$form.createForm(this),
            dataList: [],
            list: [],
            editVisible: false,
            newVisible: false,
            editPaper: ''
        };
    },
    created() {
        this.$axios.get(`${this.$backEnd}/api/admin/paperlist?`).then(res => {
            this.list = res.data.data;
            this.dataList = res.data.data;
        });
    },
    methods: {
        searchPaper() {
            if (!this.searchText) {
                this.$message.info('请输入要查询的用户id');
                return;
            }
            this.dataList = this.list.filter(item => {
                return item[this.searchType].toString().search(`${this.searchText}`) !== -1;
            });
        },
        reset() {
            this.dataList = this.list;
            this.searchType = 'pid';
            this.searchText = '';
        },
        addNew() {
            this.newForm.validateFields({ first: true, force: true }, (err, value) => {
                if (!err) {
                    console.log(value);
                    // 添加用户接口
                }
            });
        },
        delPaper(paper) {
            console.log(paper.pid);
            this.$confirm({
                title: '确定删除该用户吗？',
                content: h => <div style="color:red;">执行此操作后，将无法恢复数据</div>,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    console.log('OK');
                    this.$message.success('操作成功');
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test'
            });
        },
        showEdit(paper) {
            this.editPaper = paper;
            const { pid, title, author, state, uid, overview, file } = this.editPaper;
            this.editVisible = true;
            this.$nextTick(() => {
                const obj = {
                    pid,
                    title,
                    author,
                    state,
                    uid,
                    overview,
                    file
                };
                this.editForm.setFieldsValue(obj);
            });
        },
        saveEdit() {
            this.editForm.validateFields({ first: true, force: true }, (err, value) => {
                if (!err) {
                    console.log(value);
                }
            });
        },
        showNew() {
            this.newVisible = true;
        },
        stateFilter(state) {
            switch (state) {
                case 0:
                    return '未投递';
                    break;
                case 1:
                    return '待初审';
                    break;
                case 2:
                    return '已退回';
                    break;
                case 3:
                    return '待外审';
                    break;
                case 4:
                    return '待录用';
                    break;
                case 5:
                    return '已录用';
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="less">
.table-page-search-wrapper {
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
