<template>
  <form action="" method="post" id="dataform">
    <h3>{{ action === "create" ? "Crear Producto" : "Editar Producto" }}</h3>
    <p>
      <b>Nombre:</b>
    </p>

    <InputText
      id="name"
      type="text"
      v-model="Data.title"
      placeholder="Nombre del producto"
      
    />

    <p><b>Precio:</b></p>
    <InputNumber
      v-model="Data.price"
      :min="0"
      :max="1000"
      mode="currency"
      currency="USD"
    />

    <p><b>Descripción:</b></p>
    <Textarea
      v-model="Data.description"
      rows="5"
      cols="30"
      placeholder="Descripción del producto"
    />
    <p><b>Categoria:</b></p>
    <Dropdown
      v-model="Data.category"
      :options="categories"
      optionLabel="name"
      :editable="true"
      placeholder="Categoria del producto"
    />
    <hr />
    <div class="flex justiify-content-even">
      <!-- <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="closeModal" /> -->
      <Button
        label="Guardar"
        class="p-button-rounded"
        v-if="action === 'edit'"
        @click="UpdateProduct"
      />
      <Button
        label="Guardar"
        class="p-button-rounded"
        v-if="action === 'create'"
        @click="SaveProduct"
      />
    </div>
  </form>
  <Toast />
  <div>
    {{ action }}
    {{ information }}
  </div>
</template>

<script setup>
import { ref, computed,reactive,defineEmits } from "vue";
import ProductService from "@/services/ProductService";

const props = defineProps({
  action: String,
  information: {
    Type: Object,
  },
  categories: Array,
});


let Data= reactive({
    id:props.information.id|null,
    title:ref(props.information.title)||'',
    price:ref(props.information.price) || 0,
    description:ref(props.information.description)||'',
    category:ref(props.information.category)||''
  })
 
const SaveProduct = () => {
  ProductService.createProduct(Data).then(
    ((product) => {
      handleEmit(product)
      console.log(product);
    }).bind(this)
  );
};
const UpdateProduct = () => {
  handleEmit(Data)
};

// const sendInfo= defineEmits(product);
const emit=defineEmits(['sendInfo'])
const handleEmit = (event) => {
  emit('sendInfo', event)
  emit('closeModal',false)
}

</script>

<style lang="css" scoped></style>
