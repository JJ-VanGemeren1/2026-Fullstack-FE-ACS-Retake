const getCartItemUrl = "https://backend11acs02group52026.vercel.app/get/cart/1"


function itemsInCart(){
    document.getElementById('spinner').classList.remove('d-none')
    fetch(getCartItemUrl)
        .then((response)=>{
            console.log('response',response);
            return response.json();
        })
        .then((items)=>{
            console.log('items', items);

            let card = "";
            let subtotal = 0
            let total = 0
            const shipping = 0

            Object.entries(items).forEach(([name, details])=>{
                console.log(details.cartItemID)
                subtotal += details.price * details.quantity;
                total = subtotal + shipping;
                card += `<div class="card-body shadow-sm d-flex align-items-center gap-4">
            <img src="${details.image}" width="80" height="80" style="object-fit: cover; background: var(--tertiary-color); border-radius: 8px; padding: 8px;">
            <div class="flex-grow-1">
                <h5 style="font-family: var(--h-font); color: var(--secondary-color);">${name}</h5>
                <p class="mb-1" style="font-family: var(--p-font); color: var(--light-text);">${details.specs}</p>
                <p class="mb-0 fw-bold" style="color: var(--primary-color);">€${details.price}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${details.cartItemID}, ${details.quantity - 1})">−</button>
                <span style="font-family: var(--p-font);">${details.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${details.cartItemID}, ${details.quantity + 1})">+</button>
            </div>
            <button  class="btn btn-sm" onclick='deleteItem(${details.cartItemID})' style="color: var(--light-text);"><i class="fa-solid fa-trash"></i></button>
        </div>`

            })
            document.getElementById('spinner').classList.add('d-none')
            document.getElementById('cart-items').innerHTML = card;
            document.getElementById('message').classList.add('d-none')
            document.getElementById('cart-subtotal').textContent =`€ ${subtotal.toFixed(2)}`
            document.getElementById('cart-total').textContent = `€ ${total.toFixed(2)}`
            updateCartCount();

            if(Object.keys(items).length === 0){
                document.getElementById('message').classList.remove('d-none');
                document.getElementById('cart-items').innerHTML = '';

            }


        })
        .catch((error)=>{
            console.log("error", error);
        })


}

function deleteItem(cartItemID){
    fetch(`https://backend11acs02group52026.vercel.app/delete/cart/${cartItemID}`, {
        method: "DELETE"
    })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            itemsInCart();
        })
        .catch((error)=>{
            console.log(error);
        })
}


itemsInCart();


function updateQuantity(cartItemID, quantity){
    if(quantity < 1) return;

    fetch(`https://backend11acs02group52026.vercel.app/put/cart/${cartItemID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: quantity
        })
    })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            itemsInCart();
        })
        .catch((error)=>{
            console.log(error);
        })
}

function updateCartCount(){
    fetch("https://backend11acs02group52026.vercel.app/get/cart/1")
        .then(res => res.json())
        .then(items => {
            const count = Object.keys(items).length;
            document.getElementById('cart-count').textContent = count;
        })
        .catch(error => console.log(error));
}

updateCartCount()