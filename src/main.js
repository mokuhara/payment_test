import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import TextareaAutosize from 'vue-textarea-autosize'

createApp(App).use(store).use(router).mount('#app')