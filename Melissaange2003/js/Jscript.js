document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://backend11acs02group52026.vercel.app";

    // --- Get Team Members (GET) ---
    const teamMembersContainer = document.getElementById("teamMembersContainer");

    if (teamMembersContainer) {
        async function getTeamMembers() {
            try {
                const response = await fetch(`${baseURL}/get/team_members`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch team members. Please try again.");
                }

                const data = await response.json();

                teamMembersContainer.innerHTML = "";

                data.team_members.forEach(member => {
                    teamMembersContainer.innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${member.name}</h5>
                                <p class="card-text">Role: ${member.role}</p>
                                <p class="card-text">Active: ${member.is_active ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    `;
                });

            } catch (error) {
                teamMembersContainer.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
            }
        }

        getTeamMembers();
    }

    // --- Sell Device Form (POST) ---
    const sellDeviceForm = document.getElementById("sellDeviceForm");
    const statusDiv = document.getElementById("statusMessage");

    if (sellDeviceForm) {
        async function submitSellDeviceForm(e) {
            e.preventDefault();
            statusDiv.innerHTML = `<div class="alert alert-info">Submitting your device...</div>`;

            const submitBtn = sellDeviceForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;

            const full_name = document.getElementById("sellerName").value;
            const email = document.getElementById("sellerEmail").value;
            const device_type = document.getElementById("deviceType").value;
            const device_info = document.getElementById("deviceInfo").value;

            const url = `${baseURL}/post/trade_in_requests?userID=0&full_name=${encodeURIComponent(full_name)}&email=${encodeURIComponent(email)}&device_type=${encodeURIComponent(device_type)}&device_info=${encodeURIComponent(device_info)}`;

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to submit device. Please try again.");
                }

                statusDiv.innerHTML = `<div class="alert alert-success">Device submitted successfully! We will evaluate and get back to you soon.</div>`;
                sellDeviceForm.reset();
            } catch (error) {
                statusDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
            } finally {
                submitBtn.disabled = false;
            }
        }

        sellDeviceForm.addEventListener("submit", submitSellDeviceForm);
    }

    // --- Login Form (GET) ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        async function submitLoginForm(e) {
            e.preventDefault();
            const statusDiv = document.getElementById("loginStatusMessage");
            statusDiv.innerHTML = `<div class="alert alert-info">Signing in...</div>`;

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;

            const email = document.getElementById("loginEmail").value;
            const password_hash = document.getElementById("loginPassword").value;

            try {
                const response = await fetch(`${baseURL}/get/login?email=${encodeURIComponent(email)}&password_hash=${encodeURIComponent(password_hash)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Something went wrong. Please try again.");
                }

                const data = await response.json();

                if (data.message === "Invalid login") {
                    statusDiv.innerHTML = `<div class="alert alert-danger">Invalid email or password. Please try again.</div>`;
                    return;
                }

// Success — show welcome message
                loginForm.style.display = "none";
                statusDiv.innerHTML = `
<div class="text-center mt-4">
<h4 class="fw-bold" style="font-size: 2rem; text-transform: uppercase; color: white;">${data["First name"]} ${data["Last name"]}</h4>
<p class="text-muted mt-2">You have successfully signed in.</p>
<a href="../../index.html" class="btn btn-primary mt-3">Continue to Home →</a>
</div>
`;

            } catch (error) {
                statusDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
            } finally {
                submitBtn.disabled = false;
            }
        }

        loginForm.addEventListener("submit", submitLoginForm);
    }

});