$(function () {

    // task 3_1
    function CountNumber() {
        let mcount = document.getElementById("mcount");
        let count = 0;
        mcount.addEventListener("mouseover", function () {
            mcount.innerText = (count += 1).toString();
        });
    }

    function textModification() {

        let targetObj = {};
        targetObj = {
            value: $("#posts"),
            colorSelector: $(".color"),
            fontSelector: $(".font_selector"),
            reply : $("#reply"),

            post_time: function (position) {

                let newDiv = document.createElement("div");
                newDiv.className = "post-time";
                newDiv.innerText = Date();


                newDiv.innerHTML += `
                    <button class="del_current">x</button>
                `;


                // modified for task 3-7

                if (position === null) {
                    this.value.append(newDiv);
                } else {

                    let targetNode = this.value.children()[position];

                    let preLeft = parseInt(targetNode.style.marginLeft);

                    if (!isNaN(preLeft)) {

                        newDiv.style.marginLeft = (preLeft + 10).toString() + "px";

                    } else {
                        newDiv.style.marginLeft = "10px";
                    }


                    $(newDiv).insertAfter(targetNode);
                }

            },
            post_context: function (input, position) {


                //task 3-2
                let newDiv = document.createElement("div");
                newDiv.className = "post-content";
                newDiv.innerText = input;

                //task 3-4 modify color
                for (const colorSelectorElement of this.colorSelector) {
                    if (colorSelectorElement.checked) {
                        newDiv.style.color = colorSelectorElement.value;
                    }
                }

                // task 3-6 modified text font
                //bold
                if (this.fontSelector[0].checked) {
                    newDiv.style.fontWeight = this.fontSelector[0].value;
                }
                //italic
                if (this.fontSelector[1].checked) {
                    newDiv.style.fontStyle = this.fontSelector[1].value;
                }

                // console.log(position);

                // modified for task 3-7

                if (position === null) {
                    this.value.append(newDiv);
                } else {

                    let targetNode = this.value.children()[position];

                    let preLeft = parseInt(targetNode.style.marginLeft);

                    if (!isNaN(preLeft)) {

                        newDiv.style.marginLeft = (preLeft + 10).toString() + "px";

                    } else {
                        newDiv.style.marginLeft = "10px";
                    }


                    // add one index (position )
                    // position = parseInt(position) + 1;

                    $(newDiv).insertAfter(targetNode.nextElementSibling);
                }
            },
            makeReply: function () {

                for (const child of this.reply.children()) {

                    //Not delete default option
                    if (child.index !== 0) {
                        child.remove();
                    }
                }

                let children = targetObj.value.children();

                for (let i = 0; i < children.length; i++) {

                    if (children[i].className === "post-content") {

                        let newOption = document.createElement("option");

                        newOption.innerText = children[i].innerText;

                        newOption.value = i.toString();

                        targetObj.reply.append(newOption);


                    }
                }

                // reset default selection
                this.reply.children()[0].selected = true;


            }

        };


        let post_button = document.querySelector(".controls.left button");

        post_button.addEventListener("click", function () {

            let input_text = $("#text_input").val();


            let displayCount = $("#displayCount");

            for (let i = 0; i < displayCount.val(); i++) {

                const currentChildPosition = $("#reply").val();

                targetObj.post_time(currentChildPosition);

                targetObj.post_context(input_text, currentChildPosition);

            }

            // task 3-7 update select options

            targetObj.makeReply();
            deleteCurrentElement();

        });

        // task 3-6
        let range_selector = document.querySelector("[name='visible']");

        range_selector.addEventListener("input",  () => {

            let children = document.getElementById("posts").children;

            // console.log(range_selector.val());

            for (let i = 0; i < children.length; i++) {

                if (i >= range_selector.value * 2) {

                    children[i].style.display = "none";

                } else {

                    children[i].style.display = "block";

                }
            }

        });


        // task 3-8

        function deleteCurrentElement(){
            let del_current = $(".del_current");

            for (const delCurrentElement of del_current) {


                delCurrentElement.addEventListener("click", function (e) {

                    $(e.currentTarget).parent().next().remove();

                    $(e.currentTarget).parent().remove();

                    targetObj.makeReply();

                });

            }
        }

    }

    function switchMainMenu() {

        let button = document.querySelectorAll("button.right");

        let div_main = $("div#main");

        let div_menu = $("div#menu");

        for (const buttonElement of button) {

            buttonElement.addEventListener("click", function () {

                div_main.toggle();
                div_menu.toggle();

            });

        }


        let background_color_input = $("#background_color");

        background_color_input.on("change keydown paste input", () => {

            $("body").css("background-color", background_color_input.val());


        });


    }


    // global load
    $(function () {
        CountNumber();
        textModification();
        switchMainMenu();
    });

});
