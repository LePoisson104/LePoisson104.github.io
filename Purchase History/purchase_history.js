const front_end_url = "https://lepoisson104.github.io";
const back_end_url = "https://zoo-server-dc4b.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
  const id = parseInt(window.localStorage.getItem("customer_id"));
  fetch(back_end_url + "/user/load_purchase_history_by_id/" + id)
    .then((response) => response.json())
    .then((data) => {
      let role = window.localStorage.getItem("role");
      if (role != null && role === "1") {
        load_history_table(data["data"]);
      } else {
        window.location.replace(front_end_url + "/Login/login.html");
      }
    });
});

function load_history_table(data) {
  console.log(data);
  const table = document.querySelector("table tbody");
  let history_table = "";

  if (data.length === 0) {
    //insert no data table when there is no data
    table.innerHTML =
      "<tr><td class='no_data' colspan='6'>You don't have any purchase history</td></tr>";
    return;
  }
  data.forEach(function ({
    purchase_id,
    purchase_date,
    item_id,
    item_name,
    quantity,
    amount,
  }) {
    history_table += "<tr>";
    history_table += `<td>${purchase_id}</td>`;
    history_table += `<td>${purchase_date}</td>`;
    history_table += `<td>${item_id}</td>`;
    history_table += `<td>${item_name}</td>`;
    history_table += `<td>${quantity}</td>`;
    history_table += `<td>$${amount}</td>`;
    history_table += "</tr>";
  });
  table.innerHTML = history_table;
}
