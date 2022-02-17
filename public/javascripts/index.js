
window.addEventListener('DOMContentLoaded', (e) => {
    const logoutButton = document.querySelector('.logout-button');
    const answerButtons = document.querySelectorAll('.answer-button');



    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener("click", (event) => {
            let pathUrl = event.path
            let questionId = pathUrl[pathUrl.length - 1];
            console.log(pathUrl);
            console.log(pathUrl[4])
            answerButtons[i].style.display = "none";
            const answerBlock = document.getElementById("answer-block");
            answerBlock.innerHTML = `
                <div>
                    <textarea placeholder="Type your answer here" name="content"></textarea>
                    <br>
                    <button type='submit' id="submitAnswerButton">
                        Submit Answer
                    </button>
                </div>
            `;
            const answerButton = document.getElementById("submitAnswerButton");

            answerButton.addEventListener("click", async (e) => {
                answerBlock.innerHTML = "";
                const questionContainer = document.getElementById("question-container");
                const res = fetch('/questions/:id/answers' /*post*/)
            });
        });
    }
});
