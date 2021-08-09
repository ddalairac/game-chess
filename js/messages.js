export class Messages {
    constructor() {
        this.feedbackElement = document.getElementById("feedback");
    }
    setFeedback(message) {
        console.log(message);
        this.feedbackElement.innerHTML = message;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.feedbackElement.innerHTML = "";
        }, 5000);
    }
}
//# sourceMappingURL=messages.js.map