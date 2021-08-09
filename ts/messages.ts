export class Messages {
    constructor(){
        this.feedbackElement = document.getElementById("feedback")
    }

    private feedbackElement:HTMLElement;
    private timer
    public setFeedback(message:string){
        console.log(message)
        this.feedbackElement.innerHTML = message
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.feedbackElement.innerHTML = ""
        }, 5000)
    }
}