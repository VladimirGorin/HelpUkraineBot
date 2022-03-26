let popup1 = document.querySelector('.popup-command')
let popup2 = document.querySelector('.popup-sendMessage')

document.getElementById('button1').onclick = function(){
    popup1.style.display = 'block'
}
document.getElementById('button2').onclick = function(){
    popup2.style.display = 'block'
}

document.getElementById('imgX1').onclick = function(){
    popup1.style.display = 'none'
}

document.getElementById('imgX2').onclick = function(){
    popup2.style.display = 'none'
}