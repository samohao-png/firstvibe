// 💡 주제별 퀴즈 데이터 저장소
const quizDatabase = {
    grammar: [
        {
            question: "빈칸에 들어갈 be동사로 알맞은 것은?\n\n'Tom and I _______ good friends.'",
            options: ["am", "is", "are", "be"],
            correct: 2,
            feedback: "🎈 정답! 주어가 'Tom and I'로 여러 명(복수)이기 때문에 are를 씁니다."
        },
        {
            question: "다음 중 일반동사의 과거형이 '잘못' 연결된 것은?",
            options: ["go - went", "make - maked", "play - played", "run - ran"],
            correct: 1,
            feedback: "🎈 정답! make의 과거형은 불규칙 변화로 'made'가 올바른 형태입니다."
        }
    ],
    voca: [
        {
            question: "다음 영단어의 뜻으로 올바른 것을 고르세요.\n\n'environment'",
            options: ["정부", "경험", "발명", "환경"],
            correct: 3,
            feedback: "🎈 정답! environment는 '환경'이라는 뜻의 중요 단어입니다."
        },
        {
            question: "밑줄 친 단어의 반대말로 알맞은 것은?\n\n'The room is very hot.'",
            options: ["warm", "cold", "dirty", "dark"],
            correct: 1,
            feedback: "🎈 정답! hot(더운)의 반대말은 cold(추운)입니다."
        }
    ],
    dialogue: [
        {
            question: "길을 물어볼 때 대화를 시작하는 말로 가장 알맞은 것은?",
            options: ["Excuse me.", "Congratulations!", "Never mind.", "What's up?"],
            correct: 0,
            feedback: "🎈 정답! 모르는 사람에게 말을 걸거나 길을 물어볼 땐 'Excuse me'로 시작해요."
        }
    ]
};

let currentQuestions = []; 
let currentQuizIndex = 0;
let currentTopicName = "";

// 페이지 로드가 완료되면 실행되도록 안전하게 감싸줍니다.
document.addEventListener("DOMContentLoaded", () => {
    const categoryBox = document.getElementById("category-box");
    const quizBox = document.getElementById("quiz-box");
    const topicBadge = document.getElementById("topic-badge");
    const questionEl = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const resultBox = document.getElementById("result-box");
    const feedbackEl = document.getElementById("feedback");
    const homeBtn = document.getElementById("home-btn");

    // 1. 카테고리 버튼들에 클릭 이벤트 연결
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const category = e.target.getAttribute("data-category");
            startQuiz(category);
        });
    });

    // 2. 홈으로 가기 버튼 이벤트 연결
    homeBtn.addEventListener("click", () => {
        quizBox.classList.add("hidden");
        categoryBox.classList.remove("hidden");
    });

    // 3. 다음 문제 버튼 이벤트 연결
    nextBtn.addEventListener("click", () => {
        currentQuizIndex++;
        loadQuiz();
    });

    // 퀴즈 시작 함수
    function startQuiz(category) {
        currentQuestions = quizDatabase[category];
        currentQuizIndex = 0;
        
        if (category === 'grammar') currentTopicName = "📝 기초 문법";
        else if (category === 'voca') currentTopicName = "🔤 필수 어휘";
        else if (category === 'dialogue') currentTopicName = "💬 생활 회화";

        categoryBox.classList.add("hidden");
        quizBox.classList.remove("hidden");

        loadQuiz();
    }

    // 퀴즈 로드 함수
    function loadQuiz() {
        resetState();

        if (currentQuizIndex >= currentQuestions.length) {
            questionEl.innerText = "🎉 해당 주제의 모든 문제를 풀었습니다! 🎉";
            feedbackEl.innerText = "참 잘했어요! 다른 주제도 도전해 볼까요?";
            feedbackEl.style.color = "#1e293b";
            resultBox.classList.remove("hidden");
            return;
        }

        topicBadge.innerText = `${currentTopicName} (${currentQuizIndex + 1}/${currentQuestions.length})`;
        
        const currentQuizData = currentQuestions[currentQuizIndex];
        questionEl.innerText = currentQuizData.question;

        currentQuizData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.addEventListener("click", () => selectAnswer(index, button));
            optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        nextBtn.classList.add("hidden");
        resultBox.classList.add("hidden");
        optionsContainer.innerHTML = "";
    }

    function selectAnswer(selectedIndex, selectedButton) {
        const correctIndex = currentQuestions[currentQuizIndex].correct;
        const allButtons = optionsContainer.querySelectorAll(".option-btn");

        if (selectedIndex === correctIndex) {
            selectedButton.classList.add("correct");
            feedbackEl.innerText = currentQuestions[currentQuizIndex].feedback;
            feedbackEl.style.color = "#15803d";
        } else {
            selectedButton.classList.add("wrong");
            allButtons[correctIndex].classList.add("correct");
            feedbackEl.innerText = "❌ 아쉬워요! 정답을 다시 한 번 확인해 보세요.";
            feedbackEl.style.color = "#b91c1c";
        }

        allButtons.forEach(btn => btn.disabled = true);
        resultBox.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
    }
});
