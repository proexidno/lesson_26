function passTest() {
    $("#quiz").detach()
    let trueg = 0
    let falseg = 0
    for (i of ginAnsws) {
        for (j of i) {
            switch (j) {
                case 1:
                    trueg++
                    break
                case 2:
                    falseg--
            }
        }
    }
    $("body").append($("<div>").append($("<h1>").html("Ваш счёт: " + trueg + "<br>" + "Ошибки: " + falseg).attr("class", "Answers")))
}

function changeAnsw(obj = $("#next")) {
    if (obj.text() == "Pass Test") {
        console.log(1);
        passTest()
        return ""
    }
    $("h3").html(Questions[currQ][0])
    $("#Asks button p").each(function (index) {
        $(this).html(Questions[currQ][index + 1])
        switch (ginAnsws[currQ][index]) {
            case 1:
                $(this).parent().attr("class", "True")
                break
            case 2:
                $(this).parent().attr("class", "False")
                break
            case 0:
                $(this).parent().attr("class", "")
                break
        }
    })
    if (currQ > 0 && $("#nextButtons button").length < 2) {
        $("#nextButtons").prepend($("<button>").attr("id", "prev").text("Previous Question").click( buttonClick ))
        return ""
    }
    if (currQ == 0 && $("#nextButtons button").length > 1) {
        $("#nextButtons button:first-child").detach()
        return ""
    }
    if (currQ == Questions.length - 1) {
        $("#nextButtons button:last-child").text("Pass Test")
        return ""
    }
    if (currQ < Questions.length - 1 && $("#nextButtons button:last-child").text() == "Pass Test") {
        $("#nextButtons button:last-child").text("Next Question")
    }
}

function buttonClick() {
    currQ += 1 + -2 * ($(this).attr("id") == "prev")
    $("#quiz>p").text(currQ + 1 + " of " + Questions.length)
    changeAnsw($(this))
}

let Questions = [
    ["Lorem ipsum dolor sit.", "Lorem ipsum dolor sit amet consectetur. 11", "Lorem ipsum dolor sit amet consectetur. 12", "Lorem ipsum dolor sit amet consectetur. 13", "Lorem ipsum dolor sit amet consectetur. 14"], ["Lorem ipsum dolor sit.", "Lorem ipsum dolor sit amet consectetur. 21", "Lorem ipsum dolor sit amet consectetur. 22", "Lorem ipsum dolor sit amet consectetur. 23", "Lorem ipsum dolor sit amet consectetur. 24"], ["Lorem ipsum dolor sit.", "Lorem ipsum dolor sit amet consectetur. 31", "Lorem ipsum dolor sit amet consectetur. 32", "Lorem ipsum dolor sit amet consectetur. 33", "Lorem ipsum dolor sit amet consectetur. 34"], ["Lorem ipsum dolor sit.", "Lorem ipsum dolor sit amet consectetur. 41", "Lorem ipsum dolor sit amet consectetur. 42", "Lorem ipsum dolor sit amet consectetur. 43", "Lorem ipsum dolor sit amet consectetur. 44"], ["Lorem ipsum dolor sit.", "Lorem ipsum dolor sit amet consectetur. 51", "Lorem ipsum dolor sit amet consectetur. 52", "Lorem ipsum dolor sit amet consectetur. 53", "Lorem ipsum dolor sit amet consectetur. 54"]], currQ = 0, ginAnsws = [], rightAnsws = [[1, 2], [1, 4], [3, 4], [2], [1, 3, 4]], time = 120;

$("#timer p:last-child").text(time)
for (let i = 0; i < Questions.length; i++) {
    ginAnsws.push([0, 0, 0, 0])
}
changeAnsw()
let Timer = setInterval( function () {
    time -= 1
    $("#timer p:last-child").text(time)
    if (time < 1) {
        passTest()
        clearInterval(Timer)
    }
}, 1000)
$("#next").click( buttonClick )
$("#Asks button").click( function () {
    if ($(this).attr("class") == "") {
        if (rightAnsws[currQ].indexOf(Number($(this).attr("dataNum"))) != -1) {
            ginAnsws[currQ][$(this).attr("dataNum") - 1] = 1
            $(this).attr("class", "True")
        }else {
            ginAnsws[currQ][$(this).attr("dataNum") - 1] = 2
            $(this).attr("class", "False")
        }
    }
})
