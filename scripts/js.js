const url = "products.json";
let cart = [];
let fullQuantity = 0;
let totalPrice = 0;


var vuee = new Vue({
    el: '#app',
    created() {
        this.fetchData();
    },
    data: {
        isLoaded: true,
        shop: [],
        currentPage: 'start',
    },
    
    methods: {
        switchPage(page){
            this.currentPage = page;
        },
        fetchData: async function() {
            await axios.get(url)
            .then(response => {
                
                this.shop = response.data.shop;
                
                console.log(this.shop)
            }).finally(() => {
                this.isLoaded = false;
            })
            
        },
       
       
    },

});



/*  inte färdigt ännu*/
Vue.component('checkcart', {

    created() {
        console.log(this.visibleonPage)
    },
    data() {
        return {
            visibleonPage: vuee.currentPage = 'checkout',
            cartList: cart
            
        }
    },
    methods: {   
        
      removeFromCart(ID) {
        let items = this.cartList.find(item => item.ID === ID);  
        this.cartList.splice(items, 1);
        fullQuantity --;
        
    },
        emptyCart(){
            this.cartList = [];
            fullQuantity = 0;
            totalPrice = 0;
        },
        addQuantity(ID){
            let items = vuee.shop.find(item => item.ID === ID);  
            this.cartList.push(items)
            fullQuantity ++;
            console.log(totalPrice * fullQuantity)
            
        },
       
        buy(){
           console.log("Your order has been placed")
        }
        
    },
    template: 
       `<div class="cartitems">
       <h3 @click="emptyCart()">Empty Cart</h3>
       <h5 v-for="product in cartList">
       <strong>
       Title: {{product.Title}}
       <br>
       Price: {{product.Price}}$
       <br>
       </strong>
       
       <h2 @click="addQuantity(product.ID)">
       +1
       </h2>
       <br>
       <strong :key="product.ID" @click="removeFromCart(product.ID)">Remove from cart
       </strong>
       
       </h5>
       
       <br>
       <br>
       
       <label for="name">Name</label>
       <br>
       <input type="text" id="name" name="namn" placeholder="Name" pattern=[A-Z\sa-z]{3,20} required>
       <br>
       <br>
       <label for="email">E-mail</label>
       <br>
       <input type="email" id="email" name="email" placeholder="SplitVision@email.com" required>
       <br>
       <br>
       <label for="phone">Phone</label>
       <br>
       <input type="tel" id="phone" name="num" placeholder="+46123456789" pattern=(\d{3})-?\s?(\d{3})-?\s?(\d{4}) required>
       <br>
       <br>
       <label for="name">Address</label>
       <br>
       <input type="text" id="address" name="address" placeholder="Address" pattern=[A-Z\sa-z]{3,20} required>
       <br>
       <br>
       <button @click="buy()">Buy</button>
       </div>
       `
}); 

Vue.component('top-products', {

    created() {
        console.log(this.visibleonPage)
    },
    data() {
        return {
            visibleonPage: vuee.shop.filter(item => item.visiblefirstPage === true),
            cartList: cart
            
        }
    },
    methods: {
        getprodId(ID){
            let productEqu = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(productEqu)
            console.log(this.cartList)
            fullQuantity ++;
            console.log(fullQuantity)
            productEqu.Quantity --;
            totalPrice +=parseInt(productEqu.Price);
            console.log("Total Cost " +totalPrice)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" v-if="product.Quantity > 0" @click="getprodId(product.ID)">Add to cart</button>
        </div>
      </div>`
}); 


Vue.component('men-products', {

    created() {
        console.log(this.visibleonPage)
    },
    data() {
        return {
            visibleonPage: vuee.shop.filter(item => item.Type === 'Men'),
             cartList: cart            
        }
    },
    methods: {
        getprodId(ID){
            let productEqu = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(productEqu)
            fullQuantity ++;
            console.log(fullQuantity)
            productEqu.Quantity --;
            totalPrice +=parseInt(productEqu.Price);
            console.log("totalCost" +totalPrice)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" v-if="product.Quantity > 0" @click="getprodId(product.ID)">Add to cart</button>
        </div>
        </div>`
}); 

Vue.component('women-products', {

    created() {
        console.log(this.visibleonPage)
    },
    data() {
        return {
            visibleonPage: vuee.shop.filter(item => item.Type === 'Women'),
            cartList: cart
            
        }
    },
    methods: {
        getprodId(ID){
            let productEqu = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(productEqu)
            fullQuantity ++;
            console.log(fullQuantity)
            productEqu.Quantity --;
            totalPrice +=parseInt(productEqu.Price);
            console.log("totalCost" +totalPrice)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID"  v-if="product.Quantity > 0" @click="getprodId(product.ID)">Add to cart</button>
        </div>
        </div>`
});

Vue.component('jewelry', {

    created() {
        console.log(this.visibleonPage)
    },
    data() {
        return {
            visibleonPage: vuee.shop.filter(item => item.Type === 'Jewelry'),
            cartList: cart
            
        }
    },
    methods: {
        getprodId(ID){
            let productEqu = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(productEqu)
            fullQuantity ++;
            console.log(fullQuantity)
            productEqu.Quantity --;
            totalPrice +=parseInt(productEqu.Price);
            console.log("totalCost"+totalPrice)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" v-if="product.Quantity > 0" @click="getprodId(product.ID)">Add to cart</button>
        </div>
        </div>`
}); 
function randomIdgenerator() {
    var n = '', i = 0;
    while (i++ < 36) {
        var x = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
            r = Math.random() * 16 | 0,
            v = x == 'x' ? r : (r & 0x3 | 0x8);
        n += (x == '-' || x == '4') ? x : v.toString(16)
    }
    return n;
}
Vue.component('admin', {


    data() {
        return {

            Title: '',
            Price: 0,
            Description: '',
            Type: '',
            Img: '',
            Quantity: '',
            
        }
    },
    methods: {
        addProducts(){
            var newprod = {
                ID: '',
                Title: '',
                Price: 0,
                Description: '',
                Type: '',
                Img: '',
                Quantity: '',
            }

            newprod.ID = randomIdgenerator();
            newprod.Title = this.Title;
            newprod.Price = parseInt(this.Price);
            newprod.Description = this.Description;
            newprod.Type = this.Type;
            newprod.Img = this.Img;
            newprod.Quantity = this.Quantity;

            console.log('New product added')
            vuee.shop.push(newprod);
        },
    },




        
    
    template: 
       `<div class="itemarea">
         <div class="items">
         <label for="Title">Title:</label>
         <input id="title" type="text" v-model="Title">
         <br>
         <br>
         <label for="Price">Price:</label>
         <input id="price" type="number" min="0" v-model="Price">
         <br>
         <br>
         <label for="Description">Descri:</label>
         <input id="description" v-model="Description">
         <br>
         <br>
         <label for="Type">Type:</label>
         <input id="type" v-model="Type">
         <br>
         <br>
         <label for="imgUrl">ImgUrl:</label>
         <input id="imgUrl" type="text" v-model="Img">
         <br>
         <br>
         <button @click="addProducts()">Add product</button>
         </div>
        </div>`
}); 

