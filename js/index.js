let index = 0;
let attempts = 0;
const 정답 = "APPLE";
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:tomato; width:200px; height:50px;";
    document.body.appendChild(div);
  };

  //게임 종료시
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  //줄바꿈
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      //   block.style.background = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  //백스페이스
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    //지우기(백스페이스)
    if (event.key === "Backspace") handleBackspace(thisBlock);
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
