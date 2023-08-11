<template>
  <div class="chatBox" :style="{height: chatBoxSize, width: '100%'}">
    <div class="topicLabel">{{ topic_ }}</div>
    <div class="messages" @click="toggleSize">
      <div v-for="(message, index) in messages" :key="index" class="chatMessage">
        {{ message }}
      </div>
    </div>
    <form @submit.prevent="submitMessage" class="inputSection">
      <input v-model="inputText" type="text" placeholder="Type your message here...">
      <button type="submit">
        <img src="@/assets/submit.png" alt="submit" />
      </button>
    </form>
  </div>
</template>

<style scoped>
.chatBox {
  border-style: solid;
  border-color: black;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
}
.messages {
  height: calc(100% - 2.5em - 40px); /* subtracting topic label and input section height */
  overflow: auto;
}
.chatMessage {
  margin-bottom: 5px;
}
.topicLabel {
  font-weight: bold;
  background-color: #eee;
  height: 2.5em;
}
.inputSection {
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.inputSection input {
  flex-grow: 1;
  margin-right: 10px;
}
.inputSection button {
  width: 40px;
  height: 40px;
}
.inputSection button img {
  max-width: 100%;
  height: auto;
}
</style>

<script>
/* eslint-disable */
import { Client, Message } from 'paho-mqtt'
import { useMqttBrokerStore } from '../store/mqttBrokerStore' // adjust path as needed

export default {
  props: {
    topic_:{type:String, required: true}
  },
  data() {
    const brokerInfo = useMqttBrokerStore()
    return {
      messages: [],
      maxMessages: 100,
      chatBoxSize: '500px',
      inputText: '',
      brokerInfo,
      client: new Client(brokerInfo.ip, brokerInfo.port, `mqtt_client_${new Date().getTime()}`)
    }
  },
  created() {
    this.setupClient()
  },
  methods: {
    toggleSize() {
      this.chatBoxSize = this.chatBoxSize === '500px' ? '7em' : '500px'
    },
    setupClient() {
      this.client.onConnectionLost = responseObject => {
        if (responseObject.errorCode !== 0) {
          console.log('Connection lost: ' + responseObject.errorMessage)
        }
      }

      this.client.onMessageArrived = message => {
        if (this.messages.length >= this.maxMessages) {
          this.messages.shift()
        }

        const date = new Date()
        const formattedDate = date.toLocaleString()
        const newMessage = message.payloadString
        this.messages.unshift(formattedDate+': '+newMessage)

        this.$emit('message-received', newMessage)
      }

      this.client.connect({
        onSuccess: () => this.client.subscribe(this.topic_),
        userName: this.brokerInfo.user,
        password: this.brokerInfo.pswd
      })
    },
    submitMessage() {
      if (this.inputText) {
        const message = new Message(this.inputText)
        message.destinationName = this.topic_
        this.client.send(message)
        this.inputText = ''
      }
    }
  }
}
</script>
