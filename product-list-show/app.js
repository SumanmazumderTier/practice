let allProducts = [...products];
console.log(allProducts);
const productContainer = document.querySelector(".product-container");

// data show the all DOM element
function getData(){
    allProducts.forEach((item)=>{
        const {id, title, company, image, price, category} = item;
        // console.log(item);
        let data = `<div class="product-section"><div class="img"><img src="${image}"/> </div> <h3>${title}</h3> <span>${company}</span> <span style="background:yellow">${category}</span> <p>${price}</p></div>`;
        productContainer.insertAdjacentHTML('beforeend', data);
    })
};
getData();

const form = document.querySelector('.input-form');
const searchInput = document.querySelector('#searchInput');


form.addEventListener('keyup', () => {
    const inputValue = searchInput.value;
    let filterProducts = [];
    filterProducts = allProducts.filter((product) => {
      return product.title.toLowerCase().includes(inputValue);
    }).map(item => `<div class="product-section"><div class="img"><img src="${item.image}"/> </div> <h3>${item.title}</h3> <span>${item.company}</span>  <span style="background:yellow">${item.category}</span><p>${item.price}</p></div>`).join('');
    // console.log(filterProducts);
    productContainer.innerHTML = filterProducts ? filterProducts : `<p>No data is found</p>`;
});

const tabs = document.querySelector('.tabs');
function displayMenuButton(){
    let categories = allProducts.reduce((value, item)=>{
        if(!value.includes(item.category)){
            value.push(item.category);
        }
        return value;
    }, ["all"]);
    // console.log(categories);

    let categoryBtn = categories.map((item)=>{
        // console.log(item);
        return `<button class="filter-btn" data-id=${item}>${item}</button>`
    }).join("");
    // console.log(categoryBtn);
    tabs.innerHTML = categoryBtn;

    const filterBtns = tabs.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn)=>{
        // console.log(btn);
        btn.addEventListener('click', function(menuItem){
            let getMenus = menuItem.target.dataset.id;
            // console.log(getMenus);
            const menuCategories = allProducts.filter((menuItem)=>{
                if(menuItem.category == getMenus){
                    return menuItem;
                }
            });
            // console.log(menuCategories);
            let dataShow = menuCategories.map((item)=>{
                return `<div class="product-section"><div class="img"><img src="${item.image}"/> </div> <h3>${item.title}</h3> <span>${item.company}</span> <span style="background:yellow;">${item.category}</span><p>${item.price}</p></div>`
            }).join("");
            // console.log(dataShow)
            productContainer.innerHTML = dataShow;


            if(getMenus == 'all'){
                getData();
            }
        })
    })
}
displayMenuButton();