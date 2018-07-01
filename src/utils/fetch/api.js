import axios from 'axios'
import api from '../../../config/ajax'

export default(name, params) => axios.get(api[name], {params}).catch(err => window.alert(err.message))