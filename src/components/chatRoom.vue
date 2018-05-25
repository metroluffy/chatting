<template>
  <div class="main">
    <Row>
      <Col span="12" offset="6" class="chat-container">
        <Col span="8" class="left-bar">
          <div class="header">
            <div class="avatar">
              <Avatar shape="square" icon="person" size="large" :src="currentUser.avatar" />
            </div>
            <h3 class="nickname">{{currentUser.nickname}}</h3>
            <a class="opt" href="javascript:;">
              <Dropdown trigger="click">
                <a href="javascript:void(0)">
                  <Icon type="navicon" size="30" color="grey"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem><Icon type="android-person-add" size="24" style="vertical-align: middle"></Icon><a>添加朋友</a></DropdownItem>
                  <DropdownItem>
                    <div v-on:click="logout">
                      <Icon type="log-out" size="24" color="firebrick" style="vertical-align: middle"></Icon><a>退出登陆</a>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </a>
          </div>
          <div class="search-bar">
            <Icon type="ios-search-strong" color="grey" style="vertical-align: middle;position: absolute;margin-left: 6px;margin-top: 4px" size="24"></Icon>
            <input v-model="searchKey" class="search-form" placeholder="搜索" @keyup.enter="search"/>
          </div>
          <div class="tab-switch-container">
            <div class="tabs">
              <div class="tab">
                <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
                <label for="tab-1" class="tab-label">
                  <Icon type="chatbubble" size="24"></Icon>
                </label>
                <div class="tab-content">
                  <div class="msg-list" id="msg-list">
                    <div class="msg-list-item" v-if="item.user" :data-user-id="item.user.id" v-for="(item) in messagesList " v-on:click = "displaySesiion(item.user.id,item.group)">
                      <div class="chat_item">
                        <div class="avatar">
                          <Badge>
                            <Avatar shape="square" icon="person" size="large" :src="item.user.avatar" />
                          </Badge>
                        </div>

                        <div class="info">
                          <h3 class="nickname">
                            <span class="nickname_text">{{item.user.remark ? item.user.remark : item.user.nickname}}</span>
                          </h3>
                          <h4 class="new-msg">
                            <span class="text">{{item.message.text}}</span>
                          </h4>
                          <h4 class="new-msg-time">
                            <span class="content">{{DateFormat(item.message.timeout)}}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab">
                <input type="radio" name="css-tabs" id="tab-2" class="tab-switch">
                <label for="tab-2" class="tab-label">
                  <Icon type="android-contacts" size="24"></Icon>
                </label>
                <div class="tab-content">
                  <div class="contact-list" id="contact-list">
                    <div v-if="contact.groups">
                      <h4 class="contact-list-title">群组</h4>
                      <div class="group-list-item"  v-for="(item) in contact.groups " data-uuid="item.id" v-on:click="displayContactDetail(item.id,true)">
                        <div class="group_item">
                          <div class="avatar">
                            <Avatar shape="square" icon="person" size="default" :src="item.avatar" />
                          </div>
                          <h3 class="nickname">
                            {{item.remark ? item.remark : item.nickname}}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div v-if="contact.friends">
                      <h4 class="contact-list-title">联系人</h4>
                      <div class="contact-list-item"  v-for="(item) in contact.friends "  data-uid="item.id">
                        <div class="contact_item" v-on:click="displayContactDetail(item.id)">
                          <div class="avatar">
                            <Avatar shape="square" icon="person" size="default" :src="item.avatar" />
                          </div>

                          <h3 class="nickname">
                            {{item.remark ? item.remark : item.nickname}}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab">
                <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">
                <label for="tab-3" class="tab-label">
                  <Icon type="clipboard" size="24"></Icon>
                </label>
                <div class="tab-content">3</div>
              </div>
            </div>
          </div>
        </Col>
        <Col span="16" class="right-bar">
          <div v-if="hasChat && !hasContactDetail">
            <div class="message-box-banner">
              <span class="contact-name">{{currentSession.user.remark ? currentSession.user.remark : currentSession.user.nickname}}</span>
              <span class="more">
            <Icon type="person" size="24"></Icon>
          </span>
            </div>
            <div id="message-container" class="message-container" ref="scrollToEnd">
              <messageContainer :message="currentSession.messages"></messageContainer>
            </div>
            <div class="message-input-box">
              <div class="MsgSendContainer">
                <div class="toolbar" id="tool_bar">
                  <a class="tool web_wechat_face" href="javascript:;" title="表情">
                    <Icon type="android-happy" color="#5B6A77" size="28"></Icon>
                  </a>
                </div>
                <div class="content" @keyup.enter.exact="sendMessage">
                  <Input v-model="new_message" id="editArea" class="flex edit_area" type="textarea" :rows="5" placeholder=""></Input>
                  <span class="caret_pos_helper" id="caretPosHelper"></span>
                </div>
                <div class="action">
                  <span class="desc">按下Shift+Enter换行</span>
                  <button class="btn btn_send" v-on:click="sendMessage">发送</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="hasContactDetail && !hasChat" class="contact-detail-container">
            <div class="contact-detail-header">
              <h4>详细信息</h4>
            </div>
            <div class="contact-detail-content">
              <div class="contact-avatar">
                <img :src="contactDetail.avatar"/>
              </div>
              <div class="contact-nickname">
                <h2>{{contactDetail.nickname}}</h2>
                <div v-if="contactDetail.remark" class="contact-remark">备注：{{contactDetail.remark}}</div>
                <div v-if="contactDetail.description" class="contact-remark">描述：{{contactDetail.description}}</div>
              </div>
              <div class="operation-for-contact">
                <button class="ivu-btn ivu-btn-success success" v-on:click="displaySesiion(contactDetail.id,contactDetail.group)">发消息</button>
                <Collapse>
                  <Panel name="1">
                    危险操作
                    <p slot="content">
                      <button class="ivu-btn ivu-btn-error delete" v-on:click="deleteContact(contactDetail.id)">{{contactDetail.group ? '退出群聊' : '删除好友'}}</button>
                    </p>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center;position: relative;top: 50%;transform: translateY(-50%);">
            <Icon type="chatbubbles" size="48" color="#e3e3e3"></Icon>
          </div>
        </Col>

      </Col>
    </Row>
    <Modal
      v-model="showSearchResult"
      title="搜索结果"
      okText="添加为好友"
      @on-ok="addFriend">
      <div class="contact-detail-content">
        <div class="contact-avatar">
          <img v-if="searchResult.avatar" :src="searchResult.avatar">
        </div>
        <div class="contact-nickname">
          <h2>{{searchResult.nickname}}</h2>
          <div v-if="contactDetail.remark" class="contact-remark">备注：{{searchResult.remark}}</div>
          <div v-if="contactDetail.description" class="contact-remark">描述：{{searchResult.description}}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<style>
  .chat-container{
    height: 600px;
    margin-top: 100px;
  }
  /*left*/
  .left-bar{
    background: #2e3238;
    height: 100%;
  }
  .right-bar{
    height: 100%;
    background: #EEEEEE;
    position: relative;
  }
  /*left-user-control*/
  .header{
    height: 15%;
    padding: 18px;
    position: relative;
  }
  .header .avatar {
    display: inline-block;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    padding-right: 10.625px;
    cursor: pointer;
  }
  .header .avatar .img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    cursor: pointer;
  }
  .header .nickname {
    display: inline-block;
    font-weight: 400;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #fff;
    font-size: 18px;
    vertical-align: middle;
    text-decoration: none;
    text-align: left;
  }
  .header .opt {
    position: absolute;
    right: 18px;
    top: 25px;
  }
  .header .opt .ivu-dropdown-menu li{
    border-bottom: 1px solid #f1f1f1;
  }
  .header .opt .ivu-dropdown-menu li a{
    text-decoration: none;
    color: #000;
    font-size: 14px;
    padding: 8px;
    font-weight: 400;
    text-align: left;
    vertical-align: middle;
  }
  .search-bar{
    height: 8%;
  }
  .search-bar .search-form{
    width: 100%;
    height: 32px;
    line-height: 32px;
    border: 0;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    background-color: #26292e;
    color: #fff;
    padding-left: 30px;
    font-size: 12px;
  }
  .search-bar input:focus{
    outline: none;
  }
  .tab-switch-container{
    height: 77%;
  }
  /* message list */
  .msg-list-item{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #26292e;
  }
  .msg-list-item .avatar {
    position: absolute;
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    padding-right: 10.625px;
    cursor: pointer;
    margin-left: 18px;
  }
  .msg-list-item .avatar .img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    cursor: pointer;
  }
  .msg-list-item .info .nickname{
    font-weight: 400;
    font-size: 14px;
    color: #fff;
    text-align: left;
    margin-left: 68px;
    width: 165px;
  }
  .msg-list-item .info .new-msg{
    font-weight: 400;
    font-size: 12px;
    text-align: left;
    margin-left: 68px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    width: 165px;
    height: 1.725em;
    padding: 5px 0;
  }
  .msg-list-item .info .new-msg .text{
    color: rgba(255,255,255,0.8);
  }
  .msg-list-item .info .new-msg-time{
    font-weight: 400;
    font-size: 12px;
    text-align: right;
    margin-right: 10px;
    margin-top: -40px;
    position: absolute;
    right: 15px;
  }

  /* contact list*/
  .group-list-item{
    padding-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #26292e;
  }
  .group-list-item .avatar {
    position: absolute;
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    padding-right: 10.625px;
    cursor: pointer;
    margin-left: 18px;
  }
  .group-list-item .avatar .img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    cursor: pointer;
  }
  .group-list-item .nickname{
    font-weight: 400;
    font-size: 14px;
    color: #fff;
    text-align: left;
    margin-left: 68px;
    width: 165px;
    line-height: 2;
  }
  .contact-list-title{
    padding: 5px 18px;
    font-weight: 400;
    color: #787b87;
    background: #292d32;
    font-size: 14px;
    text-align: left;
  }
  .contact-list-item{
    padding-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #26292e;
  }
  .contact-list-item .avatar {
    position: absolute;
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    padding-right: 10.625px;
    cursor: pointer;
    margin-left: 18px;
  }
  .contact-list-item .avatar .img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    cursor: pointer;
  }
  .contact-list-item .nickname{
    font-weight: 400;
    font-size: 14px;
    color: #fff;
    text-align: left;
    margin-left: 68px;
    width: 165px;
    line-height: 2;
  }
  /* tab switch */
  .tabs {
    position: relative;
    background: transparent;
  }
  .tabs::before,
  .tabs::after {
    content: "";
    display: table;
  }
  .tabs::after {
    clear: both;
  }
  .tab {
    float: left;
    width: 33.33334%;
  }
  .tab-switch {
    display: none;
  }
  .tab-label {
    position: relative;
    display: block;
    line-height: 2.75em;
    height: 3em;
    padding: 0 1.618em;
    text-align: center;
    background: transparent;
    border-right: 1px solid #26292E;
    border-bottom: 1px solid #26292E;
    color: #dddee1;
    cursor: pointer;
    top: 0;
    transition: all 0.25s;
  }
  .tab-label:hover {

  }
  .tab-content {
    background: transparent;
    position: absolute;
    left: 0;
    width: 100%;
    display: none;
    transition: all 0.35s;
  }
  .tab-switch:checked + .tab-label {
    background: transparent;
    color: #3CAF36;
    border-bottom: 1px solid #26292E;
    border-right: 1px solid #26292E;
    transition: all 0.35s;
    z-index: 1;
  }
  .tab-switch:checked + label + .tab-content {
    display: block;
    transition: all 0.35s;
  }
  /*right-msg-content*/
  .message-box-banner{
    height: 10%;
    border-bottom: 1px solid lightgrey;
  }
  .message-container{
    height: 60%;
    overflow-y: scroll;
    position: absolute;
    top: 10%;
    width: 100%;
  }
  .message-input-box{
    height: 30%;
    position: absolute;
    top: 70%;
    width: 100%;
  }
  .message-box-banner .contact-name{
    float:  left;
    margin-top: 20px;
    margin-left:  20px;
    font-size: 18px;
    color: #000;
  }
  .message-box-banner .more{
    float:  right;
    margin-top: 20px;
    margin-right:  20px;
    color: #5B6A77;
  }
  /* input container*/
  .MsgSendContainer .toolbar{
    border-top: 1px solid lightgrey;
  }
  .MsgSendContainer .toolbar .tool{
    float: left;
    padding: 5px 0;
    margin-left: 20px;
  }
  .MsgSendContainer .content .flex {
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
    border: 0;
    font-size: 14px;
  }
  .MsgSendContainer .ivu-input-wrapper textarea{
    border: 0;
    background-color: transparent;
    color: black;
    padding-left: 15px;
    resize: none;
  }
  .MsgSendContainer .action{
    text-align: right;
    margin-top: -25px;
    right: 0;
    margin-right: 10px;
    position: absolute;
  }
  .MsgSendContainer .action .desc{
    color: #888;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 7px;
  }
  .MsgSendContainer .action a.btn{
    text-decoration: none;
  }
  .MsgSendContainer .action .btn_send {
    background-color: #fff;
    color: #222;
    padding-left: 30px;
    padding-right: 30px;
  }
  .MsgSendContainer .action .btn {
    display: inline-block;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    padding: 3px 20px;
    font-size: 14px;
  }
  .MsgSendContainer .action .btn:hover{
    background-color: #F8F8F8;
  }
  .contact-detail-container{

  }
  .contact-detail-header{
    text-align: center;
    padding: 20px 0 10px;
    font-weight: 100;
    border-bottom: 1px solid #dedede;
  }
  .contact-detail-content .contact-avatar{
    padding: 20px 0;
  }
  .contact-detail-content .contact-avatar img{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .contact-detail-content .contact-nickname{
    text-align: center;
  }
  .contact-nickname .contact-remark{
    margin-top: 20px;
    color: #969696;
  }
  .operation-for-contact{

  }
  .operation-for-contact button{
    display: block;
    width: 160px;
    height: 36px;
    margin: 0 auto;
  }
  .operation-for-contact .success{
    background-color: #42AC3E;
    border-color: #42AC3E;
    margin-top: 40px;
  }
  .operation-for-contact .delete{
    margin-top: 50px;
  }
  .operation-for-contact .ivu-collapse {
     background-color: transparent;
     border: 1px solid transparent;
    margin-top: 20px;
  }
  .operation-for-contact .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    height: 38px;
    line-height: 38px;
    padding: 0;
    color: #666;
    cursor: pointer;
    position: relative;
    text-align: center;
  }
  .operation-for-contact .ivu-collapse-content{
    background-color: transparent;
  }
</style>
<script>
  import io from 'socket.io-client'
  import dayjs from 'dayjs'
  import messageContainer from './chatRoom/messageContainer'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      messageContainer
    },
    data () {
      return {
        socket: null,
        searchKey: '',
        showSearchResult:false,
        searchResult:{},
        new_message: '',
        messagesList: [],
        currentSession: null,
        contactDetail: {},
        hasChat: false,
        hasContactDetail:  false
      }
    },
    watch:{

    },
    computed: mapGetters({
      currentUser: 'getUser',
      contact: 'getContacts'
    }),
    created(){
      // this.connectionSocket()
      // this.watchMessage()
    },
    mounted(){
      this.getFriends()
    },
    methods: {
      connectionSocket() {
        const socketUrl = 'http://127.0.0.1:8000'
        const socket = io.connect(socketUrl);
        const that = this;
        that.socket = socket;
      },
      watchMessage(){
        const that = this
        let id = that.currentUser.id
        that.on(id, (data) => {
          that.commitNewMessage(data.message)
        })
        //todo: 动态监听群组消息
        that.on('groupBroadcast', (data) => {
          if(this.$store.getters.getContactByID(Number(data.message.room),true)){
            that.commitNewMessage(data.message)
          }
        })
      },
      commitNewMessage(message){
        const that = this
        that.$store.commit('getMessage',message);
        /**/
        if(that.currentSession && message.sender.id === that.currentSession.user.id){
          if(that.currentSession.user.group){
            that.getMessage(that.currentSession.user.id,true)
          }else{
            that.getMessage(that.currentSession.user.id)
          }
          this.scrollToEnd()
        }
        that.getMsgList()
      },
      getFriends(){
        const that = this
        let url = '/user/'+that.currentUser.id+'/friends'
        that.$http.get(url).then(res => {
          if(res.status !== 200 || res.data.errorCode !== 2000){
            let msg = res.data.message ? res.data.message : '抱歉，获取好友出错了~'
            that.$Message.error(msg);
          }else{
            that.$store.commit('setContacts',res.data.contacts)
            that.getMsgList()
          }
        })
          .catch(function (e) {
            console.log(e)
            that.$Message.error('抱歉，获取好友出错了~');
          });
      },
      //添加朋友
      addFriend(){
        const that = this
        let url = '/user/'+that.currentUser.id+'/addFriend/'+that.searchResult.id
        that.$http.get(url).then(res => {
          if(res.status !== 200 || res.data.errorCode !== 2000){
            let msg = res.data.message ? res.data.message : '抱歉，添加好友出错了~'
            that.$Message.error(msg)
          }else{
            that.getFriends()
            that.$Message.success(res.data.message)
          }
        })
          .catch(function (e) {
            console.log(e)
            that.$Message.error('抱歉，添加好友出错了~')
          });
      },
      getMsgList(){
        let msgList = this.$store.getters.getMsgList(1)
        let List = []
        console.log(msgList)
        for(let i in msgList){
          List.push({
            user: this.$store.getters.getContactByID(Number(msgList[i].user),msgList[i].group),
            group: msgList[i].group,
            message: msgList[i].lastest_message
          })
        }

        this.messagesList = List
      },

      displaySesiion: function (userID,isGroup = false) {
        if(this.hasContactDetail){
          this.hasContactDetail = !this.hasContactDetail
        }
        this.getMessage(userID,isGroup)
        this.scrollToEnd()
        this.hasChat = true
      },
      displayContactDetail(usrID,isGroup = false){
        if(this.hasChat){
          this.hasChat = !this.hasChat
        }
        this.contactDetail = this.$store.getters.getContactByID(Number(usrID),isGroup)
        if(isGroup){
          this.contactDetail.group = true
        }else{
          this.contactDetail.group = false
        }
        this.hasContactDetail = true
      },
      getMessage(userID,isGroup = false){
        this.currentSession = {
          user: this.$store.getters.getContactByID(userID,isGroup),
          messages: this.$store.getters.getMsgById(userID,this.currentUser.id,isGroup)
        }
      },
      scrollToEnd(){
        setTimeout(() => {
          const container = this.$el.querySelector("#message-container");
          container.scrollTop = container.scrollHeight;
        }, 50);
      },
      /**
       * @return {string}
       */
      DateFormat(timestamp){
        return dayjs(Number(timestamp)).format('HH:mm')
      },
      sendMessage(){
        let msg = {
          sender: this.currentUser,
          receiver: this.currentSession.user,
          timeout: Date.now(),
          text: this.new_message
        }
        let isGroup = false
        if(this.currentSession.user.group){
          isGroup = true
          msg.room = this.currentSession.user.id
        }
        this.emit('send message', {
          message: msg,
        });
        this.$store.commit('addMessage',msg);
        this.getMessage(this.currentSession.user.id,isGroup)
        this.getMsgList()
        this.new_message = ''
        this.scrollToEnd()
      },
      search(){
        const that = this
        if(that.searchKey !== ''){
          let url = 'user/search/'+that.searchKey
          that.$http.get(url).then(res => {
            if(res.status !== 200 || res.data.errorCode !== 2000){
              let msg = res.data.message ? res.data.message : '抱歉，搜索出错了~'
              that.$Message.error(msg)
            }else{
              that.searchResult = res.data.contacts
              that.showSearchResult = true
            }
          })
            .catch(function (e) {
              console.log(e)
              that.$Message.error('抱歉，搜索出错了~')
            });
        }
      },
      logout(){
        this.$store.commit('logout')
        this.$router.push('/login')
        this.socket.disconnect()
      },
      on(eventName, callback) {
        this.socket.on(eventName, (...arg) => {
          callback.apply(this.socket, arg)
        })
      },
      emit(eventName, data, callback) {
        this.socket.emit(eventName, data, (...arg) => {
          if (callback) {
            callback.apply(this.socket, arg)
          }
        })
      }
    }
  }
</script>

