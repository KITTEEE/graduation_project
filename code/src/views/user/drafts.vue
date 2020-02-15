<template>
    <div class="container">
        <div
            class="title"
            style="padding-bottom:20px;border-bottom:1px solid #eee"
        >
            草稿箱
        </div>
        <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }"
            :dataSource="data"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                <a-card hoverable>
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="delete" />
                        <a-icon type="edit" />
                    </template>
                    <a-card-meta
                        :title="item.title == '' ? '未命名标题' : item.title"
                        description=""
                    >
                    </a-card-meta>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { title: '', time: '2019-08-07', state: 1 },
                {
                    title: '标题2',
                    time: '2019-08-07',
                    state: 2
                },
                { title: '标题3', time: '2019-08-07', state: 3 }
            ]
        };
    },
    mounted() {},
    methods: {},
    filters: {}
};
</script>
<style lang="less">
.ant-card-meta-title {
    font-size: 20px;
    font-weight: 600;
}
.container {
    .title {
        margin-bottom: 40px;
        font-size: 24px;
        font-weight: 600;
        width: 100%;
        height: 100%;
    }
}
</style>
