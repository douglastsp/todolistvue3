<template>
    <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
            <TodoSpinner v-if="loading"/>
            <template v-else>
              <TodoFormAdd />
              <TodoItems 
                v-if="$store.state.todos.length" 
              />
              <TodoEmpty v-else />
            </template>
            <TodoAlerts />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import TodoSpinner from '@/components/TodoSpinner.vue';
import TodoFormAdd from '@/components/TodoFormAdd.vue';
import TodoItems from '@/components/TodoItems.vue';
import TodoEmpty from '@/components/TodoEmpty.vue';
import TodoAlerts from "../components/TodoAlerts.vue"

export default {
    name: "Home",
    components: { TodoSpinner, TodoFormAdd, TodoItems, TodoEmpty, TodoAlerts },
    setup() {
      const loading = ref(false);
      const store = useStore();

      loading.value = true
      store.dispatch('getTodos')
      .finally(() => {
        loading.value = false;
      });

      return { loading }
    },
}
</script>
