<template>
  <div id="app" style="height: 100vh;">
    <div style="height:80%; width:100%; background-color:white;">
      <MqttChatRoom />
    </div>
    <div style="height:2%; width:100%; background-color:white;"></div>
  </div>
</template>

<script>
//import LowerMarginChatBoxVue from './components/LowerMarginChatBox.vue';
import MqttChatRoom from './components/MqttChatRoom.vue';

export default {
  name: 'App',
  components: {
    MqttChatRoom
  },
};
</script>

