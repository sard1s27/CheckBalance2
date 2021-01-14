export default st => {
  ///load account info here
  window.onAccountItemClick = e => {
    //show transactions
    console.log(e);
  };

  window.editBalance = e => {
    let newBalance = window.prompt(
      "Please enter new balance",
      document.querySelector("#span-balance").innerHTML
    );

    if (newBalance) {
      fetch(`http://localhost:3000/update-account/${e}/${newBalance}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(e => {
          if (e.ok) {
            const currentUrl = window.router._lastRouteResolved.url;
            window.router._lastRouteResolved = null;
            window.router.navigate(currentUrl);
          } else alert("Something wrong happen, please try again");
        })
        .catch(() => {
          alert("Some Error Happen");
        });
    }

    return false;
  };

  window.deleteAccount = e => {
    // e.preventDefault();
    fetch(`http://localhost:3000/delete-account/${e}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(e => {
        if (e.ok) {
          const currentUrl = window.router._lastRouteResolved.url;
          window.router._lastRouteResolved = null;
          window.router.navigate(currentUrl);
        } else alert("Something wrong happen, please try again");
      })
      .catch(() => {
        alert("Some Error Happen");
      });

    return false;
  };
  console.log(st.params.accounts);
  let i = parseFloat(st.params.accounts[1].balance).toFixed(2);
  console.log(i);
  return `<div class="test">
  ${st.params.accounts.map(a => {
    return `<div onClick="return  window.onAccountItemClick('${a._id}')" class="account-item"><b>Account Name:</b>

    <span>${a.name}</span><br />
    <b>Balance:</b>
    <br />
    <span id="span-balance">$${parseFloat(a.balance).toFixed(2)}</span>
    <button onclick="return window.editBalance('${a._id}')">Edit Balance</button>
    <button onclick="return window.deleteAccount('${a._id}')">Delete</button>
    </div>
    `;
  })}
  <div class="test2">
  <a class="add-new-account" href="/AddNewAccount" data-navigo>Add New Account</a>
  </div>
  </div>`;
};
