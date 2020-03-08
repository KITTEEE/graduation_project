<template>
    <div class="container">
        <div class="title" style="padding-bottom:20px;border-bottom:1px solid #eee">
            草稿箱
        </div>
        <a-skeleton :loading="loading">
            <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }" :dataSource="draftList">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-card :title="item.title == '' ? '未命名标题' : item.title" :headStyle="{ fontWeight: 'bold' }" hoverable>
                        <template class="ant-card-actions" slot="actions">
                            <a-popconfirm title="确定删除草稿吗？" @confirm="deleteDraft(item)" okText="确定" cancelText="取消">
                                <a-icon type="delete" />
                            </a-popconfirm>
                            <a-icon type="edit" @click="editDraft(item)" />
                        </template>
                        <a-card-meta headStyle :description="`上次编辑: ${item.time}`"></a-card-meta>
                    </a-card>
                </a-list-item>
            </a-list>
        </a-skeleton>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            draftList: ''
        };
    },
    async created() {
        await this.getPaperList();
    },
    methods: {
        getPaperList() {
            const uid = localStorage.getItem('uid');
            this.$axios.get(`${this.$backEnd}/api/paper/list?uid=${uid}`).then(res => {
                const list = res.data;
                this.draftList = list.filter(item => {
                    return item.state == 0;
                });
                this.loading = false;
            });
        },
        editDraft(item) {
            this.$router.push({
                path: '/user/delivery',
                query: { item }
            });
        },
        deleteDraft(item) {
            const { pid } = item;
            this.$axios.post(`${this.$backEnd}/api/paper/delete`, { pid }).then(res => {
                console.log(res);
                if (res.data.errno == 0) {
                    this.$message.success(res.data.message);
                    this.getPaperList();
                } else {
                    this.$message.errno(res.data.message);
                }
            });
        }
    }
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
