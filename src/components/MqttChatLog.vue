<template>
  <div class="chatBox" @click="toggleSize" :style="{height: chatBoxSize, width: '100%'}">
    <div class="topicLabel">{{ topic_ }}</div>
    <div v-for="(message, index) in messages" :key="index" class="chatMessage">
      {{ message }}
    </div>
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
.chatMessage {
  margin-bottom: 20px;
}
.topicLabel {
  font-weight: bold;
  background-color: #eee;
}
</style>

<script>
import { Client } from 'paho-mqtt'
import { useMqttBrokerStore } from '../store/mqttBrokerStore' // adjust path as needed

export default {
  props: {
    topic_:{type:String, required: true}
  },
  data() {
    return {
      messages: [],
      maxMessages: 10,
      chatBoxSize: '3em'
    }
  },
  created() {
    const brokerInfo = useMqttBrokerStore()
    const clientId = 'mqtt_client_' + new Date().getTime();
    const client = new Client(brokerInfo.ip, brokerInfo.port, clientId);

    client.onConnectionLost = responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log('Connection lost: ' + responseObject.errorMessage)
      }
    }

    client.onMessageArrived = message => {
      // Remove the oldest message when reaching the max messages limit
      if (this.messages.length >= this.maxMessages) {
        this.messages.shift()
      }

      // Append the new message
      const newMessage = message.payloadString;
      this.messages.push(newMessage);
      
      // Emit the most recent message to the parent
      this.$emit('message-received', newMessage);
    }

    client.connect({
      onSuccess: () => client.subscribe(this.topic_),
      userName: brokerInfo.user,
      password: brokerInfo.pswd
    })
  },
  methods: {
    toggleSize() {
      this.chatBoxSize = this.chatBoxSize === '3em' ? '500px' : '3em';
    }
  }
}
</script>
