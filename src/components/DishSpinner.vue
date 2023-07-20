<template>
    <div class="spinner-container">
        <div class="controls">
            <span class="controls-span">
            <button class="btn">{{ left_btn_text }} </button>
            <button class="btn">{{ right_btn_text }} </button>
            </span>
        </div>
        <div class="pos">{{ pos1 }}</div>
        <span>
        <div class="pos">{{ pos2 }}</div>
        <div class="pos">{{ pos3 }}</div>
        </span>
        <div class="pos">{{ pos4 }}</div>
    </div>
</template>

<style>
.spinner {
    border-style: solid;
    border-color: black;
    width: 100%;
    height: 100%;
    margin-bottom: 2%;
    margin-top: 2%;
}
.controls {
    /* border-style: solid; */
    /* border-color: black; */
    width: 100%;
    height: 20%;
}
.btn {
    border-style: solid;
    border-color: black;
    width: 20%;
    height: 20%;
    padding: 2%;
    margin-bottom: 2%;
    margin-top: 2%;
}
.pos {
    border-style: solid;
    border-color: black;
    width: 20%;
    height: 20%;
    padding: 2%;
    margin-bottom: 2%;
    margin-top: 2%;
}
</style>

<script>
export default {
    props: {},
    data() {return {}},
    created(){}
}
</script>
