import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import { Accounts } from "./components/views";

function render(st, parmas) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st, parmas)}
  ${Footer()}
  `;
}
// render(state.Login);

const router = new Navigo(window.location.origin);
router.on({
  "/": () => {
    render(state.Login);
    document.getElementById("form").addEventListener("submit", e => {
      let form = e.target;
      let username = form.querySelector("[name='uname']").value;
      let password = form.querySelector("[name='psw']").value;

      fetch("http://localhost:3000/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(e => {
          if (e.ok) return e.json();
          throw new Error("Something went wrong");
        })
        .then(e => {
          localStorage.setItem("userId", e._id);
          router.navigate("/Accounts");
        })
        .catch(() => {
          alert("invalid username or password");
        });

      e.preventDefault();
      return false;
    });
  },
  ":page/": params => {
    let page = capitalize(params.page);

    if (page == "Signup") {
      render(state[page]);
      document.getElementById("register-form").addEventListener("submit", e => {
        let form = e.target;
        let firstName = form.querySelector("[name='firstName']").value;
        let lastName = form.querySelector("[name='lastName']").value;
        let username = form.querySelector("[name='username']").value;
        let password = form.querySelector("[name='password']").value;
        let telNum = form.querySelector("[name='telNum']").value;
        let email = form.querySelector("[name='email']").value;

        fetch("http://localhost:3000/register", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            password,
            telNum,
            email
          })
        })
          .then(e => {
            if (e.ok) router.navigate("/");
            else alert("Something wrong happen, please try again");
          })
          .catch(() => {
            alert("invalid username or password");
          });

        e.preventDefault(); 
        return false;
      });
    } else if (page == "Accounts") {
      //load user data
      let userId = localStorage.getItem("userId");
      fetch(`http://localhost:3000/account-info/${userId}`)
        .then(e => {
          if (e.ok) return e.json();
          throw new Error("something went wrong");
        })
        .then(e => {
          state[page].params = e;
          render(state[page]);
        })
        .catch(() => {
          alert("something went wrong");
        });
    } else {
      console.log(state);
      render(state[page]);
    }
  }
});
router.resolve();

window.router = router;

// add menu toggle to bars icon in nav bar
// .document.querySelector(".fa-bars")
// .addEventListener("click", () => {
//   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
// });
