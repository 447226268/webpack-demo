<template>
    <h1 class="title">Hello App</h1>
    <ElButton type="primary">sbumit</ElButton>
    <ul>
        <li>
            <router-link to="/home">Home</router-link>
        </li>
        <li>
            <router-link to="/about">About</router-link>
        </li>
    </ul>

    <router-view></router-view>
</template>

<script>
import { ElButton } from "element-plus";
export default {
    name: 'App',
    data() {
        return {
            message: 'Hello Vue'
        }
    },
    components: {
        ElButton
    }
}
</script>

<style scoped>
.title {
    color: pink;
}
</style>