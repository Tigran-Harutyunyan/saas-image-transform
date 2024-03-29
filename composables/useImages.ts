export const useImages = (userID?: string) => {

    const getPageNumber = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.has("page") ? Number(searchParams.get("page")) : 1;
    };

    const page = ref(getPageNumber());

    const url = userID ? `/api/user/${userID}/images` : "/api/images";

    const getQuery = () => {
        return new URLSearchParams(location.search).get("query") || "";
    };

    const { data: images, refresh, pending } = useAsyncData("images", () =>
        $fetch(url, {
            method: "post",
            body: userID ? { page: page.value } : { page: page.value, searchQuery: getQuery() },
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