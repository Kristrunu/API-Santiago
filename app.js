let page = 1;

async function get_items() {
  // Connect to the API
  const conn = await fetch(
    `https://ecuaguia.com/iceland/api-get-items?page=${page}`
  );
  // Get the data from the API
  const response = await conn.json();
  console.log(response);
  // const item = { id: 10, name: "xxxxx" };
  response.forEach((item) => {
    let div_item = /*Html*/ `
        <div class="item">
            <div>
                    <div>${item.id}</div>
                    <div>${item.name}</div>
                    </div>
                    <div>
                    <img src="https://ecuaguia.com/iceland/images/${
                      item.image
                    }"/>
                    <div class="price">${(item.price * 1.245).toFixed(2)} ISK</div>
                    </div>
        </div>`;
    document.querySelector("#items").insertAdjacentHTML("beforeend", div_item);
  });
  page++;
}

get_items();
