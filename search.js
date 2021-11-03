function show_results() {
  document.querySelector("#results").style.display = "grid";
}

function hide_results() {
  document.querySelector("#results").style.display = "none";
}

let my_timer;
function search() {
  console.log("searching...");
  document.querySelector("#results").innerHTML = "";
  // const search = event.target.value
  // console.log(search)
  // Connect to the API
  // clearTimeout
  clearTimeout(my_timer);
  my_timer = setTimeout(async () => {
    const search = document.querySelector("#search_for").value;
    const conn = await fetch(
      `https://coderspage.com/iceland/search-items?search=${search}`
    );
    const data = await conn.json();
    data.forEach((item) => {
      let div_item = `<div id="ID${item.item_id}" class="result">
                        <span>${item.item_name}</span>
                        <span>${item.item_id}</span>
                        <span onclick="delete_item('${item.item_id}')">🗑️</span>
                      </div>`;
      document
        .querySelector("#results")
        .insertAdjacentHTML("afterbegin", div_item);
    });
  }, 500);
}

// ##############################
async function delete_item(item_id) {
  // This line removes the element from the DOM, though still
  // exists in the database
  document.querySelector(`#ID${item_id}`).remove();
  console.log(`Deleting item with id: ${item_id}`);
  // Make sure that the element is also deleted from the
  // database via the API
  // Connect to the API - DELETE
  // Send the ID as part the URL

  const conn = await fetch(`https://coderspage.com/iceland/item/${item_id}`, {
    // mode: 'cors',
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log("Item deleted from server");

  // NOTE: Since you are all deleting, at some point
  // there will be no items in the system. So don't panic
}

async function patch_item() {
  const conn = await fetch(`https://coderspage.com/iceland/item/9898`, {
    // mode: 'cors',
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log("PUT HERE");
}

patch_item();
