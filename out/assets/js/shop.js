const username = window.localStorage.getItem("username");

let prices = [];
let totalCost = 0;
let cart = [];

fetch(`/api/prices`)
	.then((res) => res.json())
	.then((data) => {
		const guns = data.guns;
		guns.forEach((gun) => {
			generateGunShopCard(gun);
		});

		guns.forEach((gun) => {
			registerEventListenerForGun(gun);
		});

		document.title = "GunShop";

		prices = data.guns;
	});

fetch(`/api/shop/${localStorage.getItem("code")}`)
.then((res) => res.json())
.then((data) => {

    localStorage.setItem("username", data.username);
    localStorage.setItem("balance", data.balance);

    document.getElementById("balance").innerHTML  = `$${data.balance}`;
    document.getElementById("username").innerHTML = data.username;

});

    document.getElementById("buy").addEventListener("click", (ev) => {
       
        let cart = JSON.parse(localStorage.getItem("cart"))

        if (cart.length == 0) {
            alert("You have no items in your cart!");
            return;
        }

        if (totalCost > parseInt(localStorage.getItem("balance"))) {
            alert("You don't have enough money!");
            return
        }

        const cartItems = cart.map((item) => {
            return item.type
        });

        

        const outItems = cartItems.join(",");

        fetch(`/api/shop/${localStorage.getItem("code")}/buy?d=${ah(outItems)}`).then((res) => res.json()).then((data) => {

            alert(`${data.message}, you have $${data.balance} left.`);
        });

    });

function generateGunShopCard(gun) {
	const container = document.getElementById("gun-container");

	const gunCard = ` 
    <button id="${gun.type}" class="card border-danger mb-3 item" style="max-width: 20rem;">
    <div id="name" class="card-header">$${gun.price}</div>
    <div class="card-body">
      <h4 id="gunName" class="card-title">${gun.name}</h4>
    </button>`;

	container.innerHTML += gunCard;
}

function registerEventListenerForGun(gun) {
	document.getElementById(gun.type).addEventListener("click", (ev) => {
		const item = document.getElementById(gun.type);

		if (item.classList.contains("border-success")) {
			item.classList.remove("border-success");
			item.classList.add("border-danger");

			totalCost -= gun.price;

            const balance = parseInt(localStorage.getItem("balance"));

			document.getElementById("price").innerHTML = `$${totalCost}`;
            document.getElementById("balance-after").innerHTML = `$${balance - totalCost}`;

            cart.splice(cart.indexOf({type: gun.type, price: gun.price}), 1);

		} else {
			item.classList.remove("border-danger");
			item.classList.add("border-success");

			totalCost += gun.price;

            const balance = parseInt(localStorage.getItem("balance"));

			document.getElementById("price").innerHTML = `$${totalCost}`;
            document.getElementById("balance-after").innerHTML = `$${balance - totalCost}`;
         
            cart.push({
                type: gun.type,
                price : gun.price
            })
		}

        localStorage.setItem("cart", JSON.stringify(cart));

	});
}

let ah =(s)=>{var a=[];for(var n=0;n<s.length;n++){var h=Number(s.charCodeAt(n)).toString(16);a.push(h)}return a.join('')}