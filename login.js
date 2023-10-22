function submitForm(e) {
    e.preventDefault();
 
    var myform =    document.getElementById("loginForm");
  
    var mydata = {
        "email" : myform.querySelector("#email").value,
        "password" : myform.querySelector("#password").value,

    }
    console.log(mydata);
    fetch("https://ets-pemrograman-web-f.cyclic.app/users/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mydata)
    })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Login failed");
            }
            return response.json();
        })
        .then((resp) => {
            alert("Login berhasil");
            console.log("resp from server ", resp);
            localStorage.setItem("auth", resp.data.access_token);
            window.location.href = "game.html";
        })
        .catch((error) => {
            alert(error)
            console.log("error ", error);
        });
}

var myform = document.getElementById("loginForm");

myform.addEventListener("submit", submitForm);