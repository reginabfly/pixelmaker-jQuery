// Select color input
let colorPicker = $('#colorPicker');

// Select size input and grid
let gridHeight = $('#inputHeight');
let gridWidth = $('#inputWidth');
let grid = $('#pixelCanvas');
let currentColor;


// function to create the grid
function makeGrid() {
    for (var row = 0; row < gridHeight.val(); row++) {
        //take the height number and add that many to grid <tr>
        let tr = $("<tr></tr>");
        grid.append(tr);
        //while loop to meet course requirements
        let column = 0;
        while (column < gridWidth.val()) {
            tr.append("<td></td>");
            column++
        }
        /* //originally put nested for loop here but replaced with while loop to meet course requirements
        for(var column = 0; column < gridWidth.val(); column++) {
            //take the value in gridWidth and add that many <td> to tr
            tr.append("<td></td>");
        }*/
    }
    //stops the makeGrid function from creating multiple grids if submit is hit again
    $("input[type=submit]").attr("disabled", "disabled");
}

// when size is submitted by the user, call makeGrid()
$('input[type=submit]').on("click", function (event) {
    event.preventDefault();
    makeGrid();
});

//when user clicks reset, clear the grid completly
$("input[type=reset]").on("click", function () {
    $("#pixelCanvas").find("tr").remove();
    $("#pixelCanvas").find("td").remove();
    $('input[type="submit"]').removeAttr('disabled');
});

//click clearGrid button to make grid go back to white
$('#clearGrid').on("click", function () {
    $("#pixelCanvas").find("td").css("background-color", "white");
});

//code to allow user to print the grid as pdf
$('#save').click(function () {
    html2canvas($("#pixelCanvas"), {
        onrendered: function (canvas) {
            let imgData = canvas.toDataURL(
                'image/png');
            let doc = new jsPDF('p', 'mm');
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save('sample-file.pdf');
        }
    });
});

//COLORING THE GRID
//add color to the grid
$("#pixelCanvas").on("click", "td", function (event) {
    //add colorPicker selection to particular td
    $(this).css("background-color", colorPicker.val());
});

//double click to remove color to the grid if make a mistake in a square
$("#pixelCanvas").on("dblclick", "td", function (e) {
    //add colorPicker selection to particular td
    $(this).css("background-color", "white");
});

//mousedown and mouseover to color many squares quickly
let down = false;
$("#pixelCanvas").mousedown(function() {
   down = true;
});
$("body").mouseup(function() {
   down = false;  
});

$("#pixelCanvas").on("mouseover", "td", function (e) {
    e.preventDefault();
    if (e.which === 1 && down === true) {
        $(e.target).css("background-color", colorPicker.val());
    }
});