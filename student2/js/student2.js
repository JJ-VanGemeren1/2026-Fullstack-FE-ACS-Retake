const laptopsBtn = document.querySelector('#laptops');
const smartphoneBtn = document.querySelector('#phone')
const headphoneBtn = document.querySelector('#headphones')
const accessoryBtn = document.querySelector('#accessories')
const allBtn = document.querySelector('#all')
const laptopUrl = "https://backend11acs02group52026.vercel.app/get/laptops";
const phoneUrl = "https://backend11acs02group52026.vercel.app/get/smartphones"
const headphoneUrl= "https://backend11acs02group52026.vercel.app/get/headphones"
const accessoriesUrl = "https://backend11acs02group52026.vercel.app/get/accessories"
const spinner = document.getElementById("spinner");
const productGrid = document.getElementById("product-grid");
const filterBtn = document.querySelectorAll('.filter-btn')

laptopsBtn.addEventListener('click', (event)=>{
    event.stopPropagation();
    getLaptops();
})
smartphoneBtn.addEventListener('click', (event)=>{
    event.stopPropagation();
    getSmartphones();
})

headphoneBtn.addEventListener('click',(event)=>{
    event.stopPropagation();
    getHeadphones();

})

accessoryBtn.addEventListener('click', (event)=>{
    event.stopPropagation();
    getAccessories();
})

allBtn.addEventListener('click', (event)=>{
    event.stopPropagation();
    getAll();
})

function getLaptops(){
    spinner.classList.remove("d-none");
    productGrid.classList.add("d-none");

    setTimeout(()=>{
        fetch(laptopUrl)
            .then((response)=>{
                console.log("response", response);
                return response.json();
            })
            .then((laptops)=>{
                console.log('laptops', laptops)
                let card = "";

                Object.entries(laptops).forEach(([name, details]) =>{
                    card += `
                        <div class="col-12 col-md-6 col-lg-3 product-item" data-category="laptops">
                            <div class="card h-100 shadow-sm">
                                <img src="${details.image}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${name}</h5>
                                    <p class="card-text text-secondary">${details.specs}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 fw-bold text-primary mb-0">€${details.price}</span>
                                        <button class="btn btn-sm btn-outline-primary" type="button">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                })

                productGrid.innerHTML = card;
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                filterBtn.forEach((b)=>{b.classList.remove('active')});
                document.getElementById('laptops').classList.add('active');
            })
            .catch((error)=>{
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                console.log(error);
            })
    }, 3000);
}


function getSmartphones(){
    spinner.classList.remove("d-none");
    productGrid.classList.add("d-none");

    setTimeout(()=>{
        fetch(phoneUrl)
            .then((response)=>{
                console.log("response", response);
                return response.json();
            })
            .then((smartphones)=>{
                console.log('smartphones', smartphones);
                let card = "";

                Object.entries(smartphones).forEach(([name,details])=>{
                    card += ` <div class="col-12 col-md-6 col-lg-3 product-item" data-category="laptops">
                            <div class="card h-100 shadow-sm">
                                <img src="${details.image}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${name}</h5>
                                    <p class="card-text text-secondary">${details.specs}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 fw-bold text-primary mb-0">€${details.price}</span>
                                        <button class="btn btn-sm btn-outline-primary" type="button">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                })

                productGrid.innerHTML = card;
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                filterBtn.forEach((b)=>{b.classList.remove('active')});
                document.getElementById('phone').classList.add('active');

            })
            .catch((error)=>{
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                console.log(error);
            })
    }, 3000);
}

function getHeadphones() {
    spinner.classList.remove("d-none");
    productGrid.classList.add("d-none");

    setTimeout(()=>{
        fetch(headphoneUrl)
            .then((response)=>{
                console.log("response", response);
                return response.json();
            })
            .then((headphones)=>{
                console.log('smartphones', headphones);
                let card = "";

                Object.entries(headphones).forEach(([name,details])=>{
                    card += ` <div class="col-12 col-md-6 col-lg-3 product-item" data-category="laptops">
                            <div class="card h-100 shadow-sm">
                                <img src="${details.image}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${name}</h5>
                                    <p class="card-text text-secondary">${details.specs}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 fw-bold text-primary mb-0">€${details.price}</span>
                                        <button class="btn btn-sm btn-outline-primary" type="button">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                })

                productGrid.innerHTML = card;
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                filterBtn.forEach((b)=>{b.classList.remove('active')});
                document.getElementById('headphones').classList.add('active');

            })
            .catch((error)=>{
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                console.log(error);
            })
    }, 3000);


}

function getAccessories(){
    spinner.classList.remove("d-none");
    productGrid.classList.add("d-none");

    setTimeout(()=>{
        fetch(accessoriesUrl)
            .then((response)=>{
                console.log("response", response);
                return response.json();
            })
            .then((accessories)=>{
                console.log('accessories', accessories);
                let card = "";

                Object.entries(accessories).forEach(([name,details])=>{
                    card += ` <div class="col-12 col-md-6 col-lg-3 product-item" data-category="laptops">
                            <div class="card h-100 shadow-sm">
                                <img src="${details.image}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${name}</h5>
                                    <p class="card-text text-secondary">${details.specs}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 fw-bold text-primary mb-0">€${details.price}</span>
                                        <button class="btn btn-sm btn-outline-primary" type="button">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                })

                productGrid.innerHTML = card;
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                filterBtn.forEach((b)=>{b.classList.remove('active')});
                document.getElementById('accessories').classList.add('active');

            })
            .catch((error)=>{
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                console.log(error);
            })
    }, 3000);

}

function getAll(){
    spinner.classList.remove("d-none");
    productGrid.classList.add("d-none");

    setTimeout(()=>{
        Promise.all([
            fetch(laptopUrl).then((response)=>{console.log("response", response); return response.json()}),
            fetch(accessoriesUrl).then((response)=>{console.log("response", response); return response.json()}),
            fetch(headphoneUrl).then((response)=>{console.log("response", response); return response.json()}),
            fetch(phoneUrl).then((response)=>{console.log("response", response); return response.json()})
        ])


            .then(([laptops, smartphones, headphones, accessories])=>{
                const allProducts = {...laptops,...accessories,...headphones,...smartphones}
                let card = ""

                Object.entries(allProducts).forEach(([name,details])=>{
                    card += ` <div class="col-12 col-md-6 col-lg-3 product-item" data-category="all">
        <div class="card h-100 shadow-sm">
            <img src="${details.image}" class="card-img-top" alt="${name}">
            <div class="card-body">
                <h5 class="card-title fw-bold">${name}</h5>
                <p class="card-text text-secondary">${details.specs}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="h5 fw-bold text-primary mb-0">€${details.price}</span>
                    <button class="btn btn-sm btn-outline-primary" onclick='addToCart(${details.productId})'>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>`;
                })
                productGrid.innerHTML = card;
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                filterBtn.forEach((b)=>{b.classList.remove('active')});
                document.getElementById('all').classList.add('active');
            })
            .catch((error)=>{
                spinner.classList.add("d-none");
                productGrid.classList.remove("d-none");
                console.log(error);
            })
    },3000);

}

function addToCart(productId){
    document.getElementById('overlay-spinner').style.display = 'flex';
    fetch("https://backend11acs02group52026.vercel.app/post/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: 1,
            productID: productId,
            quantity: 1
        })
    })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            updateCartCount()
            document.getElementById('overlay-spinner').style.display = 'none';


        })
        .catch((error)=>{
            console.log(error);
            document.getElementById('overlay-spinner').style.display = 'none';

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

getAll()
updateCartCount()