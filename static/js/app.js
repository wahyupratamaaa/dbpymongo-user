document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = {
        name: name,
        email: email
    };

    fetch('http://127.0.0.1:5000/add_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert('User added successfully!');
        document.getElementById('addUserForm').reset(); // Reset form setelah sukses
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function fetchUsers() {
    fetch('http://127.0.0.1:5000/get_users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear list sebelum mengisi ulang
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                userList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
