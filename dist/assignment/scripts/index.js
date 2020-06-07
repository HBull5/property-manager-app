class UI {
    constructor() {
        this.menu = document.querySelector(".menu");
        this.menuBtn = document.querySelector(".menu-btn");
        this.closeBtn = document.querySelector(".close-btn");

        this.menuBtn.addEventListener("click", () => {
            this.menu.classList.remove("hide-menu");
        });

        this.closeBtn.addEventListener("click", () => {
            this.menu.classList.add("hide-menu");
        });
    }
}

const client = new UI();
