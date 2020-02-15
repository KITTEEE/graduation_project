<template>
    <div class="container">
        <div class="title" style="padding-bottom:20px;border-bottom:1px solid #eee">
            投递稿件
        </div>
        <a-form @submit="handleSubmit" :wrapper-col="{ span: 16 }">
            <a-form-item label="标题" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }" required>
                <a-input
                    v-decorator="[
                        'note',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your note!'
                                }
                            ]
                        }
                    ]"
                />
            </a-form-item>
            <a-form-item label="上传稿件" :label-col="{ span: 7 }" :wrapper-col="{ span: 9 }" required>
                <a-upload-dragger name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="paperUpload">
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
            </a-form-item>
            <a-form-item style="margin-top:60px" :wrapper-col="{ span: 14, offset: 7 }">
                <a-button type="primary" html-type="submit" size="large" style="margin-right:200px;width:20%">
                    投递稿件
                </a-button>
                <a-button type="primary" html-type="submit" size="large" style="width:20%">
                    保存至草稿箱
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleSubmit() {},
        handleSelectChange() {},
        paperUpload() {}
    }
};
</script>
<style lang="less"></style>
