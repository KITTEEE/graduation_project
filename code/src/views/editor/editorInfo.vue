<template>
    <div class="container">
        <div class="info-wrap">
            <div class="overview">
                <div class="avatar">
                    <a-avatar :size="100" icon="user" src="" />
                </div>
                <div class="nameintro">
                    <div class="name">姚</div>
                    <div class="intro">我是审稿人</div>
                </div>
                <a-button type="primary" shape="round" icon="edit" @click="toSetting">编辑资料</a-button>
            </div>
            <div class="detail-wrap">
                <div class="detail-item">
                    <a-icon type="mail" style="margin-right:10px"></a-icon>
                    <span class="item-label">邮箱:</span>
                    <span class="item-content">997247421@qq.com</span>
                </div>
                <div class="detail-item">
                    <a-icon type="phone" style="margin-right:10px"></a-icon>
                    <span class="item-label">手机号:</span>
                    <span class="item-content">13068920615</span>
                </div>
                <div class="detail-item">
                    <a-icon type="idcard" style="margin-right:10px" />
                    <span class="item-label">职位:</span>
                    <span class="item-content">编辑</span>
                </div>
                <div class="detail-item">
                    <a-icon type="safety" style="margin-right:10px" />
                    <span class="item-label">审核权限:</span>
                    <span class="item-content">初审</span>
                </div>
                <div class="paper-list">
                    <div class="list-title">已审核稿件</div>
                    <a-list class="demo-loadmore-list" itemLayout="horizontal" :dataSource="data">
                        <a-list-item slot="renderItem" slot-scope="item" v-show="item.state == 5">
                            <a-list-item-meta description="Ant Design, a design language for background applications">
                                <div class="item-title" slot="title">
                                    {{ item.name }}
                                </div>
                            </a-list-item-meta>
                            <div style="margin-right:20px">{{ item.time }}</div>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { name: '标题1', time: '2019-08-07', state: 1 },
                { name: '标题2', time: '2019-08-07', state: 2 },
                { name: '标题3', time: '2019-08-07', state: 3 },
                { name: '标题4', time: '2019-08-07', state: 4 },
                { name: '标题5', time: '2019-08-07', state: 5 },
                { name: '标题6', time: '2019-08-07', state: 1 },
                { name: '标题7', time: '2019-08-07', state: 2 },
                { name: '标题8', time: '2019-08-07', state: 3 },
                { name: '标题9', time: '2019-08-07', state: 4 }
            ]
        };
    },
    methods: {
        toSetting() {
            console.log(1);
            this.$router.push({ path: '/index/setting' });
        }
    }
};
</script>
<style lang="less">
.info-wrap {
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    > .overview {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        width: 40%;
        .nameintro {
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-left: 30px;
            > .name {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            > .intro {
                color: #ccc;
                font-size: 17px;
            }
        }
    }
    > .detail-wrap {
        font-size: 16px;
        width: 80%;
        .detail-item {
            height: 40px;
            line-height: 40px;
            .item-label {
                font-weight: 700;
                margin-right: 20px;
            }
            .item-content {
                letter-spacing: 1px;
                color: #bbb;
                font-size: 14px;
            }
        }
        .paper-list {
            margin-top: 30px;
            .list-title {
                font-size: 20px;
                font-weight: 600;
                padding-bottom: 20px;
                border-bottom: 1px solid #ccc;
            }
            .ant-list-item-meta-title {
                font-weight: 700;
            }
        }
    }
}
</style>
