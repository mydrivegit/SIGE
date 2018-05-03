<template>
 <div class="my-login-page">
      <div class="card-wrapper">
        <div class="brand">
        </div>
      <div class="card fat col-11">
        <div class="card-body">
          <h4 class="card-title">Login</h4>
            <form>
              <div id="email" class="form-group">
                <label  class="text-left  w-100" >E-Mail Address</label>
                <input type="email" class="form-control" required autofocus>
              </div>
              <div id="password" class="form-group">
                <label class="text-left  w-100" >Password
                <!-- <a href="./assets/forgot.html" class="float-right">
                Forgot Password?
                </a> -->
                </label>
                <input type="password" class="form-control" required>
              </div>
              <div class="form-group">
                <button class="btn btn-secondary btn-block">
                Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-login-page {
  height: 100vh;
  background-color: #f7f9fb;
  font-size: 14px;
  overflow: hidden;
}

.my-login-page .brand {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
  margin: 40px auto;
  box-shadow: 0 0 40px rgba(0,0,0,.05);
}

.my-login-page .brand img {
  width: 90%;
}

.my-login-page .card-wrapper {
  width: 400px;
  margin: 0 auto;
}

.my-login-page .card {
  border-color: transparent;
  box-shadow: 0 0 40px rgba(0,0,0,.05);
}
</style>
