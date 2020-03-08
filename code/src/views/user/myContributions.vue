<template>
    <div class="container">
        <div class="title">我的稿件</div>
        <a-tabs :defaultActiveKey="currState" @change="changeState">
            <a-tab-pane v-for="item in tabs" :tab="item.name" :key="item.state">
                <a-skeleton :loading="loading">
                    <a-list class="demo-loadmore-list" itemLayout="horizontal" :dataSource="paperList">
                        <a-list-item slot="renderItem" slot-scope="item" v-show="item.state >= 1">
                            <a slot="actions" @click="toDetail">查看详情</a>
                            <a-list-item-meta description="Ant Design, a design language for background applications">
                                <a class="item-title" slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                            </a-list-item-meta>
                            <div style="margin-right:20px">{{ item.time }}</div>
                            <div>状态: {{ item.state | state }}</div>
                        </a-list-item>
                    </a-list>
                </a-skeleton>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
const tabs = [
    { name: '全部', state: 'all' },
    { name: '待初审', state: 1 },
    { name: '待外审', state: 3 },
    { name: '待录用', state: 4 },
    { name: '已录用', state: 5 },
    { name: '已退回', state: 2 }
];
export default {
    data() {
        return {
            tabs,
            currState: 'all',
            loading: true,
            activeKey: '',
            allPaperList: ''
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        paperList() {
            if (this.currState == 'all') {
                return this.allPaperList;
            } else {
                let list = this.allPaperList.filter(item => {
                    return item.state == this.currState;
                });
                return list;
            }
        }
    },
    async created() {
        if (!this.$store.state.userInfo) {
            let uid = localStorage.getItem('uid');
            await this.$axios.get(`${this.$backEnd}/api/users/info?uid=${uid}`).then(res => {
                this.setUserInfo(res.data);
                // this.$store.commit('setUserInfo', res.data);
                console.log('setUserInfo', res.data);
            });
        }
        this.$axios.get(`${this.$backEnd}/api/paper/list?uid=${this.$store.state.userInfo.uid}`).then(res => {
            this.allPaperList = res.data;
            this.loading = false;
        });
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        changeState(state) {
            this.currState = state;
        },
        toDetail() {
            this.$router.push({ path: '/user/paperdetail' });
        }
    },
    filters: {
        state(state) {
            console.log(typeof state);
            switch (state) {
                case 1:
                    return '待初审';
                case 2:
                    return '已退回';
                case 3:
                    return '待外审';
                case 4:
                    return '待录用';
                case 5:
                    return '已录用';
            }
        }
    }
};
</script>
<style lang="less">
.container {
    .title {
        margin-bottom: 40px;
        font-size: 24px;
        font-weight: 600;
        width: 100%;
        height: 100%;
    }
    .ant-list-item-meta-title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 20px;
    }
}
</style>
