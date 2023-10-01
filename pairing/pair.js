function makePair() {
    let isOdd = memberNum % 2;   // 人数の偶奇
    let block_max = Math.floor(pairNum / ((memberNum + isOdd) / 2)) * matchNum;
    let addPair = pairNum - (block_max / matchNum) * ((memberNum + isOdd) / 2);

    let ans = new Array(matchNum);
    for(var i = 0; i < matchNum; i++) {
        ans[i] = new Array(pairNum);
        for(var j = 0; j < pairNum; j++) {
            ans[i][j] = new Array(2).fill(-1);
        }
    }

    let isPaired = new Array(memberNum);
    for(var i = 0; i < memberNum; i++) {
        isPaired[i] = new Array(memberNum).fill(0);
    }
    var isSelected = new Array(memberNum - 1);
    for(var i = 0; i < memberNum; i++) {
        isSelected[i] = new Array(memberNum).fill(0);
    }
    let isDuplicated_match = new Array(matchNum);
    for(var i = 0; i < matchNum; i++) {
        isDuplicated_match[i] = new Array(memberNum).fill(0);
    }
    let isDuplicated_member = new Array(memberNum).fill(0);;

    // x試合目、yペア目、zブロック目
    var pairing = function(x, y, z, flag) {
        if(x == matchNum) {
            if(y == pairNum) return true;
            else x = 0;
        }
        var left = -1;
        var right;
        for(var i = 0; i < memberNum; i++) {
            if(isSelected[z][i] == 1) continue;
            if(flag && isDuplicated_match[x][i]) continue;
            if(left < 0) {
                left = i;
                isSelected[z][left] = 1;
                if(flag) isDuplicated_match[x][left] = 1;
                if(!isSelected[z].some(element => element == 0)) {
                    for(var j = 0; j < memberNum; j++) {
                        if(i == j) continue;
                        if(isDuplicated_member[j] == 0 && isDuplicated_match[x][j] == 0) {
                            right = j;
                            if(left < right) isPaired[left][right] = 1;
                            else isPaired[right][left] = 1;
                            isDuplicated_match[x][right] = 1;
                            isDuplicated_member[right] = 1;
                            x_next = x;
                            y_next = y + 1;
                            z_next = z;
                            flag_next = flag;
                            if(flag) {
                                if(y_next == pairNum) {
                                    x_next += 1;
                                    if(x_next != matchNum) y_next -= addPair;
                                }
                                if(!isSelected[z].some(element => element == 0)) {
                                    z_next += 1;
                                }
                            } else {
                                x_next += 1;
                                z_next += 1;
                                if(x_next != matchNum) y_next -= ((memberNum + isOdd) / 2);
                                if(z_next == block_max) flag_next = 1;
                            }
                            if(pairing(x_next, y_next, z_next, flag_next)) {
                                ans[x][y][0] = left;
                                ans[x][y][1] = right;
                                return true;
                            } else {
                                if(left < right) isPaired[left][right] = 0;
                                else isPaired[right][left] = 0;
                                isDuplicated_match[x][j] = 0;
                                isDuplicated_member[j] = 0;
                            }
                        }
                    }
                }
            } else {
                if(isPaired[left][i] == 1) continue;
                right = i;
                isSelected[z][right] = 1;
                isPaired[left][right] = 1;
                x_next = x;
                y_next = y + 1;
                z_next = z;
                flag_next = flag;
                if(flag) {
                    isDuplicated_match[x][right] = 1;
                    if(y_next == pairNum) {
                        x_next += 1;
                        if(x_next != matchNum) y_next -= addPair;
                    }
                    if(!isSelected[z].some(element => element == 0)) {
                        z_next += 1;
                    }
                } else {
                    if(!isSelected[z].some(element => element == 0)) {
                        x_next += 1;
                        z_next += 1;
                        if(x_next != matchNum) y_next -= ((memberNum + isOdd) / 2);
                        if(z_next == block_max) flag_next = 1;
                    }
                }
                if(pairing(x_next, y_next, z_next, flag_next)) {
                    ans[x][y][0] = left;
                    ans[x][y][1] = right;
                    return true;
                } else {
                    isSelected[z][right] = 0;
                    isPaired[left][right] = 0;
                    if(flag) isDuplicated_match[x][right] = 0;
                }
            }     
        }
        isSelected[z][left] = 0;
        if(flag) isDuplicated_match[x][left] = 0;
        return false;
    }

    if(!pairing(0, 0, 0, 0)) {
        alert("Error");
    }

    for(var i = 0; i < matchNum; i++) {
        for(var j = 0; j < pairNum; j++) {
            ans[i][j][0]++;
            ans[i][j][1]++;
            if(ans[i][j][0] > ans[i][j][1]) {
                var tmp = ans[i][j][0];
                ans[i][j][0] = ans[i][j][1];
                ans[i][j][1] = tmp;
            }
        }
    }

    var answerList = [];
    for(var i = 0; i < matchNum; i++) {
        answerList.push('<div class="item"><div class="box-title">ゲーム' + (i+1) + '</div><p>');
        for (var j = 0; j < pairNum; j++){
            answerList.push(ans[i][j][0] + ' - ' + ans[i][j][1] + '<br>');
        }
        answerList.push('</p></div>');
    }
    document.getElementById('output').innerHTML = answerList.join('');
}