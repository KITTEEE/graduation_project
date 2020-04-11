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
        <a-table :columns="columns" :rowKey="(record) => record.pid" :dataSource="dataList">
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
                            <a-select
                                placeholder="请选择"
                                v-decorator="[
                                    'state',
                                    {
                                        rules: [{ required: true, message: '请选择稿件状态' }],
                                    },
                                ]"
                            >
                                <a-select-option value="0">未投递</a-select-option>
                                <a-select-option value="1">待初审</a-select-option>
                                <a-select-option value="2">已退回</a-select-option>
                                <a-select-option value="3">待外审</a-select-option>
                                <a-select-option value="4">待录用</a-select-option>
                                <a-select-option value="5">已录用</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="start">
                    <a-col :span="24">
                        <a-form-item label="稿件" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
                            <a :href="`${this.$backEnd}/api/static/${editFile}`" target="_blank">{{ editFile }}</a>
                            <a :href="`${this.$backEnd}/api/paper/download?filename=${editFile}`" style="margin-left:30px"
                                >下载</a
                            >
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-divider orientation="left">用户相关</a-divider>
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24">
                        <a-form-item label="所属用户ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['uid']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="联系方式" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
                            <a-input v-decorator="['concat']" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
        <a-modal v-model="newVisible" title="新增稿件" okText="确认添加" cancelText="取消" @ok="addNew" :width="700">
            <a-form :form="newForm" @submit="addNew">
                <a-form-item label="稿件所属用户" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input
                        v-decorator="[
                            'uid',
                            {
                                rules: [{ required: true, message: '所属用户ID不能为空' }],
                            },
                        ]"
                        placeholder="投稿人ID"
                    />
                </a-form-item>
                <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                        v-decorator="[
                            'title',
                            {
                                rules: [{ required: true, message: '标题不能为空' }],
                            },
                        ]"
                        placeholder="稿件标题"
                    />
                </a-form-item>
                <a-form-item label="作者" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input
                        v-decorator="[
                            'author',
                            {
                                rules: [{ required: true, message: '作者不能为空' }],
                            },
                        ]"
                        placeholder="稿件作者"
                    />
                </a-form-item>
                <a-form-item label="概述" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-textarea
                        v-decorator="[
                            'overview',
                            {
                                rules: [{ required: true, message: '概述不能为空' }],
                            },
                        ]"
                        placeholder="稿件概述"
                    />
                </a-form-item>
                <a-form-item label="分类" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input v-decorator="['categroy']" placeholder="稿件类别" />
                </a-form-item>
                <a-form-item label="联系方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-input v-decorator="['concat']" placeholder="稿件作者的联系方式" />
                </a-form-item>
                <a-form-item label="稿件状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-select
                        placeholder="请选择"
                        v-decorator="[
                            'state',
                            {
                                rules: [{ required: true, message: '请选择稿件状态' }],
                            },
                        ]"
                    >
                        <a-select-option value="0">未投递</a-select-option>
                        <a-select-option value="1">待初审</a-select-option>
                        <a-select-option value="2">已退回</a-select-option>
                        <a-select-option value="3">待外审</a-select-option>
                        <a-select-option value="4">待录用</a-select-option>
                        <a-select-option value="5">已录用</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="上传稿件" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                    <a-upload-dragger
                        name="file"
                        :multiple="true"
                        :customRequest="fileCustomRequest"
                        :beforeUpload="beforeUpload"
                        :remove="removeFile"
                        :fileList="fileList"
                        @change="handleChange"
                    >
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                            点击或拖动图片上传稿件
                        </p>
                        <p class="ant-upload-hint">
                            稿件大小不得超过 5MB
                        </p>
                    </a-upload-dragger>
                    <!-- <a :href="`${this.$backEnd}/api/static/中小型在线投稿系统的设计与实现_肖光华.pdf`">111</a> -->
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
        width: '10%',
    },
    {
        title: '稿件标题',
        dataIndex: 'title',
        width: '20%',
    },
    {
        title: '投递时间',
        dataIndex: 'time',
        width: '20%',
    },
    {
        title: '稿件状态',
        dataIndex: 'state',
        width: '20%',
        scopedSlots: { customRender: 'state' },
        filters: [
            {
                text: '未投递',
                value: '0',
            },
            {
                text: '待初审',
                value: '1',
            },
            {
                text: '已退回',
                value: '2',
            },
            {
                text: '待外审',
                value: '3',
            },
            {
                text: '待录用',
                value: '4',
            },
            {
                text: '已录用',
                value: '5',
            },
        ],
        onFilter: (value, record) => record.state.toString() === value,
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];
const stateList = ['未投递', '待初审', '已退回', '待外审', '待录用', '已录用'];
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
            editPaper: '',
            fileList: [],
            editFile: '',
            editState: '0',
        };
    },
    created() {
        this.getPaperList();
    },
    methods: {
        getPaperList() {
            this.$axios.get(`${this.$backEnd}/api/admin/paperlist?`).then((res) => {
                this.list = res.data.data;
                console.log(this.list);
                this.dataList = res.data.data;
            });
        },
        searchPaper() {
            if (!this.searchText) {
                this.$message.info('请输入要查询的用户id');
                return;
            }
            this.dataList = this.list.filter((item) => {
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
                    if (this.fileList.length == 0) {
                        this.$message.info('请上传稿件');
                        return;
                    }
                    let obj = { file: this.fileList[0].name };
                    Object.assign(value, obj);
                    this.$axios.post(`${this.$backEnd}/api/admin/addPaper`, value).then((res) => {
                        console.log(res);
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.newVisible = false;
                            this.getPaperList();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
            });
        },
        delPaper(paper) {
            console.log(paper.pid);
            this.$confirm({
                title: '确定删除该用户吗？',
                content: (h) => <div style="color:red;">执行此操作后，将无法恢复数据</div>,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    console.log('OK');
                    this.$axios.get(`${this.$backEnd}/api/admin/deletePaper?pid=${paper.pid}`).then((res) => {
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.getPaperList();
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
        showEdit(paper) {
            this.editPaper = paper;
            const { pid, title, author, state, uid, overview, file, concat } = this.editPaper;
            this.editVisible = true;
            this.$nextTick(() => {
                this.editFile = file;
                const obj = {
                    pid,
                    title,
                    author,
                    uid,
                    state,
                    concat,
                };
                this.editForm.setFieldsValue(obj);
            });
        },
        saveEdit() {
            this.editForm.validateFields({ first: true, force: true }, (err, value) => {
                if (!err) {
                    console.log(value);
                    this.$axios.post(`${this.$backEnd}/api/admin/editPaper`, value).then((res) => {
                        console.log(res);
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.editVisible = false;
                            this.getPaperList();
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
        stateFilter(state) {
            const str = stateList[state];
            if (!str) {
                return '';
            }
            return str;
        },
        beforeUpload(file, fileList) {
            const reg = /\.(doc|docx|pdf|caj)(\?.*)?$/;
            return new Promise((resolve, reject) => {
                if (this.fileList.length > 0) {
                    this.$message.error('只能上传一个文件');
                    reject('只能上传一个文件');
                }
                if (reg.test(file.name)) {
                    resolve();
                } else {
                    this.$message.error(`请上传正确的文件格式`);
                    reject(new Error('请上传正确的文件格式'));
                }
            });
        },
        async fileCustomRequest(options) {
            console.log('options', options);
            const formData = new FormData();
            formData.append('file', options.file);
            let progress = { percent: 1 };
            const intervalId = setInterval(() => {
                if (progress.percent < 100) {
                    progress.percent++;
                    options.onProgress(progress);
                } else {
                    clearInterval(intervalId);
                }
            }, 100);
            await this.$axios
                .post(`${this.$backEnd}/api/paper/upload`, formData)
                .then((res) => {
                    this.$message.success(`上传成功`);
                    progress == 100;
                    options.onSuccess();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        removeFile(file) {
            this.fileList.pop();
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
    },
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
