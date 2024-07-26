import { toast } from 'react-hot-toast'

import { rawHttp } from '@utils/http'
import { saveToken } from '@utils/helpers'

export const switchRole = (url, { arg: role }) =>
    rawHttp.post(url, role).then(({ data }) => {
        saveToken(data?.token)
        toast.success('Role is switched successfully')
    })
