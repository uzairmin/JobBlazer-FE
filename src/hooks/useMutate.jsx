import { toast } from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { useFormik } from 'formik'

import { getMsg } from '@utils/helpers'

const useMutate = (url, api, initial, schema, onSubmit, onError = null, onSuccess = null) => {
    const { trigger, isMutating } = useSWRMutation(url, api, {
        onError: onError || (error => toast.error(getMsg(error))),
        onSuccess,
    })

    const { values, errors, handleSubmit, handleChange, resetForm, setFieldValue } = useFormik({
        initialValues: initial,
        validationSchema: schema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit,
    })

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
        resetForm,
        setFieldValue,
        trigger,
        wait: isMutating,
    }
}

export default useMutate
