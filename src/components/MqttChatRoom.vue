<template>
    <div class="chatRoom">
      <div class="inputContainer">
        <input v-model="newTopic" placeholder="Enter MQTT topic" @keyup.enter="addChatLog">
        <button @click="addChatLog">Subscribe</button>
      </div>
      <div class="chatBox" v-for="(topic, index) in topics" :key="index">
        <MqttChatLog
          :topic_="topic"
          @message-received="handleMessageReceived"
        />
        <button class="closeButton" @click.stop="removeChatLog(index)">X</button>
      </div>
    </div>
</template>

<style scoped>
.chatBox {
  width: 100%;
  height: 10%;
  position: relative;
}
.closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
}
.inputContainer {
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
}
.inputContainer input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
}
.inputContainer button {
  padding: 10px;
}
.chatRoom {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import MqttChatLog from './MqttChatLog.vue'

export default {
  components: {
    MqttChatLog
  },
  data() {
    return {
      newTopic: '',
      topics: []
    }
  },
  methods: {
    addChatLog() {
      if (this.newTopic) {
        this.topics.push(this.newTopic)
        this.newTopic = ''
      }
    },
    removeChatLog(index) {
      this.topics.splice(index, 1)
    },
    handleMessageReceived(message) {
      console.log('Message received in chat room: ', message)
    }
  }
}
</script>
