document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    const scoreDisplay = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');

    // تعريف الإجابات الصحيحة. يجب أن تتطابق مفاتيح الكائن مع قيمة خاصية 'name' لأسئلة الراديو في HTML
    const correctAnswers = {
        q1: 'القاهرة',
        q2: 'الأرض'
    };

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إرسال النموذج بالطريقة التقليدية (منع إعادة تحميل الصفحة)

        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;
        feedbackDiv.innerHTML = ''; // مسح أي تغذية راجعة سابقة

        // حلقة على كل سؤال في الإجابات الصحيحة
        for (const questionName in correctAnswers) {
            const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            const correctAnswer = correctAnswers[questionName];
            const questionBlock = document.querySelector(`input[name="${questionName}"]`).closest('.question-block');

            if (userAnswer) { // التحقق مما إذا كان المستخدم قد اختار إجابة
                const userAnswerValue = userAnswer.value;
                const pElement = questionBlock.querySelector('p'); // الحصول على عنصر الفقرة (السؤال)

                if (userAnswerValue === correctAnswer) {
                    score++;
                    feedbackDiv.innerHTML += `<p class="feedback-correct">السؤال "${pElement.textContent.trim()}": إجابتك صحيحة!</p>`;
                } else {
                    feedbackDiv.innerHTML += `<p class="feedback-incorrect">السؤال "${pElement.textContent.trim()}": إجابتك خاطئة. الإجابة الصحيحة هي: ${correctAnswer}</p>`;
                }
            } else {
                const pElement = questionBlock.querySelector('p');
                feedbackDiv.innerHTML += `<p class="feedback-incorrect">السؤال "${pElement.textContent.trim()}": لم تجب على هذا السؤال. الإجابة الصحيحة هي: ${correctAnswer}</p>`;
            }
        }

        scoreDisplay.textContent = `درجتك: ${score} / ${totalQuestions}`;
        alert(`لقد حصلت على ${score} من ${totalQuestions} إجابات صحيحة!`);
    });
});