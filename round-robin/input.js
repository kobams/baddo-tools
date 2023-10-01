let teamNum = 0;
let Input_teamNum = document.getElementById("teamNum");

//チーム人数が選択されたら
Input_teamNum.onchange = function(){
    teamNum = Number(Input_teamNum.value);
};