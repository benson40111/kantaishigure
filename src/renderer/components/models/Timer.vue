<template>
    <div>
        <span :style="color" v-if="normalizedDate" v-tooltip.left="$t('Done') + ':' + (new Date(endtime)).toString().substr(16,8)">
            {{ hours | non_negtive | two_digits }}:{{ minutes | non_negtive | two_digits }}:{{ seconds | non_negtive | two_digits }}
        </span>
        <span style="color:aqua" v-else>
            00:00:00
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
            diff: 0,
            interval: null
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000)
        }, 1000)
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
        normalizedDate() {
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
    },
    watch: {
        now(value){
            this.diff = this.normalizedDate - this.now;
            if(this.diff <= 0){
                this.diff = 0;
                clearInterval(this.interval);
            }
        }
    }
}
</script>
