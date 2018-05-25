<template>
  <div class="login-page">
    <Row>
      <Col span="6" offset="9" class="login-container">
        <div class="login-logo">
          <img src="../../assets/icon-chatting.png"/>
        </div>
        <div class="input-group">
          <div class="group">
            <input type="email" name="email" v-model="email" required disabled="disabled">
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div class="group">
            <input type="password" name="password" v-model="password" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>新密码</label>
          </div>
          <div class="group">
            <input type="password" name="confirm-password" v-model="confirmPwd" required @keyup.enter="register">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>再次输入密码</label>
          </div>
        </div>
        <div class="login-button-group">
          <button v-on:click="restpass">重置密码</button>
        </div>
        <p style="margin-top: 20px;text-align: center;cursor: pointer;">
          <a href="/#/register" style="margin-right:10px;color: rgba(0, 0, 0,0.6);">注册</a>
          <a href="/#/login" style="margin-left:10px;color: rgba(0, 0, 0,0.6);">登录</a>
        </p>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'ResetPassword',
    data () {
      return {
        email: '',
        password: '',
        confirmPwd: ''
      }
    },
    mounted(){
      this.validateUrl()
    },
    methods:{
      validateUrl(){
        let code = this.$route.query.active
        if(!code){
          this.$router.push('/login')
        }else{
          this.$http.get('/resetpass/'+code).then(res => {
            if(res.status !== 200 || res.data.errorCode !== 2020){
              let msg = res.data.message ? res.data.message : '抱歉，出错了~'
              this.$Message.error(msg)
              this.$router.push('/login')
            }else{
              this.email = res.data.email
            }
          }).catch(e => {
            this.$Message.error("抱歉，出错了~")
            console.log(e)
          })
        }
      },
      restpass(){
        const that = this
        if(that.validate()){
          that.$http.post('/resetpass', {
            email: that.email,
            password: that.password,
            password_confirm:that.confirmPwd,
            code: this.$route.query.active
          }).then(res => {
            if(res.status !== 200 || res.data.errorCode !== 2020){
              let msg = res.data.message ? res.data.message : '抱歉，出错了~'
              that.$Message.error(msg);
            }else{
              that.$Message.success(res.data.message);
              that.$router.push('/login')
            }
          })
            .catch(function (e) {
              console.log(e)
            });
        }
      },
      validate(){
        if(!this.email){
          this.$Message.error('请填写邮箱！');
          return false
        }else if(!new RegExp('[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?').test(this.email)){
          this.$Message.error('请正确填写邮箱格式！');
          return false
        }else if(this.password !== this.confirmPwd){
          this.$Message.error('两次密码输入不一致哦，请重新输入！');
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .login-container{
    background-color: #c1c6cc;
    height: 440px;
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
    margin-bottom:25px;
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
    transform: translateX(60%);
    outline: none;
    height: 40px;
    text-align: center;
    width: 160px;
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
