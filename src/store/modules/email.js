import http from '@/helper/axois'

export default {
  actions: {
    // email Actions
    sendEmail: ({ commit }, authdata) => http.post('/email/', authdata)
  }
}
