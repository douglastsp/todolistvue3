<template>
    <div class="space-y-2">
        <TodoItem v-for="(n, index) of 5" :key="index" />
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
    components: { TodoItem }
}
</script>

<style>

</style>