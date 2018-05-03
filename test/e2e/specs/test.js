// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'my-login-page': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('.my-login-page')
      .assert.containsText('#email label', 'E-Mail Address')
      .assert.containsText('#password label', 'Password')
      .assert.containsText('button', 'Login')
      .assert.elementCount('img', 0)
      .end()
  }
}
