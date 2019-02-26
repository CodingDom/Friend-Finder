$(document).ready(function() {
    const questions = [
        "You tend to be constantly attached to your phone.",
        "You would rather read a book than go out to an amusement park.",
        "You rarely do something just out of sheer curiosity.",
        "People easily upset you.",
        "You only to stick with a small group of people.",
        "It is often difficult for you to express your feelings.",
        "You rarely get carried away by fantasies and ideas.",
        "You consider yourself to be the life of the party.",
        "Large crowds make you feel uneasy.",
        "You feel more energetic after spending time with a group of people."
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
        $("#survey .determinate").css("width",`${((currQuest+1)/questions.length)*100}%`);
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
            $(`#question-form button[type="submit"]`).attr("disabled",true);
            $("#survey .progress .anim").removeClass("determinate");
            $("#survey .progress .anim").addClass("indeterminate");
            $.ajax(
                "/api/friends",
                {
                    method: "POST",
                    data: user
                })
                .then(function(res) {
                    
                });
        };
        e.preventDefault();
    });
});