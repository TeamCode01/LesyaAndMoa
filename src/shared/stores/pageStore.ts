import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

export const usePageStore = defineStore('page', () => {
    const route = useRoute();

    const currentPage = ref<RouteLocationNormalizedLoaded>(route);
    const targetObjects = reactive<Record<string, unknown>[]>([]);

    function addTargetObject(targetObject: Record<string, unknown>) {
        targetObjects.push(targetObject);
    }

    function replaceTargetObjects(objs: Record<string, unknown>[]) {
        targetObjects.splice(0, targetObjects.length, ...objs);
    }

    function removeLastObjects(count: number) {
        targetObjects.splice(targetObjects.length - count - 1, count);
    }

    return {
        currentPage,
        targetObjects,
        addTargetObject,
        replaceTargetObjects,
        removeLastObjects,
    };
});
