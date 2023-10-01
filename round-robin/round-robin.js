function makeCombination() {
    let isOdd = teamNum % 2;
    let matchNum = teamNum + isOdd - 1;
    let pairNum = Math.floor((teamNum + 1) / 2);

    let ans = new Array(matchNum);
    for(var i = 0; i < matchNum; i++) {
        ans[i] = new Array(pairNum);
        for(var j = 0; j < pairNum; j++) {
            ans[i][j] = new Array(2).fill(-1);
        }
    }

    tmp_teamNum = teamNum + isOdd;
    let isPaired = new Array(tmp_teamNum + isOdd);
    for(var i = 0; i < tmp_teamNum; i++) {
        isPaired[i] = new Array(tmp_teamNum).fill(0);
    }

    // x試合目、yペア目
    for(var x = 0; x < matchNum; x++) {
        var isSelected = new Array(tmp_teamNum).fill(0);
        var pairing = function(y) {
            if(y == pairNum) return true;
            var left = -1;
            var right;
            for(var i = 0; i < tmp_teamNum; i++) {
                if(isSelected[i] == 0) {
                    if(left < 0) {
                        left = i;
                        isSelected[left] = 1;
                    } else {
                        if(isPaired[left][i] == 0) {
                            right = i;
                            isSelected[right] = 1;
                            isPaired[left][right] = 1;
                            if(pairing(y + 1)) {
                                ans[x][y][0] = left;
                                ans[x][y][1] = right;
                                return true;
                            } else {
                                isSelected[right] = 0;
                                isPaired[left][right] = 0;
                            }
                        }
                    }
                }
            }
            isSelected[left] = 0;
            return false;
        }
        if(!pairing(0)) {
            alert("Error");
        }
    }

    for(var i = 0; i < matchNum; i++) {
        let flag = 0;
        let rest = 0;
        for(var j = 0; j < pairNum; j++) {
            ans[i][j][0]++;
            ans[i][j][1]++;
            if(isOdd) {
                if(flag) {
                    ans[i][j-1][0] = ans[i][j][0];
                    ans[i][j-1][1] = ans[i][j][1];
                } else if(ans[i][j][1] == tmp_teamNum) {
                    rest = ans[i][j][0];
                    flag = 1;
                }
                if(j == pairNum - 1) {
                    ans[i][j][0] = rest;
                    ans[i][j][1] = -1;
                }
            }
        }
    }

    var answerList = [];
    for(var i = 0; i < matchNum; i++) {
        answerList.push('<div class="item"><div class="box-title">ゲーム' + (i+1) + '</div><p>');
        for (var j = 0; j < pairNum; j++){
            if(ans[i][j][1] == -1) {
                answerList.push(ans[i][j][0] + ' : 休み<br>');
            } else {
                answerList.push(ans[i][j][0] + ' - ' + ans[i][j][1] + '<br>');
            }
        }
        answerList.push('</p></div>');
    }
    document.getElementById('output').innerHTML = answerList.join('');
}