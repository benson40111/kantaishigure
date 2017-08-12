<template>
    <div>
        <span class="external-return-time" v-show="active">
            {{ $t('Done')}}: {{ (new Date(endtime)).toString().substr(16,8)}}
        </span>
        <span :style="color" v-if="endtime != 0" @mouseover="active = true" @mouseout="active=false">
            {{ hours | non_negtive | two_digits }}:{{ minutes | non_negtive | two_digits }}:{{ seconds | non_negtive | two_digits }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'timer',
    props: [ 'endtime' ],
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            active: false
        }
    },
    mounted: function() {
        window.setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000)
            },1000)
    },
    filters: {
        two_digits: function (value) {
            if(value.toString().length < 2){
                return "0"+value.toString();
            }
            return value.toString();
        },
        non_negtive: function (value) {
            if(value < 0){
                return 0;
            }
            return value;
        }
    },
    computed: {
        normalizedDate: function() {
            return Math.trunc(Number(this.endtime) / 1000)
        },
        seconds() {
        return (this.normalizedDate - this.now) % 60
        },
        minutes() {
        return Math.trunc((this.normalizedDate - this.now) / 60) % 60
        },
        hours() {
        return Math.trunc((this.normalizedDate - this.now) / 60 / 60)
        },
        color() {
            if((this.hours == 0 && this.minutes > 0 && this.minutes < 10) || (this.hours == 0 && this.minutes == 0 && this.seconds > 0)){
                return "color:#ff5286"
            }
            return "color:aqua"
        }
    }
}
</script>

<style>
    .external-return-time{
	    border: 2px solid #3d3d3d;
	    border-radius: 5px;
	    margin: 10px;
	    font-size: 16px;
        background: #3d3d3d;
    }
</style>
