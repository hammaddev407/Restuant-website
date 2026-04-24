const foodData = [
    // RICE/BIRYANI
    { id: 1, name: "Beef Nalli Biryani", price: 850, cat: "rice", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400" },
    { id: 3, name: "Peshawari Mutton Pulao", price: 950, cat: "rice", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400" },
    { id: 4, name: "Egg Fried Rice", price: 450, cat: "rice", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=400" },

    // KARAHI/HANDI
    { id: 5, name: "Mutton Shinwari Karahi", price: 2800, cat: "karahi", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=400" },
    { id: 7, name: "Butter Chicken", price: 1400, cat: "karahi", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400" },
    { id: 8, name: "Paneer Reshmi Handi", price: 1200, cat: "karahi", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400" },

    // BBQ
    { id: 9, name: "Chicken Tikka Leg", price: 450, cat: "bbq", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400" },
    { id: 10, name: "Seekh Kabab Platter", price: 1500, cat: "bbq", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400" },
    { id: 11, name: "Malai Boti", price: 1100, cat: "bbq", img: "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=400" },
    { id: 12, name: "Mutton Chops", price: 2400, cat: "bbq", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400" },

    // SIDES/OTHERS
    { id: 13, name: "Peshawari Chappal Kabab", price: 700, cat: "bbq", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400" },
    { id: 15, name: "Daal Makhni", price: 800, cat: "karahi", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400" },
];

let cart = [];

function renderMenu(category = 'all') {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';
    const items = category === 'all' ? foodData : foodData.filter(f => f.cat === category);

    items.forEach(item => {
        grid.innerHTML += `
            <div class="food-card">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <div class="price-row">
                    <span>Rs ${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const dish = foodData.find(f => f.id === id);
    cart.push(dish);
    updateUI();
    openSidebar();
}

function updateUI() {
    const cartItems = document.getElementById('cartItems');
    const totalEl = document.getElementById('totalPrice');
    const countEl = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; background:#1a1a1a; padding:10px; border-radius:10px;">
                <span>${item.name}</span>
                <span>Rs ${item.price}</span>
            </div>
        `;
    });

    totalEl.innerText = `Rs ${total}`;
    countEl.innerText = cart.length;
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').style.display = 'block';
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('cartBtn').onclick = openSidebar;
document.getElementById('closeCart').onclick = closeSidebar;
document.getElementById('overlay').onclick = closeSidebar;

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        renderMenu(e.target.dataset.cat);
    };
});

renderMenu();
