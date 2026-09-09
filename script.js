function openWishBox() {

    document.getElementById("wishBox").style.display = "block";

}


function makeWish() {

    let wish = document.getElementById("wishInput").value;

    if (wish === "") {

        alert("Please write a wish first! 🌟");

        return;

    }


    let wishes =
        JSON.parse(localStorage.getItem("wishes")) || [];


    wishes.push({

        text: wish,

        fulfilled: false

    });


    localStorage.setItem(
        "wishes",
        JSON.stringify(wishes)
    );


    document.getElementById("wishInput").value = "";


    /* Shooting Star */

    let shootingStar =
        document.getElementById("shootingStar");

    shootingStar.classList.remove("shoot");

    void shootingStar.offsetWidth;

    shootingStar.classList.add("shoot");


    displayWishes();

    displayFulfilledWishes();

    updateWishCount();

}


function displayWishes() {

    let starsContainer =
        document.getElementById("stars");

    starsContainer.innerHTML = "";


    let wishes =
        JSON.parse(localStorage.getItem("wishes")) || [];


    wishes.forEach(function(wish, index) {

        let star =
            document.createElement("span");


        star.innerHTML =
            wish.fulfilled ? "🌟" : "⭐";


        star.className =
            wish.fulfilled
            ? "star fulfilled"
            : "star";


        star.onclick = function() {

            openWishPopup(wish, index);

        };


        starsContainer.appendChild(star);

    });

}

function displayFulfilledWishes() {

    let container =
        document.getElementById("fulfilledWishes");

    container.innerHTML = "";


    let wishes =
        JSON.parse(localStorage.getItem("wishes")) || [];


    wishes.forEach(function(wish, index) {

        if (wish.fulfilled) {

            let wishCard =
                document.createElement("div");

            wishCard.className =
                "fulfilled-wish";


            let wishText =
                document.createElement("span");

            wishText.innerHTML =
                "🌟 " + wish.text + " ✓";


            let deleteButton =
                document.createElement("button");


            deleteButton.innerHTML =
                "🗑️";


            deleteButton.onclick = function() {

                let confirmDelete =
                    confirm(
                        "Delete this wish?\n\n" +
                        wish.text
                    );


                if (confirmDelete) {

                    wishes.splice(index, 1);


                    localStorage.setItem(
                        "wishes",
                        JSON.stringify(wishes)
                    );


                    displayWishes();

                    displayFulfilledWishes();

                    updateWishCount();

                }

            };


            wishCard.appendChild(wishText);

            wishCard.appendChild(deleteButton);


            container.appendChild(wishCard);

        }

    });

}


function updateWishCount() {

    let wishes =
        JSON.parse(localStorage.getItem("wishes")) || [];


    let count = wishes.length;


    document.getElementById("wishCount").innerHTML =
        "⭐ You have made " +
        count +
        " wishes ✨";

}


/* Load saved wishes when page opens */
let selectedWishIndex = null;


function openWishPopup(wish, index) {

    selectedWishIndex = index;

    document.getElementById("popupWishText").innerHTML =
        wish.text;


    let fulfillButton =
        document.getElementById("fulfillButton");


    if (wish.fulfilled) {

        fulfillButton.style.display = "none";

    } else {

        fulfillButton.style.display = "inline-block";

    }


    document.getElementById("wishPopup").style.display =
        "flex";

}


function closeWishPopup() {

    document.getElementById("wishPopup").style.display =
        "none";

}


function fulfillWish() {

    let wishes =
        JSON.parse(localStorage.getItem("wishes")) || [];


    if (selectedWishIndex === null) {
        return;
    }


    wishes[selectedWishIndex].fulfilled = true;


    localStorage.setItem(
        "wishes",
        JSON.stringify(wishes)
    );


    closeWishPopup();


    displayWishes();

    displayFulfilledWishes();

    updateWishCount();


    alert("🌟 Your wish came true! ✨");

}
displayWishes();

displayFulfilledWishes();

updateWishCount();