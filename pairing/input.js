let memberNum = 0;
let pairNum = 0;
let matchNum = 0;

let total_combi;   //全ペア数（nC2）
let min_pair;   //1試合あたりの最小ペア数
let max_pair;
let max_match;

let Input_memberNum = document.getElementById("memberNum");
let Input_pairNum = document.getElementById("pairNum");
let Input_matchNum = document.getElementById("matchNum");

//チーム人数が選択されたら
Input_memberNum.onchange = function(){
    memberNum = Number(Input_memberNum.value);
    total_combi = memberNum * (memberNum - 1) / 2;
    min_pair = Math.ceil(memberNum / 2);
    update_pair();
    update_match();
    Input_memberNum.disabled = true;
    Input_pairNum.disabled = false;
    Input_matchNum.disabled = false;
};

//ペア数が選択されたら
Input_pairNum.onchange = function(){
    pairNum = Number(Input_pairNum.value);
    if(matchNum == 0) update_match();
    Input_pairNum.disabled = true;
};

//試合数が選択されたら
Input_matchNum.onchange = function(){
    matchNum = Number(Input_matchNum.value);
    if(pairNum == 0) update_pair();
    Input_matchNum.disabled = true;
};

//ペア数プルダウンの更新
function update_pair() {
    for(var i = Input_pairNum.length - 1; i >= 1; i--) Input_pairNum.remove(i);
    if(matchNum == 0) max_pair = total_combi;
    else max_pair = Math.floor(total_combi / matchNum);
    for(var i = min_pair; i <= max_pair; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        Input_pairNum.appendChild(option);
    }
}

//試合数プルダウンの更新
function update_match() {
    for(var i = Input_matchNum.length - 1; i >= 1; i--) Input_matchNum.remove(i);
    if(pairNum == 0) max_match = Math.floor(total_combi / min_pair);
    else max_match = Math.floor(total_combi / pairNum);
    for(var i = 1; i <= max_match; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        Input_matchNum.appendChild(option);
    }
}