const url = "scripts/products.json";
let cart = [];
nonexistId = 0;

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
        switchPage: function(page){
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
        removefromCart(index){
            this.cart.splice(index,1);
    
        }
        
    }
});


/* inte helt fungerande ännu*/ 
Vue.component('cart', {

    data() {
        return{
            cartList: cart
        }
    },
    methods:{
        removefromCart(index){
            cart.find(item => item.ID === ID);
            this.cartList.splice(index,1);
            console.log(this.cartList)
    
        },
        switchPage: function(page){
            this.currentPage = page;
        }
    },
    template:
    `<div class="cart">
       <ul v-for="product in cartList">
       <li @click="removefromCart()">
       <strong>Total: {{product.Price}}$</strong>
     <br>
       <strong>Quantity: {{product.Title}}</strong>
     <br>
     
       </li>
       </ul>
       <button class="checkoutbutton" @click="switchPage('checkcart')">Checkout</button>
     </div>`
    
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
        
    },
    template: 
       `
       <div class="itemarea"
       <label for="name">Name</label>
       <input type="text" id="name" name="namn" placeholder="Name" pattern=[A-Z\sa-z]{3,20} required>
       <label for="email">E-mail</label>
       <input type="email" id="email" name="email" placeholder="SplitVision@email.com" required>
       <label for="phone">Phone</label>
       <input type="tel" id="phone" name="num" placeholder="+46123456789" pattern=(\d{3})-?\s?(\d{3})-?\s?(\d{4}) required>
       <label for="name">Address</label>
       <input type="text" id="address" name="address" placeholder="Address" pattern=[A-Z\sa-z]{3,20} required>
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
            let itemMatch = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(itemMatch)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" @click="getprodId(product.ID)">Add to cart</button>
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
            let itemMatch = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(itemMatch)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" @click="getprodId(product.ID)">Add to cart</button>
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
            let itemMatch = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(itemMatch)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" @click="getprodId(product.ID)">Add to cart</button>
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
            let itemMatch = vuee.shop.find(item => item.ID === ID);
            this.cartList.push(itemMatch)
        }
    },
    template: 
       `<div class="itemarea">
        <div class="items" v-for="product in visibleonPage">
        <img class="img" :src=product.Img>
        <h1>{{product.Title}}</h1>
        <p>{{product.Description}}</p>
        <p class="price">{{product.Price}}$</p>
        <button :key="product.ID" @click="getprodId(product.ID)">Add to cart</button>
        </div>
        </div>`
}); 

Vue.component('admin', {


    data() {
        return {

            ID:0,
            Title:"",
            Price:0,
            Description:"",
            Type:"",
            Img:"",
            visiblefirstPage: false,
            
        }
    },
    methods: {
        addProducts(){

            var newProd = [{
                "ID":nonexistId,
                "Title": this.Title,
                "Price": parseFloat(this.Price),
                "Description": this.Description,
                "Type": this.Type,
                "Img": this.Img,
            }]
            if(this.Type === 'Men'){
                vuee.shop.push(newProd)
            }
            else if (this.Type === 'Women') {
                vuee.shop.push(newProd)
            } 
            else if(this.Type === 'Jewelry'){
                vuee.shop.push(newProd)
            }

            nonexistId ++;





            /* this.vuee.shop.push({
                ID:"",
                Title:this.Title,
                Price:"",
                Description:this.Description,
                Type:this.Type,
                Img:this.Img,
                visiblefirstPage: false,
            })
            vuee.shop = JSON.parse(JSON.stringify(this.addProducts)) */
        }
    },
    template: 
       `<div class="itemarea">
         <div class="items">
         <label for="Title">Title:</label>
         <input id="title" type="text" v-model="title">
         <br>
         <br>
         <label for="Price">Price:</label>
         <input id="price" type="number" min="0" v-model="price">
         <br>
         <br>
         <label for="Description">Descri:</label>
         <input id="description" v-model="description">
         <br>
         <br>
         <label for="imgUrl">ImgUrl:</label>
         <input id="imgUrl" type="text" v-model="img">
         <br>
         <br>
         <button @click="addProducts()">Add product</button>
         </div>
        </div>`
}); 

