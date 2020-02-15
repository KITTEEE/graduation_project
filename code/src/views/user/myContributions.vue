<template>
    <div class="container">
        <div class="title">我的稿件</div>
        <a-tabs defaultActiveKey="1" @change="changeState">
            <a-tab-pane tab="全部" key="1">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state >= 1"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
            <a-tab-pane tab="待初审" key="2">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state == 1"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
            <a-tab-pane tab="待外审" key="3">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state == 3"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
            <a-tab-pane tab="待录用" key="4">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state == 4"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
            <a-tab-pane tab="已录用" key="5">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state == 5"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
            <a-tab-pane tab="已退回" key="6">
                <a-list
                    class="demo-loadmore-list"
                    itemLayout="horizontal"
                    :dataSource="data"
                >
                    <a-list-item
                        slot="renderItem"
                        slot-scope="item"
                        v-show="item.state == 2"
                    >
                        <a slot="actions"></a>
                        <a slot="actions">查看详情</a>
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications"
                        >
                            <a
                                class="item-title"
                                slot="title"
                                href="https://www.antdv.com/"
                                >{{ item.name }}</a
                            >
                        </a-list-item-meta>
                        <div style="margin-right:20px">{{ item.time }}</div>
                        <div>状态: {{ item.state | state }}</div>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeKey: '',
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
    mounted() {},
    methods: {
        changeState(key) {
            // this.activeKey = key;
            // console.log(key);
        }
    },
    filters: {
        state(state) {
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
