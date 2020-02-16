<template>
    <div>
        <a-card :loading="loading" style="margin-top: 10px;font-size:20px" :bordered="false" title="待初审">
            <div slot="extra">
                <!-- <a-radio-group v-model="status">
                    <a-radio-button value="all">全部</a-radio-button>
                    <a-radio-button value="processing">进行中</a-radio-button>
                    <a-radio-button value="waiting">等待中</a-radio-button>
                </a-radio-group> -->
                <a-input-search style="margin-left: 16px; width: 272px;" />
            </div>
            <!-- <div class="operate">
                <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">添加</a-button>
            </div> -->

            <!-- <a-list size="large" :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50 }"> -->
            <a-list size="large">
                <a-list-item :key="index" v-for="(item, index) in data">
                    <a-list-item-meta :description="item.description">
                        <a-avatar slot="avatar" size="large" shape="circle" src="" />
                        <a slot="title" style="font-weight:bold">{{ item.title }}</a>
                    </a-list-item-meta>
                    <div slot="actions">
                        <a>查看详情</a>
                    </div>
                    <div slot="actions">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item><a>通过审核</a></a-menu-item>
                                <a-menu-item><a>退回稿件</a></a-menu-item>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            data: [
                { title: '标题1', time: '2019-08-07', description: '嘿嘿', state: 1, author: 'KiteYiu' },
                { title: '标题2', time: '2019-08-07', description: '嘿嘿', state: 2, author: 'KiteYiu' },
                { title: '标题3', time: '2019-08-07', description: '嘿嘿', state: 3, author: 'KiteYiu' },
                { title: '标题4', time: '2019-08-07', description: '嘿嘿', state: 4, author: 'KiteYiu' },
                { title: '标题5', time: '2019-08-07', description: '嘿嘿', state: 5, author: 'KiteYiu' },
                { title: '标题6', time: '2019-08-07', description: '嘿嘿', state: 1, author: 'KiteYiu' },
                { title: '标题7', time: '2019-08-07', description: '嘿嘿', state: 2, author: 'KiteYiu' },
                { title: '标题8', time: '2019-08-07', description: '嘿嘿', state: 3, author: 'KiteYiu' },
                { title: '标题9', time: '2019-08-07', description: '嘿嘿', state: 4, author: 'KiteYiu' }
            ]
        };
    },
    created() {
        // console.log('created');
    }
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
