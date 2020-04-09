<template>
    <div>
        <div class="back" @click="back">
            <a-icon type="arrow-left" style="fontSize:25px;margin-right:20px" />
            <span style="font-size:20px">返回</span>
        </div>
        <a-card title="投递进度" hoverable :headStyle="headStyle">
            <a-steps :current="current" :status="status" style="margin:30px 0">
                <a-step title="初审" description="编辑初审"> </a-step>
                <a-step title="外审" description="专家外审"> </a-step>
                <a-step title="录用"> </a-step>
            </a-steps>
            <div style="margin-top:30px;color:red" v-show="detailInfo.state == 2">
                <p>很抱歉，您的稿件已被退回，建议修改后重新投递</p>
                <div class="opnion">
                    <p>退改意见：</p>
                    <p style="color:grey;width:50%">
                        {{ detailInfo.remark ? detailInfo.remark : '' }}
                    </p>
                </div>
            </div>
            <div style="margin-top:30px" v-show="detailInfo.state == 5">
                <p>恭喜您，您的稿件已被录用</p>
            </div>
        </a-card>
        <div style="height:50px"></div>
        <a-card title="稿件详情" hoverable :headStyle="headStyle">
            <div class="detail-item">
                <span class="suffix">稿件标题:</span>
                <span class="content">{{ detailInfo.title }}</span>
            </div>
            <div class="detail-item">
                <span class="suffix">作者:</span>
                <span class="content">{{ detailInfo.author }}</span>
            </div>
            <div class="detail-item">
                <span class="suffix">联系方式:</span>
                <span class="content">{{ detailInfo.concat }}</span>
            </div>
            <div class="detail-item">
                <span class="suffix">分类:</span>
                <span class="content">{{ detailInfo.categroy }}</span>
            </div>
            <div class="detail-item">
                <span class="suffix">概述:</span>
                <span class="content">{{ detailInfo.overview }}</span>
            </div>
            <div class="detail-item" style="margin-top:20px">
                <span class="suffix">稿件:</span>
                <a :href="`${this.$backEnd}/api/static/${detailInfo.file}`" target="_blank">{{ detailInfo.file }}</a>
                <a :href="`${this.$backEnd}/api/paper/download?filename=${this.detailInfo.file}`" style="margin-left:30px"
                    >下载</a
                >
            </div>
        </a-card>
        <a-row type="flex" justify="space-around" style="margin-top:30px">
            <a-col>
                <a-button type="primary" size="large" @click="editPaper"> 修改稿件 </a-button>
            </a-col>
            <a-col>
                <a-button type="danger" size="large" @click="backPaper"> 撤回稿件 </a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pid: '',
            headStyle: { fontSize: '20px', fontWeight: 200 },
            current: 0,
            status: 'process',
            detailInfo: ''
        };
    },
    created() {
        this.pid = this.$route.query.id;
        const pid = this.pid;
        this.$axios
            .get(`${this.$backEnd}/api/paper/detail?pid=${pid}`)
            .then(res => {
                console.log('稿件详情', res);
                if (res.data.length == 0) {
                    this.$message.error('获取稿件信息失败，请返回重试');
                    return;
                }
                this.detailInfo = res.data;
                this.calCurrent();
            })
            .catch(err => {
                console.log('稿件详情失败', err);
            });
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        download() {
            this.$axios.get(`${this.$backEnd}/api/paper/download?filename=${this.detailInfo.file}`).then(res => {
                console.log(res);
            });
        },
        calCurrent() {
            const arr = [0, 0, '', 1, 2, 5];
            if (this.detailInfo.state == 1) {
                this.current = 0;
            } else if (this.detailInfo.state == 2) {
                this.current = arr[this.detailInfo.laststate];
                this.status = 'error';
            } else if (this.detailInfo.state == 3) {
                this.current = 1;
            } else if (this.detailInfo.state == 4) {
                this.current = 2;
            } else if (this.detailInfo.state == 5) {
                this.current = 2;
                this.status = 'finish';
            }
            console.log(this.current);
        },
        backPaper() {
            const _this = this;
            this.$confirm({
                title: '您确定要撤回该稿件吗',
                content: '撤回后的稿件将变为草稿状态',
                okText: '撤回稿件',
                cancelText: '取消',
                onOk() {
                    _this
                        .changeToDeliver()
                        .then(res => {
                            console.log(res);
                            _this.$message.success('撤回成功');
                        })
                        .catch(err => {
                            _this.$message.errno('撤回失败，请重试');
                        });
                },
                onCancel() {}
            });
        },
        editPaper() {
            this.$router.push({
                path: '/user/delivery',
                query: { item: this.detailInfo }
            });
        },
        changeToDeliver() {
            return new Promise((reslove, reject) => {
                this.$axios
                    .post(`${this.$backEnd}/api/paper/changeState`, { pid: this.pid, state: 0, remark: '' })
                    .then(res => {
                        console.log(res);
                        reslove(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
    }
};
</script>
<style lang="less">
.ant-card-hoverable {
    cursor: default !important;
}
.back {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    margin-bottom: 30px;
    width: 15%;
}
.opnion {
    color: grey;
    display: flex;
    flex-direction: row;
}
.detail-item {
    display: flex;
    flex-direction: row;
    min-height: 50px;
    .suffix {
        display: inline-block;
        width: 10%;
        font-weight: bold;
        margin-right: 50px;
    }
    .content {
        width: 40%;
    }
}
</style>
