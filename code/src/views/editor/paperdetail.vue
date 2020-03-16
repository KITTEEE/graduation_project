<template>
    <div>
        <div class="back" @click="back">
            <a-icon type="arrow-left" style="fontSize:25px;margin-right:20px" />
            <span style="font-size:20px">返回</span>
        </div>
        <!-- <a-card title="投递进度" hoverable :headStyle="headStyle">
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
        </a-card> -->
        <!-- <div style="height:50px"></div> -->
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
        <div class="btn-wrap" v-if="detailInfo.state < 5">
            <a-button type="primary" size="large" style="margin-right:100px" @click="showConfirm"> 审核通过 </a-button>
            <a-button type="danger" size="large" @click="showModal">退回稿件</a-button>
        </div>
        <a-modal
            title="请输入退改意见"
            cancelText="取消"
            okText="确认退回"
            :destroyOnClose="true"
            :visible="modalVisible"
            @cancel="closeModal"
            @ok="returnBack"
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
export default {
    data() {
        return {
            remarkText: '',
            modalVisible: false,
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
        showConfirm() {
            const that = this;
            this.$confirm({
                title: '确认通过该稿件吗？',
                cancelText: '取消',
                okText: '确认通过',
                onOk() {
                    that.pass();
                },
                onCancel() {}
            });
        },
        pass() {
            if (this.detailInfo.state == 1) {
                this.changeState(this.pid, 3);
            } else {
                this.changeState(this.pid, this.detailInfo.state + 1);
            }
        },
        returnBack() {
            if (this.remarkText == '') {
                this.$message.info('退改意见不能为空');
                return;
            }
            this.changeState(this.pid, 2, this.remarkText);
        },
        showModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
        changeState(id, state, remark = '') {
            this.$axios
                .post(`${this.$backEnd}/api/paper/changeState`, { pid: id, state: state, remark })
                .then(res => {
                    this.$message.success(res.data.message);
                    this.back();
                })
                .catch(err => {
                    console.log(err);
                });
        },
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
        }
    }
};
</script>
<style lang="less">
.btn-wrap {
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
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
