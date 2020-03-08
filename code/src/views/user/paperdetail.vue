<template>
    <div>
        <div class="back">
            <a-icon type="arrow-left" style="fontSize:25px;margin-right:10px" />
            <span>返回</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {
        console.log('paperdetail created');
        console.log(this.$route);
    }
};
</script>
<style lang="less">
.back {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
