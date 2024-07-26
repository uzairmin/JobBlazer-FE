export const LOGGER_HEADS = ['user id', 'level', 'error', '#line', 'path', 'method', 'status', 'created at']
export const ERROR_LOGGER_HEADS = [
    'log_message',
    'user',
    'level',
    'error_message',
    'error_line',
    'path',
    '#line',
    'method',
    'status',
    'created',
]

export const logTypes = [
    { label: 'debug', value: 'DEBUG' },
    { label: 'info', value: 'INFO' },
    { label: 'warning', value: 'WARNING' },
    { label: 'error', value: 'ERROR' },
    { label: 'critical', value: 'CRITICAL' },
]

export const requestTypes = [
    { label: 'get', value: 'GET' },
    { label: 'post', value: 'POST' },
    { label: 'put', value: 'PUT' },
    { label: 'patch', value: 'PATCH' },
    { label: 'delete', value: 'DELETE' },
]
