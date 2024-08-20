import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { onActivated, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useBreadcrumbsStore, usePageStore } from '..';
import { storeToRefs } from 'pinia';

interface Params {
    targetObjects: Record<string, unknown>[];
    notUsedHooks?: boolean;
    isHidden?: boolean;
}

function getCountIsObjectLabels(route: RouteLocationNormalizedLoaded) {
    let counter = 0;

    if (route.meta.isObject) counter++;

    counter += route.matched.reduce((count, matchedRoute) => {
        return matchedRoute.meta.isObject ? ++count : count;
    }, 0);

    return counter;
}

export default function usePage(
    params: Params = {
        targetObjects: [],
        notUsedHooks: false,
        isHidden: false,
    },
) {
    const { targetObjects, notUsedHooks, isHidden } = params;

    const cache = ref<Record<string, Record<string, unknown>[]>>({});

    /* STORES */
    const { toggleHideBreadcrumbs, setHideBreadcrumbs } = useBreadcrumbsStore();
    const { excludeRoutes } = storeToRefs(useBreadcrumbsStore());
    const pageStore = usePageStore();
    /* STORES */

    if (targetObjects?.length) {
        cache.value[pageStore.currentPage.name as string] = targetObjects;
    }

    /* METHODS */
    const replaceTargetObjects = (targetObjects: Record<string, unknown>[]) => {
        pageStore.replaceTargetObjects(targetObjects);
        cache.value[pageStore.currentPage.name as string] = targetObjects;
    };

    function handleReplace() {
        if (
            !targetObjects.length &&
            !cache.value[pageStore.currentPage.name as string]?.length
        )
            return;

        pageStore.replaceTargetObjects(
            targetObjects.length
                ? targetObjects
                : cache.value[pageStore.currentPage.name as string],
        );
    }

    function addTargetObject(targetObject: Record<string, unknown>) {
        pageStore.addTargetObject(targetObject);
    }

    function calculateHideBreadcrumbs() {
        if (isHidden) {
            setHideBreadcrumbs(true);
            return true;
        }

        const excludedRoute = excludeRoutes.value.find(
            (routeName) => routeName === pageStore.currentPage.name,
        );

        if (excludedRoute) {
            setHideBreadcrumbs(true);
            return true;
        } else setHideBreadcrumbs(false);
    }
    /* METHODS */

    /* HOOKS */
    if (!notUsedHooks) {
        onMounted(() => {
            if (calculateHideBreadcrumbs()) return;
            handleReplace();
        });

        onActivated(() => {
            if (calculateHideBreadcrumbs()) return;
            handleReplace();
        });
    }

    onBeforeRouteLeave((to, from) => {
        const devideCount =
            getCountIsObjectLabels(to) - getCountIsObjectLabels(from);

        if (devideCount >= 0) return true;

        pageStore.removeLastObjects(devideCount * -1);
    });
    /* HOOKS */

    return {
        addTargetObject,
        replaceTargetObjects,
        toggleHideBreadcrumbs,
    };
}
