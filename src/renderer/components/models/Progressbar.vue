<template>
    <div class="progress-outer">
        <div class="progress" style="background:#292b2c;">
            <div class="progress-bar"
                 :class="type"
                 role="progressbar"
                 :aria-valuenow="now"
                 aria-valuemin="0"
                 :aria-valuemax="max"
                 :style="{ 
                    'width' : (precent < 100 ? precent : 100) + '%' ,
                    'height': height
                }"
            >
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'progressbar',
    props: {
        max: { 
            required: true,
            type: Number 
        },
        now: { 
            required: true,
            type: Number
        },
        height: {
            default: "15px"
        }
    },
    computed: {
        precent() {
            return (this.now * 100 / this.max)
        },
        type() {
            if(this.precent > 75){
                return "bg-success"
            } else if(this.precent > 50) {
                return "bg-minor-damaged"
            } else if(this.precent > 25){
                return "bg-moderate-damaged"
            } else {
                return "bg-heavily-damaged"
            }
        }
    }
}
</script>