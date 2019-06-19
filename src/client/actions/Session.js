const SessionActions = {
  /**
   * Handle a user login
   * @param  {Object} credentials Credential data
   * @return {Promise}
   */
  login(credentials) {
    const payload = {
      ...credentials
    };
    /* return axios.post('/api/session/login', payload)
      .then((res) => {
        const { session, token } = res.data;
        if (session && token) {
          localStorage.session = JSON.stringify(session);
          localStorage.token = token;
          // Set Headers on Async Router
          return res.data;
        }
        return res.data;
      }); */
  },

  /**
   * Handle logging out
   * @return null
   */
  logout() {
    delete localStorage.session;
    delete localStorage.token;
    window.location = '/login';
    return null;
  }
};

export default SessionActions;
