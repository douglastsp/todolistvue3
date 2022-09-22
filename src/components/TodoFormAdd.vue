<template>
  <form 
    @submit.stop.prevent="addTodo"
    class="flex items-center px-4 bg-gray-900 h-15 
    rounded-sm border-l-2 border-green-400 mb-3">
    <input
        v-model="title"
        placeholder="Adicione um novo item ..."
        type="text"
        class="bg-gray-900 placeholder-gray-500 text-gray-500 
        font-light focus:outline-none block w-full appearance-none leading-normal 
        py-3 pr-3"
    >

        <button
            class="text-green-400 text-xs font-semibold 
                    focus:outline-none"
            type="submit"
        >
            ADICIONAR
        </button>
    </form>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { notify } from "notiwind";
export default {
    setup() {
        const title = ref('');
        const store = useStore();

        const addTodo = () => {
            if (!title.value) {
                notify({
                    group: "alerts",
                    title: "Atenção",
                    type: "warning",
                    text: "É necessário preencher o campo de texto"
                }, 2000);
                return false;
            }
            store.dispatch('addTodo', {
               title: title.value,
               completed: false 
            }).finally(() => {
                title.value = '';
                notify({
                    group: "alerts",
                    title: "Sucesso",
                    type: "success",
                    text: "Nova tarefa adicionada"
                }, 2000);
            });
        }

        return { title, addTodo };
    }
}
</script>

<style>

</style>