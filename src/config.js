const defaultEndpoint = 'http://localhost:4244/'
const environment = (window.location.hostname === 'localhost') ? 'development' : 'production'
const endpoint = (environment === 'production') ? 'https://' + window.location.hostname + '/' : defaultEndpoint

export default { endpoint }
