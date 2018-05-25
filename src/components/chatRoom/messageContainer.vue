<template>
  <div class="msg-container">
    <div class="content" v-bind:class="{'content-lt': (item.status === 0),'content-rg': (item.status!==0)}" v-for="(item) in message ">
      <Avatar v-bind:class="{'left': (item.status === 0),'right': (item.status!==0)}" shape="square" icon="person" size="large" :src="item.content.sender.avatar" />
      <div class="bubble js_message_bubble bubble_primary" v-bind:class="{'bubble-left': (item.status === 0),'bubble-right': (item.status!==0)}">
        <div class="plain">
          <pre class="js_message_plain">{{item.content.text}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "messageContainer",
      props: [ 'message' ]
    }
</script>

<style scoped>
  /*msg container*/
  .msg-container{
    padding-top: 20px;
  }
  .msg-container .content{
    color: black ;
    min-height: 50px;
    clear: both;
  }
  .msg-container .content-rg{
    padding-right: 10px;
  }
  .msg-container .content-lt{
    padding-left: 10px;
  }
  .msg-container .right{
    float: right;
  }
  .msg-container .left{
    float: left;
  }
  .msg-container .bubble{
    position: relative;
    padding: 10px 10px;
    margin: 5px 0;
    color: #000;
    font-size: 15px;
    text-align: left;
    border-radius: 0.5em;
    background-color: #B2E281;
  }
  .msg-container .bubble:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px solid rgba(0, 0, 0, 0);
    border-left-width: 0;
  }
  .msg-container .bubble-left{
    margin-left: 16px;
    float: left;
  }
  .msg-container .bubble-left:after {
    border-right-color: #B2E281;
    top: 0%;
    right: 100%;
    margin-top: 0.9em;
    border-left-width: 0.0em;
    border-right-width: 0.6em;
    border-bottom-width: 0.4em;
    border-top-width: 0.4em;
  }
  .msg-container .bubble-right{
    margin-right: 16px;
    float: right;
  }
  .msg-container .bubble-right:after {
    border-left-color: #B2E281;
    top: 0%;    left: 100%;
    margin-top: 0.9em;
    border-right-width: 0.0em;
    border-left-width: 0.6em;
    border-bottom-width: 0.4em;
    border-top-width: 0.4em;
  }
  .msg-container .bubble .plain{
    background: #B2E281;
    max-width: 360px;
    min-width: 20px;
    min-height: 20px;
  }
  .msg-container .bubble .plain pre{
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    white-space: pre-wrap;
    word-break: normal;
  }
</style>
