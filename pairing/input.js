var team_num = 0;
var pair_num = 0;
var match_num = 0;

var combi;   //全ペア数（nC2）
var min_pair_eachMatch;   //1試合あたりの最小ペア数

var team_numInput = document.getElementById("team_num");
var pair_numInput = document.getElementById("pair_num");
var match_numInput = document.getElementById("match_num");

var btn = document.getElementById("button");

team_numInput.onchange = function(){   //チーム人数が選択されたら
    team_num = Number(team_numInput.value);
    combi = team_num * (team_num - 1) / 2;
    min_pair_eachMatch = Math.ceil(team_num / 2);
    redisp_pair();
    redisp_match();
};

pair_numInput.onchange = function(){   //ペア数が選択されたら
    pair_num = Number(pair_numInput.value);
    redisp_match();
};

match_numInput.onchange = function(){   //試合数が選択されたら
    match_num = Number(match_numInput.value);
    redisp_pair();
};

function redisp_pair() {
    for(var i = pair_numInput.length - 1; i >= 1; i--) pair_numInput.remove(i);
    var max;
    if(match_num == 0) max = combi;
    else max = Math.floor(combi / match_num);
    for(var i = min_pair_eachMatch; i <= combi; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        pair_numInput.appendChild(option);
    }
    pair_numInput.disabled = false;
}

function redisp_match() {
    for(var i = match_numInput.length - 1; i >= 1; i--) match_numInput.remove(i);
    var max;
    if(pair_num == 0) max = Math.floor(combi / min_pair_eachMatch);
    else max = Math.floor(combi / pair_num);
    for(var i = 1; i <= max; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        match_numInput.appendChild(option);
    }
    match_numInput.disabled = false;
}