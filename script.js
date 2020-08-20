(function() {
    var currentPlayer = "player1";
    var column = $(".column");

    $(document).ready(function(){
        $(".slot").each(function(index) {
            var column = index%6;
            var row = (index - column)/6;
            var diagonal1 = row + column;
            var diagonal2 = row - column;
            $(this).attr("data-diagonal1", diagonal1);
            $(this).attr("data-diagonal2", diagonal2);
        });

    });

    var find = function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        var slotHover = slotsInColumn.siblings(".slot-hover");
        var holeHover = slotHover.find(".hole-hover");

        var diagonal1 = -3000;
        var diagonal2 = -3000;

        for (var i = 5; i >= 0; i--) {
            var slotInColumn = slotsInColumn.eq(i);
            if (
                !slotInColumn.hasClass("player1") &&
                !slotInColumn.hasClass("player2")
            ) {
                slotInColumn.addClass(currentPlayer);
                diagonal1 = slotInColumn.attr ("data-diagonal1");
                diagonal2 = slotInColumn.attr ("data-diagonal2");

                if (currentPlayer == "player1") {
                    holeHover.removeClass("hover-pink");
                    holeHover.addClass("hover-indigo");
                } else {
                    holeHover.removeClass("hover-pink");
                    holeHover.addClass("hover-indigo");
                }
                break;
            }
        }

        if (i == -1) {
            return;
        }

        function checkForVictory(slots) {
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                    if (count == 4) {
                        slots.eq(i).addClass("slot-win");
                        slots.eq(i - 1).addClass("slot-win");
                        slots.eq(i - 2).addClass("slot-win");
                        slots.eq(i - 3).addClass("slot-win");
                        return true;
                    }
                } else {
                    count = 0;
                }
            } 
            return false;
        }
        

        var victoryAchieved = false;

        if (checkForVictory(slotsInColumn)) {
            victoryAchieved = true;
        } else if (checkForVictory($(".row" + i))) {
            victoryAchieved = true;
        } else if (checkForVictory($(".slot[data-diagonal1='" + diagonal1 + "']"))) {
            victoryAchieved = true;
        } else if (checkForVictory($(".slot[data-diagonal2='" + diagonal2 + "']"))) {
            victoryAchieved = true;
        }

        if (victoryAchieved) {
            if (currentPlayer == "player1") {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-pink").addClass("on");
                }, 1300);
            } else {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-indigo").addClass("on");
                }, 1300);
            }
        }

        switchPlayers();
    };

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    column.on("click", find);

    $(".button").on("click", function() {
        $(".hole").removeClass("animate");
        $("#winner-pink").removeClass("on");
        $("#winner-indigo").removeClass("on");
        $(".slot").removeClass("slot-win");
        column.on("click", find);
        currentPlayer = "player1";
    });

    function animate() {
        $(".slot").removeClass("player1");
        $(".slot").removeClass("player2");
        $(".hole-hover").removeClass("hover-pink");
        $(".hole-hover").removeClass("hover-indigo");
        $(".hole").addClass("animate");
        column.off("click", find);
    }

    $(".slot").mouseover(function(e) {
        var slotHover = $(e.target).siblings(".slot-hover");
        var holeHover = slotHover.find(".hole-hover");
        if (currentPlayer == "player1") {
            holeHover.addClass("hover-pink");
        } else {
            holeHover.addClass("hover-indigo");
        }
    });

    column.mouseleave(function() {
        $(".hole-hover").removeClass("hover-pink");
        $(".hole-hover").removeClass("hover-indigo");
    });

})();