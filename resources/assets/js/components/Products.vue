<template>
  <div class="products" id="products">
          <Navbar></Navbar>

      <div class="container">
          <h1 class="text-center p-5">Our Products</h1>
          <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
          <h3 class="text-center p-5"> now it's static </h3> 
          <div class="row">
              
              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Surface Book 2</h5>
                            <p class="card-text">
                                Complete your device with Office 365 and get 1TB cloud storage, Excel, Word, PowerPoint & more. Select your suite during checkout.
                            </p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Surface Laptop 2</h5>
                            <p class="card-text">
                               Style and speed. Go beyond the traditional with new Surface Laptop 2. Featuring improved performance and the full Windows 10 Home experience.
                            </p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product3.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Surface Studio 2</h5>
                            <p class="card-text">
                                    The ultimate creative studio. Let your ideas flow with brilliant color, blazing graphics, faster processors, intuitive tools, and a stunning, adjustable 28” display.

                            </p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>
              <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Add Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
            </div>
          </div>
        </div>
      </div>
          </div>
      </div>

 <login></login>

  </div>
</template>

<script>
//import Login from "@/components/Login.vue";
import { VueEditor } from "vue2-editor";

export default {
  name: "Products",
  
  components: {
    VueEditor
  },
  
  props: {
    msg: String
  },

  data(){
    return {
        products: [],
        product: {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
        },
        activeItem:null,
        modal: null,
        tag: null
    }
  },

  methods:{

    addTag(){
       this.product.tags.push(this.tag);
       this.tag = "";
    },

    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
    },

    addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
  }
};
</script>  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
    .products{
        margin-top: 0;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
