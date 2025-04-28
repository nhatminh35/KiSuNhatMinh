// Khởi tạo các thông số
let btn1 = document.querySelector('#btn1'); // Bật quạt
let btn2 = document.querySelector('#btn2'); // Tắt quạt
let btn3 = document.querySelector('#btn3'); // Bật đèn
let btn4 = document.querySelector('#btn4'); // Tắt đèn
let btn5 = document.querySelector('#btn5'); // Bật đèn
let btn6 = document.querySelector('#btn6'); // Tắt đèn
let btn7 = document.querySelector('#btn7'); // Bật đèn
let btn8 = document.querySelector('#btn8'); // Tắt đèn
let btn9 = document.querySelector('#btn9'); // Tắt đèn
let btn10 = document.querySelector('#btn10'); // Tắt đèn
let btn11 = document.querySelector('#CLEAR_STORAGE'); // Tắt đèn
let state1 = localStorage.getItem("state1") ? parseInt(localStorage.getItem("state1")) : 0;
let state2 = localStorage.getItem("state2") ? parseInt(localStorage.getItem("state2")) : 0;
let state3 = localStorage.getItem("state3") ? parseInt(localStorage.getItem("state3")) : 0;
let state4 = localStorage.getItem("state4") ? parseInt(localStorage.getItem("state4")) : 0;
let state5 = localStorage.getItem("state5") ? parseInt(localStorage.getItem("state5")) : 0;
let device1Img = document.querySelector('#device1'); // Ảnh quạt  /* là cái id cho biết thông tin ảnh
let device2Img = document.querySelector('#device2'); // Ảnh đèn
let device3Img = document.querySelector('#device3'); // Ảnh đèn
let device4Img = document.querySelector('#device4'); // Ảnh đèn

// Functions nút bấm
btn1.addEventListener('click', () => {
    state1 = 1;
    localStorage.setItem("state1", state1); // Lưu vào LocalStorage
    UpdateImage1();  
    firebase.database().ref("thietbi1").set({device1: 1});
    

});

btn2.addEventListener('click', () => {
    state1 = 0;
    localStorage.setItem("state1", state1); // Lưu vào LocalStorage
    firebase.database().ref("thietbi1").set({device1: 0})
    UpdateImage1();
});


btn3.addEventListener('click', () => {
    
    state2 = 1;
    localStorage.setItem("state2", state2); // Lưu vào LocalStorage
    firebase.database().ref("thietbi2").set({device2: 1})
    UpdateImage2();

});

btn4.addEventListener('click', () => {
    
    firebase.database().ref("thietbi2").set({device2: 0})
    state2 = 0;
    localStorage.setItem("state2", state2); // Lưu vào LocalStorage
    UpdateImage2();

});
btn5.addEventListener('click', () => {
   
    firebase.database().ref("thietbi3").set({device3: 1})
    state3 = 1;
    localStorage.setItem("state3", state3); // Lưu vào LocalStorage
    UpdateImage3();
});

btn6.addEventListener('click', () => {
    
    firebase.database().ref("thietbi3").set({device3: 0})
    state3 = 0;
    localStorage.setItem("state3", state3); // Lưu vào LocalStorage
    UpdateImage3();
});
btn7.addEventListener('click', () => {
   
    firebase.database().ref("thietbi4").set({device4: 1})
    state4 = 1;
    localStorage.setItem("state4", state4); // Lưu vào LocalStorage
    UpdateImage4();
});

btn8.addEventListener('click', () => {
   
    firebase.database().ref("thietbi4").set({device4: 0})
    state4 = 0;
    localStorage.setItem("state4", state4); // Lưu vào LocalStorage
    UpdateImage4();
});
btn9.addEventListener('click', () => {
    state5 = 1;
    firebase.database().ref("thietbi1").set({device1: 1})
    firebase.database().ref("thietbi2").set({device2: 1})
    firebase.database().ref("thietbi3").set({device3: 1})
    firebase.database().ref("thietbi4").set({device4: 1})
    localStorage.setItem("state5", state5); // Lưu vào LocalStorage
    UpdateALL();
});

btn10.addEventListener('click', () => {
    state5 = 0;
    firebase.database().ref("thietbi1").set({device1: 0})
    firebase.database().ref("thietbi2").set({device2: 0})
    firebase.database().ref("thietbi3").set({device3: 0})
    firebase.database().ref("thietbi4").set({device4: 0})
    localStorage.setItem("state5", state5); // Lưu vào LocalStorage
    UpdateALL();
});

btn11.addEventListener('click', () => {
    localStorage.removeItem("dataList"); 
    dataList = []; 

    let tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; 
});   

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, checking elements...");

    let fanImage = document.getElementById("fanImage");
    let speakerImage = document.getElementById("speakerImage");

    if (!fanImage || !speakerImage) {
        console.error("Không tìm thấy phần tử fanImage hoặc speakerImage");
    }
});



// Chờ DOM tải xong trước khi thực hiện hành động
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, checking elements...");

    let fanImage = document.getElementById("fanImage");
    let speakerImage = document.getElementById("speakerImage");

    if (!fanImage || !speakerImage) {
        console.error("Không tìm thấy fanImage hoặc speakerImage");
    }

    // Gán sự kiện cho các nút bật/tắt
    document.getElementById("device20").addEventListener("click", turnOnFan);
    document.getElementById("device21").addEventListener("click", turnOffFan);
    document.getElementById("device22").addEventListener("click", turnOnSpeaker);
    document.getElementById("device23").addEventListener("click", turnOffSpeaker);
});

// Hàm bật/tắt quạt
function turnOnFan() {
    let fan = document.getElementById("fanImage");
    if (fan) {
        fan.src = "img/fanon1.png";
        console.log("Fan turned ON");
        firebase.database().ref("thietbi5").set({device1: 1});
        localStorage.setItem("fanState", "on"); // Lưu vào localStorage
    } else {
        console.error("Không tìm thấy fanImage");
    }
}

function turnOffFan() {
    let fan = document.getElementById("fanImage");
    if (fan) {
        fan.src = "img/fanoff1.png";
        console.log("Fan turned OFF");
        firebase.database().ref("thietbi5").set({device1: 0});
        localStorage.setItem("fanState", "off"); // Lưu vào localStorage
    } else {
        console.error("Không tìm thấy fanImage");
    }
}

// Hàm bật/tắt loa
function turnOnSpeaker() {
    let speaker = document.getElementById("speakerImage");
    if (speaker) {
        speaker.src = "img/chuong_on.png";
        console.log("Speaker turned ON");
        firebase.database().ref("thietbi6").set({device1: 1});
        localStorage.setItem("speakerState", "on"); // Lưu vào localStorage
    } else {
        console.error("Không tìm thấy speakerImage");
    }
}

function turnOffSpeaker() {
    let speaker = document.getElementById("speakerImage");
    if (speaker) {
        speaker.src = "img/chuong_off.png";
        console.log("Speaker turned OFF");
        firebase.database().ref("thietbi6").set({device1: 0});
        localStorage.setItem("speakerState", "off"); // Lưu vào localStorage
    } else {
        console.error("Không tìm thấy speakerImage");
    }
}

function UpdateImage1(){
    if (state1 === 1) {
        device1.src = "img/fan_running.png";
    } else {
        device1.src = "img/fan_off.png";
    }

}
function UpdateImage2(){
    if (state2 === 1) {
        device2.src = "img/fan_running.png";
    } else {
        device2.src = "img/fan_off.png";
    }

}


function UpdateImage3(){
    if (state3 === 1) {
        device3.src = 'img/lamp_on.png'; // Đổi ảnh đèn bật
    } else {
        device3.src = 'img/lamp_off.png'; // Đổi ảnh đèn tắt
    }

}
function UpdateImage4(){
    if (state4 === 1) {
        device4.src = 'img/lamp_on.png'; // Đổi ảnh đèn bật
    } else {
        device4.src = 'img/lamp_off.png'; // Đổi ảnh đèn tắt
    }

}
function UpdateALL(){
    if (state5 == 1) {
        state1 = 1;
        state2 = 1;
        state3 = 1;
        state4 = 1;
     
    } else if(state5 == 0) {
        state1 = 0;
        state2 = 0;
        state3 = 0;
        state4 = 0;
       
    }
    state5 = 3;
    localStorage.setItem("state5", state5); // Lưu vào LocalStorage

    localStorage.setItem("state1", state1); // Lưu vào LocalStorage
    localStorage.setItem("state2", state2); // Lưu vào LocalStorage
    localStorage.setItem("state3", state3); // Lưu vào LocalStorage
    localStorage.setItem("state4", state4); // Lưu vào LocalStorage
    UpdateImage1();
    UpdateImage2();
    UpdateImage3();
    UpdateImage4();

}