<template>
  <div class="Header">
    <h1>{{ msg }}</h1>
  </div>
  <div>
    <DataTable
      :value="products"
      :paginator="true"
      :rows="5"
      :filters="filters"
      v-model:selection="selectedProdutcs"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Del {first} al {last} de {totalRecords} productos"
      responsiveLayout="scroll"
    >
      <template #header>
        <div
          class="table-header flex flex-column md:flex-row md:justiify-content-between"
        >
          <h5 class="mb-2 md:m-0 p-as-md-center">Productos</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Buscar..."
            />
          </span>
          <div class="p-as-md-rigth">
            <Button
              icon="pi pi-plus"
              class="p-button-rounded p-button-success mr-2"
              label="Agregar un Producto"
              @click="createProduct"
            />
          </div>
        </div>
      </template>
      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column field="title" :sortable="true" header="Nombre"></Column>
      <Column field="price" :sortable="true" header="Precio"></Column>
      <Column
        field="description"
        :sortable="true"
        header="Observación"
      ></Column>
      <Column field="category" :sortable="true" header="Categoria"></Column>
      <!-- <Column header="Imagen" field="images">
        <template #body="slotProps">
          <img src="{{products[0].images[0]}}" :alt="slotProps.data.image"
            class="product-image" />
        </template>
      </Column> -->
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          />
          <ConfirmPopup group="demo">
            <template #message="slotProps">
              <div class="flex p-4">
                <i
                  :class="slotProps.message.icon"
                  style="font-size: 1.5rem"
                ></i>
                <p class="pl-2">{{ slotProps.message.message }}</p>
              </div>
            </template>
          </ConfirmPopup>
          <Toast />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="productCUDDialog"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <ProductModal
        :action="action"
        :information="information"
        :categories="categories"
        @sendInfo="GetInfo($event)"
        @closeModal="getModalstate($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import ProductService from "@/services/ProductService";
import ProductModal from "@/components/ProductModal";

export default {
  name: "CRUDAPI",
  props: {
    msg: String,
  },
  components: {
    ProductModal,
  },
  data() {
    return {
      products: [],
      filters: {},
      selectedProdutcs: null,
      productCUDDialog: false,
      action: String,
      information: Object,
      categories: { type: Array },
    };
  },
  created() {
    this.initFilters();
    this.getProducts();
    this.getCategories();
    
  },
  methods: {
    async getProducts() {
      // Use the eventService to call the getEventSingle() method
      ProductService.getProducts().then(
        ((productss) => {
          this.products = productss.products;
          
          // this.$set(this, "products", products);
        }).bind(this)
      );
    },
    async getCategories() {
      ProductService.getCategories().then(
        ((categoriess) => {
          console.log(
            categoriess.map((category) => {
              return { name: category };
            })
          );
          this.categories = categoriess.map((category) => {
            return { name: category };
          });
        }).bind(this)
      );
    },
    async deleteProduct(productId) {
      ProductService.deleteProduct(productId).then(
        ((deleted)=>{
          this.products.splice(this.products.findIndex((element)=>{return element.id==deleted.id}),1)
        }).bind(this)
      );
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    editProduct(data) {
      this.productCUDDialog = true;
      this.action = "edit";
      this.information = data;
    },
    confirmDeleteProduct(data) {
      this.information = data;
      this.showTemplate(event);
    },
    createProduct() {
      this.productCUDDialog = true;
      this.action = "create";
      this.information = {};
    },
    GetInfo(data){
      this.products.findIndex((element)=>element.id==data.id)===-1?this.products.push(data):this.products.splice(this.products.findIndex((element)=>element.id==data.id),1,data)
      console.log(this.products)
      console.log(data)
    },
    getModalstate(data){
      this.productCUDDialog=data
    },
    showTemplate(event) {
      this.$confirm.require({
        target: event.currentTarget,
        group: "demo",
        message: "¿Realmente desea eliminar el registro?",
        icon: "pi pi-exclamation-triangle",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        acceptClass: "p-button-danger",
        accept: () => {
          this.deleteProduct(this.information.id);
          this.$toast.add({
            severity: "info",
            summary: "Registro Eliminado",
            detail: "Se elimino el registro seleccionado",
            life: 3000,
          });
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Cancelado",
            detail: "El registro no fue borrado",
            life: 3000,
          });
        },
      });
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
