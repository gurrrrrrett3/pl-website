const owner = document.getElementById('owner');
const username = window.localStorage.getItem('username');

fetch(`/api/user/${username}/guns`).then(res => res.json()).then(data => {

    if (!data.success) {
        document.body.innerHTML = data.message;
        return;
    }
    const guns = data.userData;
    guns.forEach(gun => {
        generateGunCard(gun);
    });

    owner.innerHTML = username;
    document.title = username

    if (guns.length > 12) {
        document.body.style.overflowY = 'scroll';
    } else {
        document.body.style.overflowY = 'hidden';
    }
});


function generateGunCard(gun) {

    const container = document.getElementById('gun-container');

    const gunDate = new Date(gun.registeredAt);

    const gunCard = ` 
    <div id= card class="card border-success mb-3 item" style="max-width: 20rem;">
    <div id="owner" class="card-header">${gun.username}</div>
    <div class="card-body">
      <h4 id="gunName" class="card-title">${gun.type}</h4>
      <p id= "otherData" class="card-text"><span>Code: </span>${gun.code}<br><span>Regestered at: </span>${gunDate.getMonth()}/${gunDate.getDate()}/${gunDate.getFullYear()} ${gunDate.getHours()}:${gunDate.getMinutes()}:${gunDate.getSeconds()}<br><span>Registered By: </span>${gun.registeredBy}</p>
    </div>`


    container.innerHTML += gunCard;

}