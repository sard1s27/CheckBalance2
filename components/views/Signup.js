export default () => `
<form id="register-form" method="post">
<div class="form-group row">
    <label for="firstName" class="col-md-2 col-form-label">First Name</label>
    <div class="col-md-10">
        <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" />
    </div>
</div>
<div class="form-group row">
    <label for="lastName" class="col-md-2 col-form-label">Last Name</label>
    <div class="col-md-10">
        <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" />
    </div>
</div>
<div class="form-group row">
    <label for="userName" class="col-md-2 col-form-label">User Name</label>
    <div class="col-md-10">
        <input type="text" class="form-control" id="username" name="username" placeholder="User Name" />
    </div>
</div>
<div class="form-group row">
  <label for="password" class="col-md-2 col-form-label">Password</label>
    <div class="col-md-10">
        <input type="text" class="form-control" id="password" name="password" placeholder="Password" />
    </div>
</div>
<div class="form-group row">
  <label for="tel" class="col-md-2 col-form-label">Contact Telephone Number</label>
    <div class="col-md-10">
      <input type="tel" class="form-control" name="telNum" placeholder="Tel. number" />
    </div>
</div>
<div class="form-group row">

    <label for="email" class="col-md-2 col-form-label">Email</label>
    <div class="col-md-10">
        <input type="email" class="form-control" id="email" name="email" placeholder="Email" />
    </div>
    <div class="form-group row">
    <div class="offset-md-2 col-md-10">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>
`;
