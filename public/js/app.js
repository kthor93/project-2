$(function () {
  //declares variables for survey values globally
  let name;
  let isPoisonous;
  let difficulty;
  let diffRangeStart;
  let diffRangeEnd;
  let temperature;
  let light;
  let plantType;
  let potSize;
  let request;
  let email;

  //button event listener with switch case for question# id
  $("#survey").on("click", "button", function (event) {
    event.preventDefault();
    const buttonId = $(this).attr("id");
    switch (buttonId) {
      case "question2":
        name = $("#name").val();
        $("#survey").empty();
        $("#survey").append(
          `<h3>Hi ${name}! Do you have any pets?</h3>
          <div class="choices">
          <input type="radio" name="hasPets" id="yes" class="input-radio" value="0"><label class="toggle" for="yes"><span>Yes</span></label>
          <input type="radio" name="hasPets" id="no" class="input-radio" value="1"><label class="toggle" for="no"><span>No</span></label>
          </div>
          
          <button id="question3">Next</button>`
        );
        break;
      case "question3":
        isPoisonous = $("input:checked").val();
        $("#survey").empty();
        $("#survey").append(
          `<div class="choices">
          <h3>What kind of challenge are you looking for?</h3><input type="radio" name="difficulty" id="easy" value="easy"><label for="easy">Easy </label><input type="radio" name="difficulty" id="moderate" value="moderate"><label for="moderate">Moderate </label><input type="radio" name="difficulty" id="difficult" value="difficult"><label for="difficult">Difficult </label>
          </div>
          <button id="question4">Next</button>`
        );
        break;
      case "question4":
        difficulty = $("input:checked").val();
        switch (difficulty) {
          case "easy":
            diffRangeStart = 3;
            diffRangeEnd = 5;
            break;
          case "moderate":
            diffRangeStart = 6;
            diffRangeEnd = 8;
            break;
          case "difficult":
            diffRangeStart = 9;
            diffRangeEnd = 9;
            break;
        }
        $("#survey").empty();
        $("#survey").append(
          `<h3>At what temperature do you keep your home?</h3>
          <div class="choices">
          <input type="radio" name="temperature" id="less-than-65" value="cold"><label for="less-than-65">Less than 65&deg; </label><input type="radio" name="temperature" id="65-75" value="cool"><label for="65-75">Between 65&deg; - 75&deg; </label><input type="radio" name="temperature" id="greater-than-75" value="warm"><label for="greater-than-75">Greater than 75&deg; </label></div><button id="question5">Next</button>`
        );
        break;
      case "question5":
        temperature = $("input:checked").val();
        $("#survey").empty();
        $("#survey").append(
          `<h3>How much natural light is there in your home?</h3>
          <div class="choices">
          <input type="radio" name="light" id="lowLight" value="low"><label for="lowLight">Low Light </label><input type="radio" name="light" id="medium Light" value="medium"><label for="medium Light">Medium Light </label><input type="radio" name="light" id="highLight" value="high"><label for="highLight">High Light </label></div><button id="question6">Next</button>`
        );
        break;
      case "question6":
        light = $("input:checked").val();
        $("#survey").empty();
        $("#survey").append(
          `<h3>What kind of plant are you looking for?</h3>
          <div class="choices"><input type="checkbox" name="plantType" id="evergreen" value="evergreen"><label for="evergreen">Evergreen</label><input type="checkbox" name="plantType" id="flower" value="flowering"><label for="flower">Flower</label><input type="checkbox" name="plantType" id="succulent" value="succulent"><label for="succulent">Succulent </label><input type="checkbox" name="plantType" id="tropical" value="tropical"><label for="tropical">Tropical </label><input type="checkbox" name="plantType" id="fern" value="fern"><label for="fern">Fern </label><input type="checkbox" name="plantType" id="vine" value="vine"><label for="vine">Vine </label><input type="checkbox" name="plantType" id="shrub" value="shrub"><label for="shrub">Shrub </label><input type="checkbox" name="plantType" id="palm" value="palm"><label for="palm">Palm </label></div><button id="question7">Next</button>`
        );
        break;
      case "question7":
        plantType = [];
        $(":checkbox:checked").each(function (i) {
          plantType[i] = $(this).val();
        });

        $("#survey").empty();
        $("#survey").append(
          `<h3>What pot size would you prefer?</h3>
          <div class="choices">
          <input type="radio" name="potSize" id="small" value="small"><label for="small">Small </label><input type="radio" name="potSize" id="medium" value="medium"><label for="medium">Medium </label><input type="radio" name="potSize" id="large" value="large"><label for="large">Large </label><input type="radio" name="potSize" id="noPreference" value="noPreference"><label for="noPreference">No preference </label></div><button id="question8">Next</button>`
        );
        break;
      case "question8":
        potSize = $("input:checked").val();
        $("#survey").empty();
        $("#survey").append(`<h3>What is your email address?</h3><input type="email" id="email"><button id="submit">Submit</button>`)
        break;
      case "submit":
        email = $("#email").val();
        $("#survey").empty();
        request = {
          name: name,
          email: email,
          isPoisonous: isPoisonous,
          diffRangeStart: diffRangeStart,
          diffRangeEnd: diffRangeEnd,
          temperature: temperature,
          light: light,
          plantType: plantType,
          potSize: potSize
        };
        getPlantMatch();
    }

    function getPlantMatch() {
      $.ajax({
        method: "POST",
        url: "/api/plants",
        data: request
      }).then(function (response) {
        response.forEach(function (plant) {
          const name = plant.commonName;
          const petSafe = plant.isPoisonous == 0 ? "Yes" : "No";
          const type = plant.plantType;
          let src;
          switch (type) {
            case "evergreen":
              src = "/assets/evergreen.svg";
              break;
            case "fern":
              src = "/assets/fern.svg";
              break;
            case "flowering":
              src = "/assets/flowering.svg";
              break;
            case "palm":
              src = "/assets/palm.svg";
              break;
            case "shrub":
              src = "/assets/shrub.svg";
              break;
            case "succulent":
              src = "/assets/succulent.svg";
              break;
            case "tropical":
              src = "/assets/tropical.svg";
              break;
            case "vine":
              src = "/assets/vine.svg";
          }
          const light = plant.light;
          const temperature = plant.temperature;
          const needsDirectLight =
            plant.needsDirectLight == "true" ? "Yes" : "No";
          $("#survey").append(
            `<span class="plantCard"><p>Plant Name:${name}</p><p>Safe for Pets? ${petSafe}</p><p>Plant Type: ${type}</p><img src=${src}><p>Light Needs: ${light}</p><p>Needs Direct Light? ${needsDirectLight}</p><p>Best Temperature Range: ${temperature}</p></span>`
          );
        });
      });
    }
  });
});
