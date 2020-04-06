<template>
    <div class="container">
        <div class="title" style="padding-bottom:20px;border-bottom:1px solid #eee">
            权限管理
        </div>
        <div class="table-page-search-wrapper" style="margin-bottom:30px">
            <a-form layout="inline" :form="searchForm" @submit="searchEditor">
                <a-row type="flex" justify="center" align="middle">
                    <a-col :md="12" :sm="24">
                        <a-input-group compact>
                            <a-select size="large" v-model="searchType" v-decorator="['type']" style="width:20%">
                                <a-select-option value="uid">审稿人ID</a-select-option>
                                <a-select-option value="nickname">昵称</a-select-option>
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
                            <a-button style="margin-left:20px" type="primary" @click="searchEditor">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <a-table :columns="columns" :rowKey="record => record.uid" :dataSource="dataList">
            <span slot="nickname" slot-scope="text">
                <span>{{ text ? text : '未填写' }}</span>
            </span>
            <span slot="occupation" slot-scope="text">
                <span>{{ text == 'editor' ? '编辑' : '专家' }}</span>
            </span>
            <span slot="action">
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()"> 编辑权限 <a-icon type="down" /> </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a-form :form="powerForm">
                                <a-form-item style="margin-bottom:5px">
                                    <a-checkbox-group :options="plainOptions" v-model="powerList" @change="powerOnChange" />
                                </a-form-item>
                                <a-form-item style="margin-bottom:0">
                                    <a-button type="primary" size="small" style="margin-right:30px">保存</a-button>
                                    <a-button size="small">取消</a-button>
                                </a-form-item>
                            </a-form>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </span>
        </a-table>
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
        title: '用户昵称',
        dataIndex: 'nickname',
        scopedSlots: { customRender: 'nickname' },
        width: '20%'
    },
    {
        title: '职位',
        dataIndex: 'occupation',
        width: '20%',
        scopedSlots: { customRender: 'occupation' },
        filters: [
            {
                text: '编辑',
                value: 'editor'
            },
            {
                text: '专家',
                value: 'profess'
            }
        ],
        onFilter: (value, record) => record.occupation.indexOf(value) === 0
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
            powerForm: this.$form.createForm(this),
            plainOptions: ['初审', '外审', '录用'],
            powerList: ['初审'],
            searchForm: this.$form.createForm(this),
            searchText: '',
            searchType: 'uid',
            dataList: [],
            list: []
        };
    },
    created() {
        this.$axios.get(`${this.$backEnd}/api/admin/userlist?role='editor'`).then(res => {
            this.list = res.data.data;
            this.dataList = res.data.data;
        });
    },
    methods: {
        searchEditor() {},
        reset() {},
        powerOnChange(e) {},
        editPower(item) {
            console.log(1);
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
