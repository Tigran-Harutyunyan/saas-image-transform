export const useImages = (all = false) => {

    const getPageNumber = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.has("page") ? Number(searchParams.get("page")) : 1;
    };

    const page = ref(getPageNumber());

    const url = all ? `/api/images?all=true` : "/api/user/images";

    const getQuery = () => {
        return new URLSearchParams(location.search).get("query") || "";
    };

    const { data: images, refresh, pending } = useAsyncData("images", () =>
        $fetch(url, {
            method: "post",
            body: all ? { page: page.value, searchQuery: getQuery() } : { page: page.value },
        })
    );

    watch(
        () => useRoute().fullPath,
        () => {
            page.value = getPageNumber();
            refresh();
        }, {
        deep: true
    }
    );

    return {
        page,
        images,
        pending,
        getPageNumber
    }

}