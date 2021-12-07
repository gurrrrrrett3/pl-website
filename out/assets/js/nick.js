const username = document.getElementById('nickname');
const submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    const nick = username.value;
    if (nick.length > 0) {
        fetch(`/api/auth/joinserver?token=${localStorage.getItem("token")}&nick=${nick}`)
        localStorage.clear()
        localStorage.setItem("message", `Alright! Added you to the server Discord!`)
        window.location.href = "/"
    } else {
        alert('Please enter a nickname');
    }
});