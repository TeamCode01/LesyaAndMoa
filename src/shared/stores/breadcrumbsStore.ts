import { defineStore } from 'pinia';
import { WatchStopHandle, computed, reactive, ref, watch } from 'vue';
import { usePageStore } from './pageStore';
import useBreadcrumbs from '@shared/composables/useBreadcrumbs';
import { Breadcrumb } from '@shared/composables/useBreadcrumbs';

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const { currentPage, targetObjects } = usePageStore();

    /* REFS */
    const isHidden = ref(false);
    const breadcrumbs = reactive<Array<Breadcrumb>>([]);
    const excludeRoutes = reactive<Array<string>>([]);
    /* REFS */

    const hidden = computed(() => isHidden.value);

    let stopFunctionForWatch: WatchStopHandle | null = null;

    function registerWatchForPageStore() {
        stopFunctionForWatch = watch(
            [currentPage, targetObjects],
            ([newCurrentPage, newTargetObjects]) => {
                if (!newTargetObjects) return;

                if (newCurrentPage.meta.hiddenBreadcrumbs) {
                    isHidden.value = true;
                    return;
                }

                breadcrumbs.splice(
                    0,
                    breadcrumbs.length,
                    ...useBreadcrumbs({
                        route: newCurrentPage,
                        targetObjects: [...newTargetObjects],
                    }),
                );
            },
            { immediate: true },
        );
    }

    function stopWatchForPageStore() {
        stopFunctionForWatch?.();
        stopFunctionForWatch = null;
    }

    function setHideBreadcrumbs(status: boolean) {
        isHidden.value = status;
    }

    function setExcludeRoutes(routes: Array<string>) {
        excludeRoutes.splice(0, excludeRoutes.length, ...routes);
    }

    function toggleHideBreadcrumbs() {
        isHidden.value = !isHidden.value;
    }

    watch(
        isHidden,
        (newIsHidden) => {
            if (!newIsHidden) registerWatchForPageStore();
            else stopWatchForPageStore();
        },
        { immediate: true },
    );

    return {
        breadcrumbs,
        excludeRoutes,
        hidden,
        targetObjects,
        setExcludeRoutes,
        setHideBreadcrumbs,
        toggleHideBreadcrumbs,
    };
});
