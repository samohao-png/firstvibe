// 퀴즈 데이터 배열 (선생님께서 원하는 문제로 자유롭게 변경 가능합니다!)
const quizData = [
    {
        question: "Q1. 빈칸에 들어갈 알맞은 단어는?\n\n'She _______ a cute dog.'",
        options: ["have", "has", "is", "are"],
        correct: 1, // "has"의 인덱스 번호 (0부터 시작)
        feedback: "🎈 정답입니다! 주어가 3인칭 단수(She)일 때는 has를 사용해요."
    },
    {
        question: "Q2. 다음 대화의 빈칸에 알맞은 말은?\n\nA: Thank you for your help.\nB: _______________________",
        options: ["You're welcome.", "I'm sorry.", "Nice to meet you.", "Goodbye."],
        correct: 0, // "You're welcome."의 인덱스 번호
        feedback: "🎈 정답입니다! 감사의 인사에 대한 답변은 '천만에요(You're welcome)'가 자연스러워요."
    },
    {
        question: "Q3. 우리말 뜻과 일치하도록 빈칸에 알맞은 단어는?\n\n'나는 일요일마다 축구를 한다.'\n-> I play soccer _______ Sundays.",
        options: ["at", "in", "on", "to"],
        correct: 2, // "on"의 인덱스 번호
        feedback: "🎈 정답입니다! 요일 앞에는 전치사 on을 사용합니다."
    }
];

let currentQuiz = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const feedbackEl = document.getElementById("feedback");

// 첫 퀴즈 로드
loadQuiz();

function loadQuiz() {
    resetState();
    
    // 마지막 문제까지 다 풀었을 때 처리
    if (currentQuiz >= quizData.length) {
        questionEl.innerText = "🎉 모든 퀴즈를 완료했습니다! 🎉";
        feedbackEl.innerText = "오늘 수업도 힘차게 시작해 볼까요?";
        resultBox.classList.remove("hidden");
        return;
    }

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;

    // 보기 버튼 동적 생성
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

// 상태 초기화
function resetState() {
    nextBtn.classList.add("hidden");
    resultBox.classList.add("hidden");
    optionsContainer.innerHTML = "";
}

// 사용자가 답을 선택했을 때
function selectAnswer(selectedIndex, selectedButton) {
    const correctIndex = quizData[currentQuiz].correct;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // 정답 여부 확인 및 색상 변경
    if (selectedIndex === correctIndex) {
        selectedButton.classList.add("correct");
        feedbackEl.innerText = quizData[currentQuiz].feedback;
        feedbackEl.style.color = "#15803d";
    } else {
        selectedButton.classList.add("wrong");
        // 오답일 때 정답 버튼도 함께 표시해 줌
        allButtons[correctIndex].classList.add("correct");
        feedbackEl.innerText = "❌ 아쉬워요! 다시 한 번 생각해 보세요.";
        feedbackEl.style.color = "#b91c1c";
    }

    // 답을 고른 후에는 다른 버튼 클릭 금지
    allButtons.forEach(btn => btn.disabled = true);
    
    // 결과창과 다음 버튼 보여주기
    resultBox.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

// 다음 문제 버튼 클릭 이벤트
nextBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});
