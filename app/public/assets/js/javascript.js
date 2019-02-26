$(document).ready(function() {
    const questions = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ];
    const user = {
        name: "John Doe",
        photo: "https://www.google.com",
        scores: []
    };
    let currQuest = 0;
    let submission = false;

    function updateQuestion() {
        $("#question").text(questions[currQuest]);
        $("#current").text(currQuest+1);
    };

    $("#info-form").on("submit", function(e) {
        user.name = $("#first_name").val() + " " + $("#last_name").val();
        user.photo = $("#photo").val();
        // Reset all input
        $(this).css("display","none");
        $(this).find("input").val("");
        // Start questionaire
        updateQuestion();
        $("#survey").css("display","block");
        e.preventDefault();
    });

    $("#question-form").on("submit", function(e) {
        if (!submission) {
            user.scores.push(parseInt($(this).find("input:checked").attr("data-score")));
            currQuest++;
            updateQuestion();
            if (currQuest == questions.length-1) {
                $(`#question-form button[type="submit"]`).text("Submit");
                submission = true;
            };
        } else {
            $.ajax(
                "/api/friends",
                {
                    method: "POST",
                    data: user
                })
                .then(function(err, res) {
                    if (err) throw err;
                    console.log(res);
                });
        };
        e.preventDefault();
    });
});