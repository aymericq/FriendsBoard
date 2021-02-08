let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        stroke_thickness: 3,
        strokeColor: "#FF0000"
    },
    methods: {
        increaseStrokeThickness: function (event) {
            this.stroke_thickness += 1;
        },
        decreaseStrokeThickness: function (event) {
            this.stroke_thickness = this.stroke_thickness <= 1 ? this.stroke_thickness : this.stroke_thickness - 1;
        },
        sendPath(path) {
            console.log(path);
        }
    }
})