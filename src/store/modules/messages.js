// initial state

const state = {
  friends : {
    2: [
      {
        sender: {
          avatar:"https://secure.gravatar.com/avatar/461fe7f7ab23b18e209c027e72c5c00a?s=48&d=mm&r=g",
          created_at:"2018-05-23T08:00:00.000Z",
          description:null,
          email:"zhangxiaofan@qq.com",
          id:2,
          nickname:"张小凡",
          updated_at:"2018-05-24T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '这是一条新消息',
        timeout: '1526622731584'
      },
      {
        sender: {
          avatar:"https://secure.gravatar.com/avatar/461fe7f7ab23b18e209c027e72c5c00a?s=48&d=mm&r=g",
          created_at:"2018-05-23T08:00:00.000Z",
          description:null,
          email:"zhangxiaofan@qq.com",
          id:2,
          nickname:"张小凡",
          updated_at:"2018-05-24T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '碧瑶还没死，我想我找到复活她的希望了',
        timeout: '1526622731588'
      },
      {
        sender: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://secure.gravatar.com/avatar/461fe7f7ab23b18e209c027e72c5c00a?s=48&d=mm&r=g",
          created_at:"2018-05-23T08:00:00.000Z",
          description:null,
          email:"zhangxiaofan@qq.com",
          id:2,
          nickname:"张小凡",
          updated_at:"2018-05-24T08:00:00.000Z"
        },
        timeout: '1526622731589',
        text: '你好!'
      },
      {
        sender: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://secure.gravatar.com/avatar/461fe7f7ab23b18e209c027e72c5c00a?s=48&d=mm&r=g",
          created_at:"2018-05-23T08:00:00.000Z",
          description:null,
          email:"zhangxiaofan@qq.com",
          id:2,
          nickname:"张小凡",
          updated_at:"2018-05-24T08:00:00.000Z"
        },
        timeout: "1526622731596",
        text: '这是大段文字测试，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。\n'
      }
    ],
    3: [
      {
        sender: {
          avatar:"https://i.loli.net/2017/08/21/599a521472424.jpg",
          created_at:"2018-05-29T08:00:00.000Z",
          description:null,
          email:"biyao@gmail.com",
          id:3,
          nickname:"碧瑶",
          updated_at:"2018-05-30T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '小凡，你还记得我说过的吗？',
        timeout: '1526622731687'
      },
      {
        sender: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://i.loli.net/2017/08/21/599a521472424.jpg",
          created_at:"2018-05-29T08:00:00.000Z",
          description:null,
          email:"biyao@gmail.com",
          id:3,
          nickname:"碧瑶",
          updated_at:"2018-05-30T08:00:00.000Z"
        },
        text: '文字测试',
        timeout: '1526622731456'
      }
    ],
    4: [
      {
        sender: {
          avatar:"https://i.loli.net/2017/08/21/599a521472424.jpg",
          created_at:"2018-05-29T08:00:00.000Z",
          description:null,
          email:"biyao@gmail.com",
          id:4,
          nickname:"碧瑶",
          remark: "金瓶儿",
          updated_at:"2018-05-30T08:00:00.000Z"
        },
        receiver: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '朋友备注显示测试',
        timeout: '1526622731423'
      }
    ]
  },
  groups: {
    1 : [
      {
        sender: {
          avatar:"https://c.disquscdn.com/uploads/users/21451/3567/avatar92.jpg?1478924910",
          created_at:"2018-05-29T08:00:00.000Z",
          description:null,
          email:"biyao@gmail.com",
          id:4,
          nickname:"小鸟游",
          updated_at:"2018-05-30T08:00:00.000Z"
        },
        receiver: {
          avatar:"http://img.xclient.info/attachment/2016/01/49016c69-c7f5-c532-62c0-6f886fac75d2.png",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          id:1,
          remark:'饭团儿',
          nickname:"[找饭]交流群",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '群聊消息测试',
        timeout: '1526876961004'
      },
      {
        sender: {
          avatar:"https://i.loli.net/2017/08/21/599a521472424.jpg",
          created_at:"2018-05-29T08:00:00.000Z",
          description:null,
          email:"biyao@gmail.com",
          id:4,
          nickname:"碧瑶",
          remark: "金瓶儿",
          updated_at:"2018-05-30T08:00:00.000Z"
        },
        receiver: {
          avatar:"http://img.xclient.info/attachment/2016/01/49016c69-c7f5-c532-62c0-6f886fac75d2.png",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          id:1,
          remark:'饭团儿',
          nickname:"[找饭]交流群",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '朋友备注显示测试',
        timeout: '1526622731423'
      },
      {
        sender: {
          avatar:"https://secure.gravatar.com/avatar/461fe7f7ab23b18e209c027e72c5c00a?s=48&d=mm&r=g",
          created_at:"2018-05-23T08:00:00.000Z",
          description:null,
          email:"zhangxiaofan@qq.com",
          id:2,
          nickname:"张小凡",
          updated_at:"2018-05-24T08:00:00.000Z"
        },
        receiver: {
          avatar:"http://img.xclient.info/attachment/2016/01/49016c69-c7f5-c532-62c0-6f886fac75d2.png",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          id:1,
          remark:'饭团儿',
          nickname:"[找饭]交流群",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '碧瑶还没死，我想我找到复活她的希望了',
        timeout: '1526622731588'
      },
      {
        sender: {
          avatar:"https://1.gravatar.com/avatar/7351c592f22dd8bd60927a460673048f?s=400&d=mm",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          email:"1679207605@qq.com",
          id:1,
          nickname:"小蘑菇糖糖",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        receiver: {
          avatar:"http://img.xclient.info/attachment/2016/01/49016c69-c7f5-c532-62c0-6f886fac75d2.png",
          created_at:"2018-05-16T08:00:00.000Z",
          description:"",
          id:1,
          remark:'饭团儿',
          nickname:"[找饭]交流群",
          updated_at:"2018-05-16T08:00:00.000Z"
        },
        text: '大家好，我是小蘑菇糖糖~',
        timeout: '1526622731588'
      }
    ]
  }
}

// getters
const getters = {
  getMsgList: state => id => {
    let re = []
    for (let v in state.friends) {
      re.push({
        user: v,
        group: false,
        lastest_message: state.friends[v].slice(-1)[0]
      })
    }
    for (let v in state.groups) {
      re.push({
        user: v,
        group: true,
        lastest_message: state.groups[v].slice(-1)[0]
      })
    }

    return re.sort(function(a,b){return a.lastest_message.timeout < b.lastest_message.timeout})
  },
  getMsgById: state => (id,userid,isGroup = false) => {
    let re = []
    let messages = state.friends[id]
    if(isGroup){
      messages = state.groups[id]
    }
    for(let i in messages){
      if(messages[i].sender.id === userid){
        re.push({
          content: messages[i],
          status: 1
        })
      }else{
        re.push({
          content: messages[i],
          status: 0
        })
      }
    }
    return re
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  getMessage (state, n) {
    let receiver
    if(n.room){
       receiver = n.receiver.id
    }else{
      receiver = n.sender.id
    }
    let store
    if(n.room){
      store = state.groups
    }else{
      store = state.friends
    }
    if(store[receiver]){
      store[receiver].push(n)
    }else{
      store[receiver] =  [n]
    }
  },
  addMessage (state, n) {
    let sender = n.receiver.id
    let store
    if(n.room){
      store = state.groups
    }else{
      store = state.friends
    }
    if(store[sender]){
      store[sender].push(n)
    }else{
      store[sender] =  [n]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
