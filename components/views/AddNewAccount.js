export default st => {
  window.createAccount = e => {
    e = e || window.event;
    let userId = localStorage.getItem("userId");
    let form = e.target;

    let name = form.querySelector("[name='name']").value;
    let amount = form.querySelector("[name='amount']").value;

    fetch(`http://localhost:3000/add-new-account/${userId}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        amount
      })
    })
      .then(e => {
        if (e.ok) window.router.navigate("/Accounts");
        else alert("Something wrong happen, please try again");
      })
      .catch(() => {
        alert("Some Error Happen");
      });

    e.preventDefault();
    return false;
  };
  return `<form id="add-new-account-form" method="POST" onsubmit="return window.createAccount()">

  <div class="container mx-auto">
    <label for="name"><b>Name</b></label>
    <input type="text" placeholder="Enter Account Name" name="name" required>
  </div>

  <div class="container mx-auto">
    <label for="amount"><b>Amount</b></label>
    <input placeholder="Enter Amount" name="amount" required>
  </div>
  <br />
  <br />
  <br />
  <div class="container mx-auto">
    <button type="submit">Create</button>
  </div>
</form>`;
};
