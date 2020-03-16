<template>
    <div id="app">
        <!-- <LoginLayout></LoginLayout> -->
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    mounted() {
        window.addEventListener('unload', this.saveState);
    },
    methods: {
        saveState() {
            sessionStorage.setItem('state', JSON.stringify(this.$store.state));
        }
    }
};
</script>
<style lang="less">
#app {
    height: 100%;
}
</style>
