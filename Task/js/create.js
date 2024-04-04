let form = document.getElementById("userCreateForm");
document.getElementById("userCreateForm").addEventListener("submit",function(e){
    e.preventDefault();
    
    let formData = new FormData(form);
    console.log(formData.get("email"))

    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
    }).then(response => {
        if(response.status == 201){
            window.history.back();
        }
    });
})