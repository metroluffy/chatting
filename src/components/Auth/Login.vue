<template>
  <div class="login-page">
    <Row>
      <Col span="6" offset="9" class="login-container">
        <div class="login-logo">
          <img src="../../assets/icon-chatting.png"/>
        </div>
        <div class="input-group">
          <div class="group">
            <input type="email" name="email" v-model="email" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>邮箱</label>
          </div>
          <div class="group">
            <input type="password" name="password" v-model="password" required @keyup.enter="login">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>密码</label>
          </div>
        </div>
        <div class="login-button-group">
          <a href="/#/register">
            <button>注 册</button>
          </a>
          <button style="margin-left: 20px" v-on:click="login">登 录</button>
        </div>
        <a href="/#/forgot">
          <p style="margin-top: 20px;text-align: center;cursor: pointer;color: rgba(0, 0, 0,0.6);">忘记密码?</p>
        </a>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    login(){
      if(this.validate()){
        this.$http.post('/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          if(res.status !== 200 || res.data.errorCode !== 2000){
            let msg = res.data.message ? res.data.message : '抱歉，出错了~'
            this.$Message.error(msg);
          }else{
            this.$Message.success(res.data.message);
            this.$store.commit('login', res.data.token)
            this.$store.commit('setCurrentUser', res.data.user)
            this.$router.push('/')
          }
        })
          .catch(function () {
            this.$Message.error('抱歉，出错了~');
          });
      }
    },
    validate(){
      if(!this.email || !this.password){
        this.$Message.error('请填写密码或邮箱！');
        return false
      }else if(!new RegExp('[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?').test(this.email)){
        this.$Message.error('请正确填写邮箱格式！');
        return false
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container{
    background-color: #c1c6cc;
    height: 400px;
    margin-top: 10%;
    padding: 20px;
  }
  .login-logo img{
    width: 256px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -10%;
  }
  /* form starting stylings ------------------------------- */
  .group 			  {
    position:relative;
    margin-bottom:45px;
  }
  input 				{
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:90%;
    margin-left: 5%;
    border:none;
    border-bottom:1px solid #757575;
    background-color: transparent;
  }
  input:focus 		{ outline:none; }

  /* LABEL ======================================= */
  label 				 {
    color:#999;
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5%;
    top:10px;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label 		{
    top:-20px;
    font-size:14px;
    color:#5264AE;
  }

  /* BOTTOM BARS ================================= */
  .bar 	{ position:relative; display:block; width:90%;left: 5% }
  .bar:before, .bar:after 	{
    content:'';
    height:2px;
    width:0;
    bottom:1px;
    position:absolute;
    background:#5264AE;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%;
  }

  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position:absolute;
    height:60%;
    width:100px;
    top:25%;
    left:5%;
    pointer-events:none;
    opacity:0.5;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }

  /* Button */
  button{
    transform: translateX(25%);
    outline: none;
    height: 40px;
    text-align: center;
    width: 130px;
    border-radius: 40px;
    background: #1ECD97;
    border: 2px solid #1ECD97;
    color: #fff;
    letter-spacing: 1px;
    text-shadow: 0;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.25s ease;
  }
</style>
