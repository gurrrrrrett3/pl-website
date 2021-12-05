const ID = window.localStorage.getItem('gunID')

fetch(`/api/gun/${ID}`).then(res => res.json()).then(gun => {

    gunData = gun.gunData

    if (gun.success == false) {

        document.body.innerHTML = `Gun not found`
    } else {

    document.title = `${gunData.username}'s ${gunData.type}`

    const gunDate = new Date(gunData.registeredAt)
    
    document.getElementById("owner").innerHTML = gunData.username
    document.getElementById("gunName").innerHTML = gunData.type
    document.getElementById("otherData").innerHTML = `<span>Code: </span>${gunData.code}<br><span>Regestered at: </span>${gunDate.getMonth()}/${gunDate.getDate()}/${gunDate.getFullYear()} ${gunDate.getHours()}:${gunDate.getMinutes()}:${gunDate.getSeconds()}<br><span>Registered By: </span>${gunData.registeredBy}`
    }
})