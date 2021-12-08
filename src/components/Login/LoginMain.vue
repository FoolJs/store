<template>
    <div class="login-main">
        <p class="login-close">
            <i class="mi icon-guanbi" @click="closePage"></i>
        </p>
        <p class="login-pattern">
            <span @click="changePattern()">{{ pattern }}</span>
        </p>



        <div 
            v-for="item of form" 
            :key="item.id"
            v-show="registerShow(item.pattern)"
            class="field"
            :class="{'field-code': item.name === 'Code'}"
        >
            <p>
                <input 
                    :type="item.type" 
                    v-model="item.model"
                    @blur="ruleChecking(item.name)"
                    :placeholder="item.placeholder"
                    :maxlength="item.maxlength"
                />
                <captcha
                    v-if="item.name === 'Code'"
                    @code-start="requestCode()"
                ></captcha>
            </p>
            <span>{{ item.rule }}</span>
        </div>

        <div class="field-button">
            <p>
                <button @click="loginOrRegister">{{ pattern }}</button>
            </p>
        </div>

    </div>
</template>

<script>
import Captcha from './Captcha.vue';
import {getCode, register, login} from '@/server/login.js';
import Message from '../BaseMessage/index.js';

export default {
    name: 'LoginMain',
    components: {
        Captcha
    },
    data () {
        return {
            form: [
                {
                    name: 'Email', 
                    type: 'email', 
                    model: '', 
                    rule: '', 
                    pattern: '登录',
                    placeholder: '电子邮箱',
                    maxlength: 25
                },
                {
                    name: 'PassWord', 
                    type: 'password', 
                    model: '', 
                    rule: '', 
                    pattern: '登录',
                    placeholder: '密码',
                    maxlength: 18
                },
                {
                    name: 'Code', 
                    type: 'text', 
                    model: '', 
                    rule: '', 
                    pattern: '注册',
                    placeholder: '验证码',
                    maxlength: 4
                },
            ]
        }
    },
    computed: {
        pattern () {
            return this.$store.state.login.pattern;
        }
    },
    methods: {
        changePattern () {
            if ( this.pattern === '登录' ) {
                this.$store.commit( 'changePattern', '注册' );
                return;
            }
            if ( this.pattern === '注册' ) {
                this.$store.commit( 'changePattern', '登录' );
                return;
            }
        },
        registerShow (pattern) {
            if ( pattern === '登录' ) {
                return true;
            }
            if ( this.pattern === pattern && pattern === '注册' ) {
                return true;
            }
        },
        closePage () {
            this.$store.commit('closeShow');
        },
        requestCode () {

            this.checkEmail();

            if ( this.form[0].rule !== '' ) {
                return;
            }
            getCode({
                Email: this.form[0].model,
            })
            .then( res => {
                Message({
                    type: res.data.type,
                    message: res.data.message
                });
            } )
            .catch( err => {
                console.log(err);
                Message({
                    type: 'error',
                    message: '请检查您的网络连接'
                });
            })

        },
        // 登录
        requestLogin () {

            login({Email: this.form[0].model, PassWord: this.form[1].model})
            .then( res => {

                if ( res.data.type === 'success' ) {
                    this.$store.commit( 'setToken', res.data.token );
                    this.$store.commit('closeShow');
                }

                Message({
                    type: res.data.type,
                    message: res.data.message
                });

            })
            .catch( err => {
                console.log(err);
                Message({
                    type: 'error',
                    message: '请检查您的网络连接'
                });
            })

        },
        // 注册
        requestRegister () {
            register({
                Email: this.form[0].model,
                PassWord: this.form[1].model,
                Code: this.form[2].model
            })
            .then( res => {
                Message({
                    type: res.data.type,
                    message: res.data.message
                });

                if ( res.data.type === 'success' ) {
                    this.$store.commit('changePattern', '登录');
                }
            })
            .catch( err => {
                console.log(err);
                Message({
                    type: 'error',
                    message: '请检查您的网络连接'
                });
            })
            
        },
        loginOrRegister () {
            if ( this.pattern === '登录' ) {
                this.checkEmail();
                this.checkPassWord();

                if ( this.form[0].rule === '' && this.form[1].rule === '' ) {
                    this.requestLogin ();
                } else {
                    return;
                }
            }
            if ( this.pattern === '注册' ) {
                this.checkEmail();
                this.checkPassWord();
                this.checkCode();

                for ( let item of this.form ) {
                    if ( item.rule !== '' ) {
                        return;
                    }
                }

                this.requestRegister ();
            }
        },
        ruleChecking(name) {
            switch (name) {
                case 'Email':
                    this.checkEmail ();
                    break;
                case 'PassWord':
                    this.checkPassWord ();
                    break;
                case 'Code':
                    this.checkCode ();
                    break;
            }
        },
        checkEmail () {
            let model = this.form[0].model;

            if (
                !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
                    model
                )
            ) {
                this.form[0].rule = '请输入合法的电子邮箱';
            } else if ( model.length === 0 ) {
                this.form[0].rule = '请输入合法的电子邮箱';
            }else {
                this.form[0].rule = '';
            }
        },
        checkPassWord () {
            let model = this.form[1].model;

            if (!/^[a-zA-Z]\w{5,17}$/.test(model)) {
                this.form[1].rule =
                    '密码需以字母开头，6位以上，不能包含特殊字符';
            } else {
                this.form[1].rule = '';
            }
        },
        checkCode () {
            let model = this.form[2].model;

            if (model === '') {
                this.form[2].rule = '请输入验证码';
            } else if (model.length != 4) {
                this.form[2].rule = '验证码为4位';
            } else {
                this.form[2].rule = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.login-main {
    width: 20%;
    min-height: 300px;
    padding: 30px;
    background: white;
    border-radius: 3px;

    > .login-close {
        display: flex;

        > i {
            margin-left: auto;
            cursor: pointer;
        }
    }

    > .login-pattern {
        margin-bottom: 1em;
        font-size: 1.2em;
        text-align: center;

        > span {
            cursor: pointer;
        }
    }

    > .field {
        height: 70px;

        > p {
            width: 100%;

            > input {
                width: 100%;
                margin-bottom: 5px;
                padding: 10px;
                border: 1px solid rgb(214, 211, 211);
            }
        }

        > span {
            font-size: .8em;
            color: red;
        }
    }

    > .field-code {

        > p {
            display: flex;

            > input {
                flex: 7;
            }
            > button {
                flex: 3;
                margin-left: 2em;
                margin-bottom: 5px;
                padding: 10px;
                background: white;
                border: 1px solid rgb(214, 211, 211);
            }
        }
    }

    > .field-button {
        > p > button {
            width: 100%;
            padding: 10px;
            margin-top: 1em;
            border: 1px solid rgb(214, 211, 211);
            background: #f7630d;
            color: white;

            &:hover {
                background: #f37d38;
            }
        }
    }
}


</style>