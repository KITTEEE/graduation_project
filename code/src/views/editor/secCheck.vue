<template>
    <div>
        <a-card :loading="loading" style="margin-top: 10px;font-size:20px" :bordered="false" title="待外审">
            <div slot="extra">
                <a-input-search style="margin-left: 16px; width: 272px;" />
            </div>
            <a-list size="large">
                <a-list-item :key="index" v-for="(item, index) in list">
                    <a-list-item-meta :description="item.overview">
                        <a-avatar icon="user" slot="avatar" size="large" shape="circle" src="" />
                        <a slot="title" style="font-weight:bold">{{ item.title }}</a>
                    </a-list-item-meta>
                    <div slot="actions" @click="toDetail(item)">
                        <a>查看详情</a>
                    </div>
                    <div slot="actions">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item @click="pass(item)"><a>通过审核</a></a-menu-item>
                                <a-menu-item @click="returnBack(item)"><a>退回稿件</a></a-menu-item>
                            </a-menu>
                            <a>更多<a-icon type="down"/></a>
                        </a-dropdown>
                    </div>
                    <div class="list-content">
                        <div class="list-content-item">
                            <span>作者</span>
                            <p>{{ item.author }}</p>
                        </div>
                        <div class="list-content-item">
                            <span>投稿时间</span>
                            <p>{{ item.time }}</p>
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </a-card>
        <a-modal
            title="请输入退改意见"
            cancelText="取消"
            okText="确认退回"
            :destroyOnClose="true"
            :visible="modalVisible"
            @cancel="modalClose"
            @ok="handleOk"
        >
            <a-textarea
                placeholder="Autosize height with minimum and maximum number of lines"
                :autosize="{ minRows: 6, maxRows: 12 }"
                v-model="remarkText"
            />
        </a-modal>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            modalVisible: false,
            loading: true,
            remarkText: '',
            list: [],
            item: '',
        };
    },
    created() {
        this.getList();
    },
    methods: {
        ...mapActions(['getPower']),
        modalClose() {
            this.modalVisible = false;
        },
        handleOk() {
            if (this.remarkText.trim() == '') {
                this.$message.info('退回意见不能为空');
                return;
            }
            this.$axios
                .post(`${this.$backEnd}/api/paper/returnBack`, {
                    pid: this.item.pid,
                    laststate: this.item.state,
                    remark: this.remarkText,
                })
                .then((res) => {
                    this.$message.success(res.data.message);
                    this.getList();
                    this.modalVisible = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async toDetail(item) {
            if (!(await this.checkPower())) {
                this.$message.info('暂无审核权限');
                return;
            }
            this.$router.push({ path: '/editor/paperdetail', query: { id: item.pid } });
        },
        async pass(item) {
            if (!(await this.checkPower())) {
                this.$message.info('暂无审核权限');
                return;
            }
            this.changeState(item.pid, 4);
        },
        async returnBack(item) {
            if (!(await this.checkPower())) {
                this.$message.info('暂无审核权限');
                return;
            }
            this.item = item;
            this.modalVisible = true;
        },
        async changeState(id, state, remark = '') {
            if (!(await this.checkPower())) {
                this.$message.info('暂无审核权限');
                return;
            }
            this.$axios
                .post(`${this.$backEnd}/api/paper/changeState`, { pid: id, state: state, remark })
                .then((res) => {
                    this.$message.success(res.data.message);
                    this.getList();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getList() {
            this.$axios
                .get(`${this.$backEnd}/api/paper/editList?state=3`)
                .then((res) => {
                    console.log(res);
                    this.list = res.data;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async checkPower() {
            const uid = this.$store.state.power.uid;
            console.log('power', this.$store.state.power);
            let result = await this.getPower(uid).then((res) => {
                return this.$store.state.power.secondCheck == 1;
            });
            console.log(result);
            return result;
        },
    },
};
</script>
<style lang="less">
.list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
