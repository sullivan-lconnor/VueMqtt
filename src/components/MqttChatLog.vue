<template>
  <div class="chatBox" :style="{height: height_, width: width_}">
    <div v-for="(message, index) in messages" :key="index" class="chatMessage">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
.chatBox {
  border-style: solid;
  border-color: black;
  overflow: auto;
  width: 100%;
  margin-bottom: 20px;
}
.chatMessage {
  margin-bottom: 20px;
}
</style>

<script>
import { Client } from 'paho-mqtt'
import { useMqttBrokerStore } from '../store/mqttBrokerStore' // adjust path as needed

export default {
  props: {
    height_:{type:String, default: '100%'},
    width_:{type:String, default: '100%'},
    topic_:{type:String, required: true}
  },
  data() {
    return {
      messages: [],
      maxMessages: 10
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
      const newMessage = this.topic_+": "+message.payloadString;
      this.messages.push(newMessage);
      
      // Emit the most recent message to the parent
      this.$emit('message-received', newMessage);
    }

    client.connect({
      onSuccess: () => client.subscribe(this.topic_),
      userName: brokerInfo.user,
      password: brokerInfo.pswd
    })
  }
}
</script>
