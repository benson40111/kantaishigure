<template>
    <span v-if="endtime != 0">
        {{ hours | non_negtive | two_digits }}:{{ minutes | non_negtive | two_digits }}:{{ seconds | non_negtive | two_digits }}
    </span>
</template>

<script>
export default {
    name: 'timer',
    props: [ 'endtime' ],
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000)
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
        }
    }
}
</script>