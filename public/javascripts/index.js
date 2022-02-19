
window.addEventListener('DOMContentLoaded', (e) => {
    const answerButtons = document.querySelectorAll('.answer-button');

    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener("click", (event) => {
            const questionId = event.target.id.split('-')[1];
            console.log(questionId);
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
                const res = await fetch(`/questions/${questionId}/answers`, {
                    method: 'post',
                });

                console.log(res);
            });
        });
    }
});
