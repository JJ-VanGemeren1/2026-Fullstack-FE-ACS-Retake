
let submitBtn = document.getElementById('send');
const postSignup = (signup)=>{
    const body = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phoneNumber').value,
        date_of_birth: document.getElementById('dob').value,
        password_hash:document.getElementById('password').value,
        security_question: document.getElementById('securityQuestion').value,
        security_answer: document.getElementById('securityAnswer').value,
        referral_source: document.getElementById('referral').value,
        newsletter: document.getElementById('newsletterCheck').checked,
        terms_accepted: document.getElementById('termsCheck').checked,
        street : document.getElementById('street').value,
        city: document.getElementById('city').value,
        postal_code: document.getElementById('zip').value,
        country: document.getElementById('country').value
    };
    const url = "https://backend11acs02group52026.vercel.app/post/signup";

    const option = {
        method : "Post",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(body)
    };
    fetch(url,option)
        .then((response)=> response.json())
        .then((data)=>{
            console.log("data", data);

            document.getElementById("output").innerHTML = `
    <div class="success-card">
        <div class="navbar-logo" style="background-color: var(--primary-color); width: fit-content; margin: 0 auto; border-radius: 6px;">
            <img src="../images/logo-transparent-svg.svg" alt="Cytek" width="90" height="72">
        </div>
        <h2>You have successfully signed up!</h2>
        <h4 class="fw-bold" style="font-size: 2rem; text-transform: uppercase; color: white;">
            ${body.first_name} ${body.last_name}
        </h4>
        <p class="text-muted">Your account has been created.</p>
        <a href="./login.html" class="btn btn-primary mt-3">Go to Login →</a>
    </div>
`;
        })
        .catch((error) => console.log(error));

}

submitBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    document.querySelector('#signup-form').classList.add('d-none');
    document.getElementById("output").innerHTML = `
        <div class="text-center my-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Creating your account...</p>
        </div>
    `;
    postSignup()
})
