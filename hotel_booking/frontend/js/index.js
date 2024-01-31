const loginForm = document.getElementById('login-form')
const roomTypeForm = document.getElementById('roomTypeForm')
const baseurl = 'http://localhost:9100/' 

if(loginForm){
    loginForm.addEventListener('submit', handleLogin)
}

if(roomTypeForm){
    roomTypeForm.addEventListener('submit', handelRoomCreation)
}


// document.addEventListener('click', (event) => {
//     const deleteButton = event.target.closest('.btn-danger');
    
//     if (deleteButton) {
//         const modalId = deleteButton.getAttribute('data-bs-target');
//         const roomId = /* Extract the room ID from your data or element attributes */
//         handleDelete(roomId, modalId);
//     }
// });

// document.addEventListener('click', (event) => {
//     const updateButton = event.target.closest('.btn-success'); // Adjust this selector based on your HTML structure
    
//     if (updateButton) {
//         event.preventDefault(); // Prevent default form submission behavior if it's inside a form

//         // Call your update function
//         handelRoomUpdate();
//     }
// });

async function handleLogin(event) {
    event.preventDefault()
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    console.log(bodyStr)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyStr
    }
    fetch(baseurl + 'auth/signin', options)
    .then(response => {
        return response.json()
    })
    .then(authData => {
        if (authData && authData.access_token) {
            // Perform the redirection to the home page
            const decoded = parseJwt(authData.access_token)
            console.log(decoded)
            if(decoded.is_admin){
                localStorage.setItem('access_token', authData.access_token)
                window.location.href = './admin.html';
            } else {
                window.location.href = './home.html'
            }
            
            //window.location.href = './admin.html'; // Change './admin.html' to the actual path of your home page
        } else {
            const errorMessage = authData.message || 'Incorrect username or password';
            document.getElementById('error-message').innerText = errorMessage;
            }
    })
    .catch(err=> {
        console.log('err', err)
    })
}

function handleAuthData(authData, callback) {
    localStorage.setItem('access_token', authData.access_token)
    if (callback) {
        callback()
    }
}

function getVIPRooms() {
    let viprooms = document.getElementById('vipRooms')
    console.log('VIP rooms')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/vip', options)
    .then(response => {
        return response.json()
    })
    .then(response =>{
        response.forEach(element => {
            viprooms.innerHTML += 
                `<div class="card-body ">
                    <ul class="list-group ">
                        <li class="list-group-item col-sm-4">
                            <img src="${element.image}" alt="Room Image" class="img-fluid ">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass" class="form-control">
                                    <option selected value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <input type="file" id="image" required class="form-control-file">
                                <small class="form-text text-muted">Upload an image for the room.</small>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description" placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title" class="form-control" required>
                            </div>
                            <input type="hidden" id='id' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate()" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                    function handelDelete(id) {}
                    function handelRoomUpdate() {}
                </script>`
        });
    } 

    )
    .catch(err=> {
        console.log('err', err)
    })

}

function handelRoomCreation(event) {
    event.preventDefault();
    let image = event.target.image.files[0]
    const formData = new FormData();
    formData.append('Image', image)
    formData.append('description', event.target.description.value)
    formData.append('price', event.target.price.value)
    formData.append('classId', event.target.roomClass.value)
    formData.append('title', event.target.title.value)
    formData.append('avaliable', false)
    console.log(formData)

    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
    }
    fetch(baseurl + 'hotelroom/create', options)
    .then(response => {
        return response.json()
    })
    .then(() => {
        location.reload();
    })
    .catch(err=> {
        console.log('err', err)
    })


}

function handelRoomUpdate(id) {
    let image = document.getElementById('image')
    const formData = new FormData();
    formData.append('Image', image.files[0])
    console.log('the image', image.files[0])
    formData.append('description', document.getElementById('description').value)
    formData.append('price', document.getElementById('price').value)
    formData.append('classId', document.getElementById('roomClass').value)
    formData.append('title', document.getElementById('title').value)
    formData.append('avaliable', false)
    console.log(id)

    const options = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
    }
    fetch(baseurl + 'hotelroom/'+ id, options)
    .then(response => {
        return response.json()
    })
    .then(res =>{
        //location.reload()
    })
    .catch(err=> {
        console.log('err', err)
    })
}

function handelDelete(id) {
    const options = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    }
    fetch(baseurl + `hotelroom/${id}`, options)
    .then(response => {
        return response.json()
    })
    .then(res => {
        location.reload();
    })
    .catch(err=> {
        console.log('err', err)
    })
}

function getMidddleRoom() {
    let middleroom = document.getElementById('middleroom')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/middle', options)
    .then(resposne => {
        return resposne.json()
    })
    .then(response =>{
            response.forEach(element => {
            middleroom.innerHTML += 
                `<div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <img src="${element.image}" alt="Room Image" class="w-25">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success edit-button" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass" class="form-control">
                                    <option selected value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <input type="file" id="image" required class="form-control-file">
                                <small class="form-text text-muted">Upload an image for the room.</small>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description" placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title" class="form-control" required>
                            </div>
                            <input type="hidden" id='id' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate()" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                    function handelDelete(id) {}
                    function handelRoomUpdate() {}
                </script>`
        });
    })
}

function getEconomicRoom() {
    let middleroom = document.getElementById('economicRooms')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/economic', options)
    .then(resposne => {
        return resposne.json()
    })
    .then(response =>{
            response.forEach(element => {
            middleroom.innerHTML += 
                `<div class="card-body">
                    <ul class="list-group row">
                        <li class="list-group-item col-sm-4">
                            <img src="${element.image}" alt="Room Image" class="img-fluid">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success edit-button" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass" class="form-control">
                                    <option selected value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <small class="form-text text-muted">${element.image}</small>
                                <input type="file" id="image" class="form-control-file" required>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description" value='${element.description}' placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title" class="form-control" required>
                            </div>
                                <input type="hidden" id='id' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate(${element.id})" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                    function handelDelete(id) {}
                    function handelRoomUpdate(id) {}
                </script>`
        });
    })
}

getVIPRooms()
getMidddleRoom()
getEconomicRoom()


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}