<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters(['name']),
    },
    methods: {
        setEgg() {
            function egg(arr, callback) {
                this.sequence = arr.join(',')
                this.length = arr.length
                this.pressed = []
                this.callback = callback
                this.init()
            }

            egg.prototype = {
                constructor: egg,
                init: function () {
                    document.addEventListener('keyup', this.handleKey.bind(this), false)
                },
                handleKey: function (e) {
                    this.pressed.push(e.keyCode)
                    this.check()
                },
                check: function () {
                    if (this.pressed.join(',') == this.sequence) {
                        this.callback()
                        this.pressed = []
                    } else if (this.pressed.length == this.length) {
                        this.pressed.shift()
                    }
                },
            }

            new egg([38, 38, 40, 40, 37, 39, 37, 39, 66, 65], function () {
                localStorage.egg = localStorage.egg == 'true' ? false : true
            })
        },
    },
    created() {
		this.setEgg()
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
