export default () => `
<form id="form" method="POST">

  <div class="container mx-auto">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>
  </div>

  <div class="container mx-auto">
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>
  </div>

  <div class="container mx-auto">
    <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
  </div>

  <div class="container">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw"><a href="#" data-navigo >Forgot password?</a> or new user signup <a href="/Signup"  data-navigo >here</a> </span>
  </div>
</form>
`;
