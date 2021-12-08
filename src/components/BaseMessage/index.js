import Main from './Message.vue';
import Vue from 'vue';


const MessageConstructor = Vue.extend(Main);
let instance;


function Message (option) {

    if ( instance?.$el ) {
        instance?.$el?.remove();
    }

    instance = new MessageConstructor({
        data() {
            return {
                type: option.type,
                message: option.message,
            };
        },
    });

    instance.$mount();

    const app = document.getElementById('app');

    app.appendChild(instance.$el);


    let timerId = null;

    timerId = setTimeout(() => {
        clearTimeout(timerId);
        timerId = null;
        instance?.$el?.remove();
    }, 3000);
}


export default Message;