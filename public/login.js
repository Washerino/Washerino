//function runs whenever a form is submitted sends it to server to check if the email and password are correct
async function loginAttempt(event) {
    event.preventDefault();

    //selects the form element from form.hmtl
    const formData = document.querySelector('#loginForm');

    //create a new object that stores email and password
    const loginCreds = {
        username: formData.elements.namedItem('username').value,
        password: formData.elements.namedItem('password').value,
    };

    // turns loginCreds object into JSON string
    const serializedMessage = JSON.stringify(loginCreds);

    // posts JSON string to the server at the end point /login
    const response = await fetch('/login', { method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        body: serializedMessage
                    }
                )

    const json = await response.json();


    if (response.status === 200) {
        
        try
        {
            sessionStorage.setItem('id', json.id);
            sessionStorage.setItem('rangerName', json.rangername);
            sessionStorage.setItem('username', json.username);
            
            console.log("user in session storage");

            window.location.href = "/ranger";
        }
        catch{
            console.log("Err: could not save user details to seesion storage")
        }
    }
    else {

        try {
            const incorrectDetails = document.getElementById('incorrectDetails');
            incorrectDetails.remove();
        }
        catch {

        }
        const incorrectDetails = document.createElement('p');
        incorrectDetails.setAttribute('id', 'incorrectDetails');
        incorrectDetails.innerText = json;
        document.getElementById('loginContainer').appendChild(incorrectDetails);

        document.getElementById('password').value = ''; 
    }

}

//Selects form element from form.html and adds a loginAttempt event listener

const form = document.querySelector('#loginForm');
form.addEventListener('submit', loginAttempt);
