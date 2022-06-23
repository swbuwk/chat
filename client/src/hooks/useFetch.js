import { useState } from "react";

function useFetch(callback) {
    const [isLoading, setIsLoading] = useState(true)

    const fetching = async () => {
        setIsLoading(true)
        await callback()
        setIsLoading(false)
    }

    return [isLoading, fetching]
}

export default useFetch