export default state => {
    window.createTransaction = e => {
        e = e || window.event;
        e.preventDefault();
        let accountId = localStorage.getItem("accountId");
        let form = e.target;

        let date = form.querySelector("[name='date']").value;
        let name = form.querySelector("[name='name']").value;
        let amount = form.querySelector("[name='amount']").value;
        fetch(`http://localhost:3000/add-transaction/${accountId}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date, 
                name,
                amount
            })
        })
            .then(e => {
                if (e.ok) window.router.navigate("/Transactions");
                else alert("Your transaction has been added");
            })
            .catch(() => {
                alert("Some Error Happen");
            });
        return false;
        };
        return `<form id="add-new-transaction-form" method="POST" onsubmit="return window.createTransaction()">
        <div class="container mx-auto">
            <label for="date"><b>Date</b></label>
            <input type="date" placeholder="Enter Date" name="date" required>
        </div>
        <div class="container mx-auto">
            <label for="name"><b>Transaction Name</b></label>
            <input type="text" placeholder="Enter Transaction Name" name="name" required>
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
