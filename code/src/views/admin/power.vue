<template>
    <div class="container">
        <div class="title" style="padding-bottom: 20px; border-bottom: 1px solid #eee;">
            权限管理
        </div>
        <div class="table-page-search-wrapper" style="margin-bottom: 30px;">
            <a-form layout="inline" :form="searchForm" @submit="searchEditor">
                <a-row type="flex" justify="center" align="middle">
                    <a-col :md="12" :sm="24">
                        <a-input-group compact>
                            <a-select size="large" v-model="searchType" v-decorator="['type']" style="width: 20%;">
                                <a-select-option value="uid">审稿人ID</a-select-option>
                                <a-select-option value="nickname">昵称</a-select-option>
                            </a-select>
                            <a-input
                                v-decorator="['text']"
                                v-model="searchText"
                                style="width: 80%;"
                                placeholder="input search text"
                                size="large"
                            />
                        </a-input-group>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                            <a-button style="margin-left: 20px;" type="primary" @click="searchEditor">查询</a-button>
                            <a-button style="margin-left: 8px;" @click="reset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <a-table :columns="columns" :rowKey="(record) => record.uid" :dataSource="dataList">
            <span slot="nickname" slot-scope="text">
                <span>{{ text ? text : '未填写' }}</span>
            </span>
            <span slot="occupation" slot-scope="text">
                <span>{{ text == 'editor' ? '编辑' : '专家' }}</span>
            </span>
            <span slot="action" slot-scope="text, record">
                <a class="ant-dropdown-link" @click="showModal(record)"> 编辑权限 <a-icon type="down" /> </a>
            </span>
        </a-table>
        <a-modal v-model="powerVisible" title="设置权限" okText="确认" cancelText="取消" @ok="setPower" :width="700">
            <a-form :form="powerForm" @submit="setPower">
                <a-form-item v-show="false">
                    <a-input v-decorator="['uid']"></a-input>
                </a-form-item>
                <a-form-item style="margin-bottom: 5px;">
                    <a-checkbox-group v-decorator="['power']" :options="plainOptions" />
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
        width: '20%',
    },
    {
        title: '用户昵称',
        dataIndex: 'nickname',
        scopedSlots: { customRender: 'nickname' },
        width: '20%',
    },
    {
        title: '职位',
        dataIndex: 'occupation',
        width: '20%',
        scopedSlots: { customRender: 'occupation' },
        filters: [
            {
                text: '编辑',
                value: 'editor',
            },
            {
                text: '专家',
                value: 'profess',
            },
        ],
        onFilter: (value, record) => record.occupation.indexOf(value) === 0,
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
            powerVisible: false,
            powerForm: this.$form.createForm(this),
            plainOptions: ['初审', '外审', '录用'],
            powerList: ['初审'],
            searchForm: this.$form.createForm(this),
            searchText: '',
            searchType: 'uid',
            dataList: [],
            list: [],
            editUid: '',
            editPower: '',
        };
    },
    created() {
        this.getPowerList();
    },
    methods: {
        showModal(record) {
            console.log(record);
            this.editUid = record.uid;
            const { firstCheck, secondCheck, thirdCheck } = record;
            this.editPower = this.calArray(record);
            this.powerVisible = true;
            this.$nextTick(() => {
                const obj = {
                    uid: this.editUid,
                    power: this.editPower,
                };
                this.powerForm.setFieldsValue(obj);
            });
        },
        calArray(record) {
            let arr = [];
            record.firstCheck == '1' && arr.push('初审');
            record.secondCheck == '1' && arr.push('外审');
            record.thirdCheck == '1' && arr.push('录用');
            return arr;
        },
        getPowerList() {
            this.$axios.get(`${this.$backEnd}/api/admin/getPower`).then((res) => {
                this.list = [];
                this.list = res.data;
                this.dataList = res.data;
            });
        },
        searchEditor() {
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
        setPower() {
            console.log(1);
            this.powerForm.validateFields({ first: true, force: true }, (err, value) => {
                const uid = value.uid;
                const power = value.power;
                let obj = { firstCheck: '0', secondCheck: '0', thirdCheck: '0' };
                if (power.indexOf('初审') !== -1) {
                    obj.firstCheck = '1';
                }
                if (power.indexOf('外审') !== -1) {
                    obj.secondCheck = '1';
                }
                if (power.indexOf('录用') !== -1) {
                    obj.thirdCheck = '1';
                }
                Object.assign(obj, { uid });
                console.log(obj);
                this.$axios.post(`${this.$backEnd}/api/admin/setPower`, obj).then((res) => {
                    console.log(res);
                    if (res.data.errno == 0) {
                        this.$message.success(res.data.message);
                        this.powerVisible = false;
                        this.getPowerList();
                    } else {
                        this.$message.error(res.data.message);
                        this.getPowerList();
                    }
                });
            });
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
