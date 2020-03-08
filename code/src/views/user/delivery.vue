<template>
    <div class="container">
        <div class="title" style="padding-bottom:20px;border-bottom:1px solid #eee">
            投递稿件
        </div>
        <a-form enctype="multipart/form-data" :form="form" @submit="handleSubmit" :wrapper-col="{ span: 16 }">
            <a-form-item label="标题" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }" required>
                <a-input
                    placeholder="请输入稿件标题"
                    v-decorator="[
                        'title',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标题'
                                }
                            ]
                        }
                    ]"
                />
            </a-form-item>
            <a-form-item label="作者" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }">
                <a-input v-decorator="['author']" placeholder="请输入稿件的作者" />
            </a-form-item>
            <a-form-item label="类别" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }">
                <a-input v-decorator="['categroy']" placeholder="请输入稿件所属分类" />
            </a-form-item>
            <a-form-item label="概述" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }">
                <a-textarea v-decorator="['overview']" placeholder="请简述稿件内容" :rows="5" />
            </a-form-item>
            <a-form-item label="联系方式" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }">
                <a-input v-decorator="['concat']" placeholder="留下您的联系方式，方便后续通知您" />
            </a-form-item>
            <a-form-item label="上传稿件" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }">
                <a-upload-dragger
                    name="file"
                    :multiple="true"
                    :customRequest="fileCustomRequest"
                    :beforeUpload="beforeUpload"
                    :remove="removeFile"
                    :defaultFileList="fileList.length > 0 ? fileList : []"
                    @change="paperUpload"
                    @preview="preview"
                >
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                        点击或拖动图片上传稿件
                    </p>
                    <p class="ant-upload-hint">
                        稿件大小不得超过 5MB
                    </p>
                </a-upload-dragger>
                <!-- <a :href="`${this.$backEnd}/api/static/中小型在线投稿系统的设计与实现_肖光华.pdf`">111</a> -->
            </a-form-item>
            <a-form-item style="margin-top:60px" :wrapper-col="{ span: 14, offset: 7 }">
                <a-button type="primary" size="large" style="margin-right:200px;width:20%" @click="handleSubmit">
                    投递稿件
                </a-button>
                <a-button type="primary" size="large" style="width:20%" @click="saveToDraft">
                    保存至草稿箱
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            fileList: [],
            pid: ''
        };
    },
    created() {
        if (Object.keys(this.$route.query).length == 0) {
            console.log('没带参数');
        } else {
            console.log('带了参数');
            const data = this.$route.query.item;
            this.pid = data.pid;
            console.log(this.pid);
            if (data.file) {
                this.fileList = [{ uid: '1', name: data.file, status: 'done', url: `${this.$backEnd}/api/static/${data.file}` }];
                console.log(this.fileList);
            }
            this.$nextTick(() => {
                const obj = {
                    title: data.title,
                    author: data.author,
                    categroy: data.categroy,
                    overview: data.overview,
                    concat: data.concat
                };
                this.form.setFieldsValue(obj);
            });
        }
    },
    methods: {
        beforeUpload(file, fileList) {
            const reg = /\.(doc|docx|pdf|caj)(\?.*)?$/;
            return new Promise((resolve, reject) => {
                if (this.fileList.length > 0) {
                    this.$message.error('只能上传一个文件');
                    reject('只能上传一个文件');
                }
                if (reg.test(file.name)) {
                    resolve();
                } else {
                    this.$message.error(`请上传正确的文件格式`);
                    reject(new Error('请上传正确的文件格式'));
                }
            });
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
                .then(res => {
                    const obj = {
                        uid: '1',
                        name: res.data.filename,
                        status: 'done',
                        url: `${this.$backEnd}/api/static/${res.data.filename}`
                    };
                    this.fileList.push(obj);
                    this.$message.success(`上传成功`);
                    progress == 100;
                    options.onSuccess();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        removeFile(file) {
            this.fileList.pop();
        },
        preview() {
            console.log(1);
        },
        saveToDraft(e) {
            console.log(e);
            this.form.validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    let uid = localStorage.getItem('uid');
                    let obj = {};
                    if (this.fileList.length !== 0) {
                        obj = { file: this.fileList[0].name, uid };
                    } else {
                        obj = { file: '', uid };
                    }
                    Object.assign(values, obj);
                    if (this.pid) {
                        Object.assign(values, { pid: this.pid });
                        console.log(values);
                        this.$axios.post(`${this.$backEnd}/api/paper/updateDraft`, values).then(res => {
                            if (res.data.errno == 0) {
                                this.$message.success(res.data.message);
                                // this.$router.push({ name: 'drafts' });
                            } else {
                                this.$message.error(res.data.message + ',请重试');
                            }
                        });
                    } else {
                        console.log(values);
                        this.$axios.post(`${this.$backEnd}/api/paper/saveDraft`, values).then(res => {
                            if (res.data.errno == 0) {
                                this.$message.success(res.data.message);
                                this.$router.push({ name: 'drafts' });
                            } else {
                                this.$message.error(res.data.message + ',请重试');
                            }
                        });
                    }
                }
            });
        },
        handleSubmit(e) {
            this.form.validateFields({ first: true, force: true }, (err, values) => {
                if (!err) {
                    for (var key in values) {
                        if (!values[key]) {
                            this.$message.warning('请填写完整信息');
                            return;
                        }
                    }
                    let uid = localStorage.getItem('uid');
                    let obj = { file: this.fileList[0], uid };
                    Object.assign(values, obj);
                    this.$axios.post(`${this.$backEnd}/api/paper/delivery`, values).then(res => {
                        if (res.data.errno == 0) {
                            this.$message.success(res.data.message);
                            this.$router.push({ name: 'mycontribute' });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
            });
        },
        handleSelectChange() {},
        paperUpload() {}
    }
};
</script>
<style lang="less"></style>
