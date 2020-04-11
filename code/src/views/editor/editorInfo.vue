<template>
    <div class="container">
        <div class="info-wrap">
            <div class="overview">
                <div class="avatar" @click="showModal">
                    <a-avatar
                        :size="100"
                        icon="user"
                        :src="userInfo.avatar ? `${this.$backEnd}/api/static/${userInfo.avatar}` : ''"
                    />
                </div>
                <div class="nameintro">
                    <div class="name">{{ userInfo.nickname }}</div>
                    <div class="intro">{{ userInfo.intro || '' }}</div>
                </div>
                <a-button type="primary" shape="round" icon="edit" @click="toSetting">编辑资料</a-button>
            </div>
            <div class="detail-wrap">
                <div class="detail-item">
                    <a-icon type="mail" style="margin-right:10px"></a-icon>
                    <span class="item-label">邮箱:</span>
                    <span class="item-content">{{ userInfo.email || '未填写' }}</span>
                </div>
                <div class="detail-item">
                    <a-icon type="phone" style="margin-right:10px"></a-icon>
                    <span class="item-label">手机号:</span>
                    <span class="item-content">{{ userInfo.phone || '未填写' }}</span>
                </div>
                <div class="detail-item">
                    <a-icon type="idcard" style="margin-right:10px" />
                    <span class="item-label">职位:</span>
                    <span class="item-content">{{ userInfo.occupation == 'editor' ? '编辑' : '专家' }}</span>
                </div>
                <div class="detail-item">
                    <a-icon type="safety" style="margin-right:10px" />
                    <span class="item-label">审核权限:</span>
                    <span class="item-content">{{ calPower(power) }}</span>
                </div>
            </div>
        </div>
        <a-modal title="上传头像" :visible="visible" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="确认更换">
            <a-upload
                listType="picture-card"
                :fileList="fileList"
                :customRequest="fileCustomRequest"
                accept=".png,.jpg"
                @preview="handlePreview"
                @change="handleChange"
            >
                <div class="testtest" v-if="fileList.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">点击上传</div>
                </div>
            </a-upload>
        </a-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            fileList: [],
            visible: false,
            avatar: '',
        };
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.userInfo,
            power: (state) => state.power,
        }),
    },
    async created() {
        await this.getPower(this.userInfo.uid);
    },
    methods: {
        ...mapActions(['getPower']),
        showModal() {
            this.visible = true;
        },
        async fileCustomRequest(options) {
            console.log('options', options);
            const formData = new FormData();
            formData.append('file', options.file);
            let progress = { percent: 1 };
            const intervalId = setInterval(() => {
                if (progress.percent < 100) {
                    progress.percent++;
                    options.onProgress(progress);
                } else {
                    clearInterval(intervalId);
                }
            }, 100);
            await this.$axios
                .post(`${this.$backEnd}/api/paper/upload`, formData)
                .then((res) => {
                    console.log(this.fileList);
                    this.$message.success(`上传成功`);
                    progress == 100;
                    options.onSuccess();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleOk() {
            if (this.fileList.length > 0) {
                const params = { uid: this.userInfo.uid, avatar: this.fileList[0].name };
                console.log(params);
                this.$axios
                    .post(`${this.$backEnd}/api/users/uploadAvatar`, params)
                    .then((res) => {
                        this.$message.success(res.data.message);
                        this.$axios.get(`${this.$backEnd}/api/users/info?uid=${this.userInfo.uid}`).then((res) => {
                            this.$store.commit('setUserInfo', res.data);
                            this.visible = false;
                        });
                    })
                    .catch((err) => {
                        this.$message.error(err.data.message);
                    });
            } else {
                this.$message.info('请先上传图片');
            }
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleCancel() {
            this.visible = false;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
        toSetting() {
            this.$router.push({ path: '/editor/setting' });
        },
        calPower(power) {
            const { firstCheck, secondCheck, thirdCheck } = power;
            let arr = [];
            if (firstCheck == 1) {
                arr.push('初审');
            }
            if (secondCheck == 1) {
                arr.push('外审');
            }
            if (thirdCheck == 1) {
                arr.push('录用');
            }
            console.log(arr);
            let str = arr.join('、');
            console.log(str);
            return str;
        },
    },
};
</script>
<style lang="less">
.ant-modal-body {
    > span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 200px;
    }
}
.ant-upload.ant-upload-select-picture-card {
    margin: 0 auto;
    position: absolute;
    width: 200px !important;
    height: 200px !important;
}
.ant-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
    width: 200px;
    margin: 0 auto;
}
.ant-upload-list-item .ant-upload-list-item-done {
    width: 200px !important;
    height: 200px !important;
}
.ant-upload-list-picture-card .ant-upload-list-item {
    width: 200px !important;
    height: 200px !important;
}
.ant-upload-list-picture-card .ant-upload-list-item-info {
    display: flex;
    flex-direction: row;
    align-items: center;
}
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
