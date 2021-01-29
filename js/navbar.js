//get token from local storage
const getToken = localStorage.getItem('token');

//logout function
let logout = document.getElementById('logout');
logout.addEventListener("click", function(e) {
    e.preventDefault();
    const data = {token : getToken}
    fetch('http://127.0.0.1:5000/logout', {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log({status : data["status"], token : data["token"]})
        localStorage.removeItem('token')
        window.location.href = 'login.html'
    })
    .catch((error) => {
        console.error('Error:', error);
    })
})

//function = get user_id
async function getUser() {
    const response = await fetch('http://127.0.0.1:5000/login/all')
    const data = await response.json()
    for (item of data) {
        if (item.token == getToken) {
            console.log({user_id : item.user_id, token : item.token});  
            return item.user_id;
        }
    }
}

//function = get Full Name
async function getName(id) {
    const response = await fetch('http://127.0.0.1:5000/user/all')
    const data = await response.json()
    const name = document.getElementById('user_name');
    for (item of data) {
        if (id == item.user_id) {
            const firstName = item.first_name;
            const firstNameCapt = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const lastName = item.last_name;
            const lastNameCapt = lastName.charAt(0).toUpperCase() + lastName.slice(1);
            name.innerHTML = firstNameCapt + " " + lastNameCapt;
        }
    }
}

//call function
const user_id = getUser();
user_id.then((id) => {
    getName(id)
})