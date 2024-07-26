import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast'

import { http } from '@utils/http'

const useDelete = url => {
    const {
        trigger,
        isMutating,
        error: mutateError,
    } = useSWRMutation(url, () => http.delete(url), {
        onSuccess: resp => (resp?.data ? toast.success(resp?.data?.detail) : null),
    })

    return {
        wait: isMutating,
        confirm: trigger,
        err: mutateError,
    }
}

export default useDelete
