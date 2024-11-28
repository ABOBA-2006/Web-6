let wideBlock = document.getElementById("wide_block");
wideBlock.addEventListener('dblclick', () => {
  document.getElementById("1").style.opacity = 0.5;
  document.getElementById("1").style.filter = 'blur(5px)';
  document.getElementById("content").style.opacity = 0.5;
  document.getElementById("content").style.filter = 'blur(5px)';

  document.getElementById("formAccordion").style.display = "flex";
});


function backPressed(){
	document.getElementById("1").style.opacity = 1;
  document.getElementById("1").style.filter = 'blur(0px)';
  document.getElementById("content").style.opacity = 1;
  document.getElementById("content").style.filter = 'blur(0px)';

  document.getElementById("formAccordion").style.display = "none";
}

const MAX_ACCORDIONS = 3;
let current_blocks = 0;

async function savePressed(){
	let titleText = document.getElementById("titleAccordion").value;
	let contentText = document.getElementById("contentAccordion").value

	if (titleText === "" || contentText === "") {
		alert("Please fill in both the title and content.");
		return
	}

	if(current_blocks >= MAX_ACCORDIONS){
		alert("MAX AMOUNT OF ACCORDIANS");
		backPressed();
		return
	}

  const block = {
    title: titleText,
    content: contentText,
  };

  try {
    const response = await fetch("save.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(block),
    });

    const result = await response.text();

    if(response.ok){
      current_blocks++;
      let htmlBlock = `<div class="c">
        <input type="checkbox">
        <div class="title">
          <h1>${titleText}</h1>
        </div>
        <div class="p">
          <p>${contentText}</p>
        </div>
      </div>`;

      document.getElementById("wide_block").innerHTML += htmlBlock;
      console.log("Sending succeed");
      backPressed();
    }else{
      alert("Error saving block: " + result);
    }

  }catch(error){
    console.error("Error:", error);
    alert("An error occurred while saving the block.");
  }
}

window.onload = function() {
  fetch('clear_json.php')
      .then(response => response.text())
      .catch(error => {
          console.error('Error:', error);
      });
};