// 💡 업로드된 PDF 기반 중1 영어 3단원 퀴즈 데이터 저장소
const quizDatabase = {
    grammar: [
        {
            question: "대화의 빈칸에 들어갈 알맞은 의문사는?\n\nA: _______ are those people?\nB: My family.",
            options: ["When", "Who", "Why", "Where"],
            correct: 1, // "Who"
            feedback: "🎈 정답! 대답이 '가족(My family)'이므로 사람을 묻는 의문사 Who가 올바릅니다."
        },
        {
            question: "대화의 빈칸에 들어갈 알맞은 의문사는?\n\nA: _______ is your brother?\nB: In his room.",
            options: ["When", "Who", "Why", "Where"],
            correct: 3, // "Where"
            feedback: "🎈 정답! 대답이 '방 안에(In his room)'라는 장소이므로 Where가 올바릅니다."
        },
        {
            question: "괄호 안의 단어를 현재 시제에 맞게 바르게 연결한 것은?\n\n'We _______________ them soon.' (hope, visit)",
            options: ["hope visit", "hope to visit", "hopes to visit", "hoping to visit"],
            correct: 1, // "hope to visit"
            feedback: "🎈 정답! hope 뒤에는 'to+동사원형'이 오며, 주어가 복수(We)이므로 동사원형 hope를 씁니다."
        },
        {
            question: "주어와 현재 시제를 고려하여 빈칸에 들어갈 올바른 형태는?\n\n'She _______________ the soccer club.' (decide, join)",
            options: ["decide to join", "decides join", "decides to join", "decide joining"],
            correct: 2, // "decides to join"
            feedback: "🎈 정답! decide 뒤에는 to부정사가 오며, 주어가 3인칭 단수(She)이므로 decides로 써야 합니다."
        },
        {
            question: "우리말 뜻이 같도록 빈칸에 들어갈 알맞은 말은?\n\n'Sue는 매일 운동하기를 원한다.'\n-> Sue ______________________ every day. (want, exercise)",
            options: ["want exercise", "wants exercise", "want to exercise", "wants to exercise"],
            correct: 3, // "wants to exercise"
            feedback: "🎈 정답! want 뒤에는 to부정사가 오고, 주어 Sue가 3인칭 단수이므로 wants to exercise가 됩니다."
        }
    ],
    voca: [
        {
            question: "다음 영단어의 알맞은 뜻을 고르세요.\n\n'curious'",
            options: ["편안한", "정직한", "궁금한, 호기심이 많은", "신이 난"],
            correct: 2, // "궁금한, 호기심이 많은"
            feedback: "🎈 정답! curious는 무언가에 대해 '궁금해하거나 호기심이 많은' 상태를 뜻합니다."
        },
        {
            question: "다음 영단어의 알맞은 뜻을 고르세요.\n\n'comfortable'",
            options: ["다정한", "편안한", "무거운", "따뜻한"],
            correct: 1, // "편안한"
            feedback: "🎈 정답! comfortable은 몸이나 마음이 '편안한' 것을 의미합니다."
        },
        {
            question: "다음 영단어의 알맞은 뜻을 고르세요.\n\n'honest'",
            options: ["정직한, 솔직한", "친절한", "궁금한", "무서워하는"],
            correct: 0, // "정직한, 솔직한"
            feedback: "🎈 정답! honest는 거짓 없이 '정직하고 솔직한' 것을 의미합니다. 앞의 h는 소리가 나지 않아요!"
        },
        {
            question: "다음 문장의 빈칸에 들어갈 알맞은 단어는?\n\n'He is a ______________ at the library.' (뜻: 자원봉사자)",
            options: ["guard", "volunteer", "moment", "exercise"],
            correct: 1, // "volunteer"
            feedback: "🎈 정답! 스스로 원해서 돕는 '자원봉사자'는 영어로 volunteer라고 합니다."
        },
        {
            question: "다음 영단어의 알맞은 뜻을 고르세요.\n\n'straight'",
            options: ["곱슬곱슬한", "낮은", "앞으로", "똑바로 선, 곧은"],
            correct: 3, // "똑바로 선, 곧은"
            feedback: "🎈 정답! straight는 굽지 않고 '똑바로 선, 곧은' 형태를 나타내는 말입니다."
        }
    ],
    dialogue: [
        // 생활 회화 카테고리를 유지하기 위해 넣어둔 보너스 문제입니다.
        {
            question: "우리말과 일치하도록 대화의 빈칸에 알맞은 표현은?\n\nA: 고양이가 어떻게 생겼니?\n-> What does your cat ______________?\nB: It's small and white.",
            options: ["look at", "look like", "see like", "find out"],
            correct: 1, // "look like"
            feedback: "🎈 정답! 외모나 생김새를 물어볼 때는 'What do/does + 주어 + look like?' 표현을 사용합니다."
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

    // 🚀 퀴즈 시작 함수
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

    // 📝 퀴즈 로드 함수
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
