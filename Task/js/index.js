let userTable = document.querySelector("tbody");
Users();

function Users() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            data.forEach((user, index) => {
                let tr = `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.username}</td>
                            <td><a class="btn btn-danger deleted" href="#" data-id="${user.id}">Delete</a></td>
                            <td><a class="btn btn-success update" href="#" data-id="${user.id}">Update</a></td>
                          </tr>`;
                userTable.innerHTML += tr;
            });
            let deleteButtons = document.querySelectorAll(".deleted");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function(event) {
                    event.preventDefault();
                    let userId = this.getAttribute("data-id");
                    deleteUser(userId);
                });
            });
            let updateButtons = document.querySelectorAll(".update");
            updateButtons.forEach(button => {
                button.addEventListener("click", function(event) {
                    event.preventDefault();
                    let userId = this.getAttribute("data-id");
                    window.location.href = `create.html?id=${userId}`;
                });
            });
        });

}
function deleteUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response!=null) {
            return Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
        } else {
            throw new Error('Failed to delete user');
        }
    })
    .then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error"
        });
    });
}

