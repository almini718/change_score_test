function read_csv() {
  fetch("Busan_Univ.csv")
    .then((response) => response.text())
    .then((data) => {
      const parsedData = Papa.parse(data).data;
      const select = document.getElementById("major_select");
      // "과 선택" 옵션을 추가합니다.
      const defaultOption = document.createElement("option");
      defaultOption.text = "과 선택";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);
      // 첫 번째 행은 헤더로 사용되므로 제외합니다.
      for (let i = 1; i < parsedData.length; i++) {
        const option = document.createElement("option");
        option.value = parsedData[i][0];
        option.text = parsedData[i][1];
        select.appendChild(option);
      }
    });
}

//점수 계산
function cac() {
  document.getElementById("change_score_res").value = null;
  var v_major = document.getElementById("major_line").value;
  var v_kor = Number(document.getElementById("kor").value);
  var v_math = Number(document.getElementById("math").value);
  var v_eng = Number(document.getElementById("eng").value);
  var v_hist = Number(document.getElementById("hist").value);
  var v_tam1 = Number(document.getElementById("tam1").value);
  var v_tam2 = Number(document.getElementById("tam2").value);
  var res = 0;

  if (!v_kor || !(0 <= v_kor && v_kor <= 200)) {
    alert("국어 표준점수를 확인해주세요!");
  } else if (!v_math || !(0 <= v_math && v_math <= 200)) {
    alert("수학 표준점수를 확인해주세요!");
  } else if (!v_eng || !(1 <= v_eng && v_eng <= 9)) {
    alert("영어 등급을 확인해주세요!");
  } else if (!v_hist || !(1 <= v_hist && v_hist <= 9)) {
    alert("역사 등급을 확인해주세요!");
  } else if (!v_tam1 || !(0 <= v_tam1 && v_tam1 <= 100)) {
    alert("탐구1 표준 점수를 확인해주세요!");
  } else if (!v_tam2 || !(0 <= v_tam2 && v_tam2 <= 100)) {
    alert("탐구2 표준 점수를 확인해주세요!");
  } else {
    res += 200 - 10 * (v_eng - 1);
    if (v_hist <= 4) res += 10;
    else res += 10 - (v_hist - 4) * 0.2;
    if (v_major == "인문사회계") {
      res += v_kor * 1.5;
      res += v_math * 1.25;
      res += v_tam1 * 1.25;
      res += v_tam2 * 1.25;
      res = res.toFixed(2);
      document.getElementById("change_score_res").value = res;
    } else if (v_major == "자연계") {
      res += v_kor * 1;
      res += v_math * 1.5;
      res += v_tam1 * 1.5;
      res += v_tam2 * 1.5;
      res = res.toFixed(2);
      document.getElementById("change_score_res").value = res;
    } else {
      alert("에러! 알수없는 계열정보");
    }
  }
}

//초기화
function reset() {
  document.getElementById("kor").value = null;
  document.getElementById("math").value = null;
  document.getElementById("eng").value = null;
  document.getElementById("hist").value = null;
  document.getElementById("tam1").value = null;
  document.getElementById("tam2").value = null;
  document.getElementById("change_score_res").value = null;
  document.getElementById("major_aver_score").value = null;
  document.getElementById("major_70_score").value = null;
  document.getElementById("answer").value = null;
}

//과 선택
function show_major() {
  document.getElementById("answer").value = null;
  fetch("Busan_Univ.csv")
    .then((response) => response.text())
    .then((data) => {
      const parsedData = Papa.parse(data).data;
      const select = document.getElementById("major_select");
      const selectedIndex = select.selectedIndex;
      document.getElementById("major_line").value = parsedData[selectedIndex][0];
      document.getElementById("major_aver_score").value = parsedData[selectedIndex][7];
      document.getElementById("major_70_score").value = parsedData[selectedIndex][8];
      document.getElementById("v1").innerHTML = parsedData[selectedIndex][2];
      document.getElementById("v2").innerHTML = parsedData[selectedIndex][3];
      document.getElementById("v3").innerHTML = parsedData[selectedIndex][4];
      document.getElementById("v4").innerHTML = parsedData[selectedIndex][5];
      document.getElementById("v5").innerHTML = parsedData[selectedIndex][6];
      document.getElementById("v6").innerHTML = parsedData[selectedIndex][9];
    });
}

//결과 출력
function show_res() {
  var input_res = document.getElementById("change_score_res").value;
  var input_aver = document.getElementById("major_aver_score").value;
  var input_70 = document.getElementById("major_70_score").value;
  if (input_res == "") {
    alert("환산 점수를 계산해주세요!");
  } else {
    if (input_res >= input_aver) {
      document.getElementById("answer").value = "평균이상";
    } else if (input_res >= input_70) {
      document.getElementById("answer").value = "70% 이상";
    } else document.getElementById("answer").value = "평균이하";
  }
}
