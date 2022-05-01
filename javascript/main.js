let headerBox = document.querySelector(".header_box");
let headerBoxLeft = document.querySelectorAll(".header_box_left");
let menuIcon = document.querySelector(".menu_icon");
let a = 0;
menuIcon.onclick = ()=>{
    if(a == 0){
        headerBox.classList.add("active");
        a++;
        headerBoxLeft[1].style.display = "flex";
        headerBoxLeft[0].style.display = "flex";
        
    }
     else if(a = 1){
        console.log(a)
        headerBox.classList.remove("active");
        a--;
        headerBoxLeft[0].style.display = "none";
        headerBoxLeft[1].style.display = "none";
    }
}

