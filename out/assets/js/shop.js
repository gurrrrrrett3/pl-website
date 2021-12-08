const username = window.localStorage.getItem('username');

let prices = [];
let totalCost = 0;

fetch(`/api/prices`).then(res => res.json()).then(data => {

    const guns = data.guns;
    guns.forEach(gun => {
        generateGunShopCard(gun);
    });

    guns.forEach(gun => {
        registerEventListenerForGun(gun);
    });



    document.title = "GunShop";

    prices = data.guns;

});


function generateGunShopCard(gun) {

    const container = document.getElementById('gun-container');

    const gunCard = ` 
    <button id="${gun.type}" class="card border-danger mb-3 item" style="max-width: 20rem;">
    <div id="name" class="card-header">$${gun.price}</div>
    <div class="card-body">
      <h4 id="gunName" class="card-title">${gun.name}</h4>
    </button>`

    container.innerHTML += gunCard;

}

function registerEventListenerForGun(gun) {
    document.getElementById(gun.type).addEventListener('click', (ev) => {

        const item = document.getElementById(gun.type);
    
        if (item.classList.contains('border-success')) {
    
            item.classList.remove('border-success');
            item.classList.add('border-danger');

            totalCost -= gun.price;

            document.getElementById("price").innerHTML = `$${totalCost}`;
    
        } else {
    
            item.classList.remove('border-danger');
            item.classList.add('border-success');

            totalCost += gun.price;

            document.getElementById("price").innerHTML = `$${totalCost}`;

        }
    
        });
}