<template>
  <div id="app" style="height: 100vh;">
    <div style="height:80%; width:100%; background-color:white;">
      <DishSpinner style="height:100%; width:100%;"/>
    </div>
    <MqttChatLog 
     height_="18%" 
     topic_="test/topic1"
     @message-received="handleMessage"
    />
    <div style="height:2%; width:100%; background-color:white;"></div>
  </div>
</template>

<script>
//import LowerMarginChatBoxVue from './components/LowerMarginChatBox.vue';
import MqttChatLog from './components/MqttChatLog.vue';
import DishSpinner from './components/DishSpinner.vue';
export default {
  name: 'App',
  components: {
    //LowerMarginChatBoxVue,
    MqttChatLog,
    DishSpinner,
  },
};
</script>

