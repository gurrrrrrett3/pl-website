document.getElementById("submit").addEventListener("click", function(event) {

    event.preventDefault();

   const username = document.getElementById("name").value;
   const type = document.getElementById("type").value;
   const cop = document.getElementById("cop").value;


    fetch(`/api/gunregister?u=${username}&t=${type}&c=${cop}`, {
        method: "POST",
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        if (json.success) {
            username.value = "";
            type.value = "";
            cop.value = "";
            alert(`Successfully registered! Your code is: ${json.gunData.code}`)
        } else {
            alert("Error: " + json.message);
        }
    });
}
);