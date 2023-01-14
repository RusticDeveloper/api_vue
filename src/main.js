import { createApp } from 'vue'
import App from './App.vue'
//PrimeVue and it´s components imports
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'   
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
// import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
// import Row from 'primevue/row';

const app = createApp(App);

app.use(PrimeVue);
//components of primeVue
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Button', Button);
app.mount('#app');