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
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';

//Prime Vue services
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue);
app.use(ConfirmationService); //confirm service used for thw confirm popup
app.use(ToastService); //confirm service used for toasts
//components of primeVue
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('Textarea', Textarea);
app.component('InputNumber', InputNumber);
app.component('Dropdown', Dropdown);
app.mount('#app');